/*
* Primary file for Homework Assignment 1
*/

// Dependencies
var http = require('http');
var https = require('https');
var fs = require('fs');
var config = require('./config_hw1');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// Instantiate the http server
var httpServer = http.createServer(
    function(req, res) {
        unifiedServer_hw1(req, res);
    }
);

// Start the http server
httpServer.listen(
    config.httpPort,
    function() {
        console.log(
            "The server is listening on port ", config.httpPort,
            "in ", config.envName, " mode."
        );
    }
);

// Instantiate the https server
var httpsServerOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readFileSync('./https/cert.pem')
};
var httpsServer = https.createServer(
    httpsServerOptions,
    function(req, res) {
        unifiedServer_hw1(req, res);
    }
);

// Start the https server
httpsServer.listen(
    config.httpsPort,
    function() {
        console.log(
            "The server is listening on port ", config.httpsPort,
            "in ", config.envName, " mode."
        );
    }
);

// Server logic for http and https servers
var unifiedServer_hw1 = function(req, res) {
    console.log("Received a request");
    // Parse url
    var parsedUrl = url.parse(req.url, true);

    // Get path and trim
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get query string as object
    var queryStringObject = parsedUrl.query;

    // Get the method
    var method = req.method.toLowerCase();

    // Get headers
    var headers = req.headers;

    // Get payload
    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    req.on(
        'data',
        function(data) {
            buffer += decoder.write(data);
        }

    );

    req.on(
        'end',
        function() {
            buffer += decoder.end();

            // Choose the handler
            var chooseHandler = null;
            if(typeof(router[trimmedPath]) !== 'undefined') {
                chooseHandler = router[trimmedPath];
            }
            else {
                chooseHandler = handlers.notFound;
            }

            // Construct data object for handler
            var data = {
                'trimmedPath' : trimmedPath,
                'queryStringObject' : queryStringObject,
                'method' : method,
                'headers' : headers,
                'payload' : buffer
            };

            // Route the request to the handler
            chooseHandler(
                data,
                function(statusCode, payload) {
                    // Use the status code called back by the handler
                    statusCode = statusCode;
                    // Use the payload called back by the handler, or default to empty object
                    if(typeof(payload) == 'object') {
                        payload = payload;
                    }
                    else {
                        payload = {};
                    }
                    // Convert payload to string
                    var payloadString = JSON.stringify(payload);
                    // Return the response
                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(statusCode);
                    res.end(payloadString);
                    console.log(
                        "Receiving payload: ", buffer,
                        "\nReturning payload: ", payloadString,
                        "\nReturning Status Code: ", statusCode
                    );

                }
            );
        }
    );
};

// Define handlers
var handlers = {};

// Hello handler
handlers.hello = function(data, callback) {
    callback(
        200,
        {
            'Message' : 'Hello World!',
            'Sender' : 'rahulksharma1971',
            'Email' : 'rahul.k.sharma.1971@gmail.com',
            'App' : 'Homework Assignment 1'
        }
    );
};

// Not Found handler
handlers.notFound = function(data, callback) {
    callback(
        404,
        {
            'Message' : 'Method not found.'
        }
        );
};

// Define request router
var router = {
    'hello' : handlers.hello
};