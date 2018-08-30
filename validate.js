const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const USER_POOL_ID = "ap-southeast-1_Xk64oKBVC";
const CLIENT_ID = "2ijn9i5e4lk21g8ih0j9684tb6";
const REGION = "ap-southeast-1";
const ISSUER_URI = "https://cognito-idp." + REGION + ".amazonaws.com/" + USER_POOL_ID;
const JWKS_URI = ISSUER_URI + "/.well-known/jwks.json";

let client = jwksClient({
    jwksUri: JWKS_URI,
});
function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
        var signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

exports.handler = (event, context, callback) => {

    // Validate idToken
    let idToken = event.headers['sj-auth-token']
    
    jwt.verify(idToken, getKey, { audience: CLIENT_ID, issuer: ISSUER_URI }, function(err, decoded) {
        console.log("RES", err, decoded);
        if (event.requestContext && event.requestContext.authorizer && event.requestContext.authorizer.claims) {
            var data = event.requestContext.authorizer.claims;
            var responseBody = {
                message: "Validation successful",
                data: {
                    userId: data.sub,
                    name: data.name,
                    email: data.email,
                    phone: data.phone_number
                }
            };
            var response = {
                statusCode: 200,
                body: JSON.stringify(responseBody)
            };
        } else {
            var response = {
                statusCode: 500,
                body: JSON.stringify({
                    message: "Validation failed"
                }),
            headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            };
        }
        console.log("response: " + JSON.stringify(response))
        callback(null, response);
      });
};
