exports.handler = (event, context, callback) => {
    console.log("Event received", event);
    var responseBody = {
        message: "Ping response successful",
    };
    
    var response = {
        statusCode: 200,
        body: JSON.stringify(responseBody)
    };
    console.log("response: " + JSON.stringify(response))
    callback(null, response);
};
