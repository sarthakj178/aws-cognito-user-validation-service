exports.handler = (event, context, callback) => {
    console.log("ValidateCognitoUser: Event received", event);
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
        };
    }
    
    console.log("response: " + JSON.stringify(response))
    callback(null, response);
};
