/*
* Configuration file for Homework Assignment 1
*/

// Container for all environments
var environments = {};

// Staging environment (default)
environments.staging = {
    'httpPort' : 3000,
    'httpsPort' : 3001,
    'envName' : 'staging_hw1'
};

// Production environment
environments.production = {
    'httpPort' : 5000,
    'httpsPort' : 5001,
    'envName' : 'production_hw1'
};

// Determine which environment was passed as command-line argument
var currentEnvironment = null;
if(typeof(process.env.NODE_ENV) == 'string') {
    currentEnvironment = process.env.NODE_ENV.toLowerCase();
}
else {
    currentEnvironment = '';
}

// Check that the current environment is one of the defined environments, if not, default to staging
var environmentToExport = null;
if(typeof(environments[currentEnvironment]) == 'object') {
    environmentToExport = environments[currentEnvironment];
}
else {
    environmentToExport = environments.staging;
}

// Export the module
module.exports = environmentToExport;