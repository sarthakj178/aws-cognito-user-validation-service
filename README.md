# aws-cognito-user-validation-service
NodeJS back-end service to validate the authenticity of a user who signed in via [AWS Cognito](https://aws.amazon.com/cognito/). This is a sample service to demonstrate how we can secure access to our back-end services based on the authentication tokens received from Cognito.

# Hosting
Hosted on [AWS API Gateway](https://aws.amazon.com/api-gateway/) integrated with [AWS Lambda](https://aws.amazon.com/lambda/).
* [Ping GET API](https://api.sarthakj178.com/apiPing) - This API will succeed without any authentication tokens.
* [Validate POST API](https://api.sarthakj178.com/validate) - This API will fail unless a valid sj-auth-token header is included. This can be fetched if you sign-up and sigin-in at this [sample front-end application](http://sarthakj178.com/aws-cognito-authn/f1/signin)

# Service description
This service accepts Authentication Tokens as part of the request and determines the properties of the user corresponding to these tokens. 

For a front-end integrated with AWS Cognito, when a user signs in, their Authentication Tokens are fetched from Cognito and stored on the browser. These tokens are sent to the back-end service and if the tokens are valid and unexpired, properties of the user are returned.

This package has 2 .js files. Both of them are AWS lambda functions connected to an AWS API Gateway.
* **ping.js**: mapped to /ping API. This is a non-secure API. Any user can access this API.
* **validate.js**: mapped to /validate API. This takes a sj-auth-token header in the request. If the token is valid, user properties are returned. 
