"use strict";

const assert = require("assert");
const dotenv = require("dotenv");

// read in the .env file
dotenv.config();

// capture the environment variables the application needs
const {
    PORT,
    HOST,
    HOST_URL,
    SQL_USER,
    SQL_PASSWORD,
    SQL_SERVER,
    SQL_DATABASE
} = process.env;

// validate the required configuration information
assert(PORT, "PORT configuration is required.");
assert(HOST, "HOST configuration is required.");
assert(HOST_URL, "HOST_URL configuration is required.");
assert(SQL_USER, "SQL_USER configuration is required.");
assert(SQL_PASSWORD, "SQL_PASSWORD configuration is required.");
assert(SQL_SERVER, "SQL_SERVER configuration is required.");
assert(SQL_DATABASE, "SQL_DATABASE configuration is required.");

// export the configuration information
module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    sql: {
        user: SQL_USER,
        password: SQL_PASSWORD,
        server: SQL_SERVER,
        database: SQL_DATABASE,
        driver: "msnodesqlv8"
    }
};