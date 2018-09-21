API "hello" is implemented in the Homework Assignment 1 application "hwassignment1".
The API sends the response in the JSON format.

Application "hwassignment1" can be run in two environments, namely, Staging and Production.

Configuration of environments is in the file "config_hw1.js", which is referenced
by main application in "index_hw1.js". Ports and environment names used for the environments are as follows:
Staging - 
    http server port : 3000
    https server port : 3001
    environment name : staging_hw1
Production -
    http server port : 5000
    https server port : 5001
    environment name : production_hw1
 
Commands to run the application are as follows:

// cd to application directory hwassignment1

// For running staging environment
NODE_ENV=staging node index_hw1.js
    or
node index_hw1.js

// For running production environment
NODE_ENV=production node index_hw1.js

API "hello" is implemented in the server and for the default case notFound is implemented.

For staging and production environments results of requests and responses using postman are as follows:

Staging environment -
    HTTP Request: http://localhost:3000/help
    Response: {
        "Message": "Hello World!",
        "Sender": "rahulksharma1971",
        "Email": "rahul.k.sharma.1971@gmail.com",
        "App": "Homework Assignment 1"
    }

    HTTP Request: http://localhost:3000/
    Response: {
        "Message": "Method not found."
    }

    HTTPS Request: https://localhost:3001/help
    Response: {
        "Message": "Hello World!",
        "Sender": "rahulksharma1971",
        "Email": "rahul.k.sharma.1971@gmail.com",
        "App": "Homework Assignment 1"
    } 

    HTTPS Request: https://localhost:3001/
    Response: {
        "Message": "Method not found."
    }


Production environment -
    HTTP Request: http://localhost:5000/help
    Response: {
        "Message": "Hello World!",
        "Sender": "rahulksharma1971",
        "Email": "rahul.k.sharma.1971@gmail.com",
        "App": "Homework Assignment 1"
    }

    HTTP Request: http://localhost:5000/
    Response: {
        "Message": "Method not found."
    }

    HTTPS Request: https://localhost:5001/help
    Response: {
        "Message": "Hello World!",
        "Sender": "rahulksharma1971",
        "Email": "rahul.k.sharma.1971@gmail.com",
        "App": "Homework Assignment 1"
    } 

    HTTPS Request: https://localhost:5001/
    Response: {
        "Message": "Method not found."
    }

    However it should be noted that I had to turn off SSL Certificate verification in postman as it was not showing the responses as received from the https server although https servers were sending back the responses which was verifiable via messages on the server console. OpenSSL certificates were generated and are in the directory https.
