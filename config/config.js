'use strict';

module.exports = {
    "production": {
        "username": "root",
        "password": "password",
        "database": "crypto_values",
        "host": "localhost",
        "dialect": "mysql",
        "seederStorage": "sequelize",
        "modelsDictionaryPath": "/../../models" //from the plugins dictionary
    },
    "local": {
        "username": "root",
        "password": "password",
        "database": "crypto_values",
        "host": "localhost",
        "dialect": "mysql",
        "seederStorage": "sequelize",
        "modelsDictionaryPath": "/../../models" //from the plugins dictionary
    },
    "test": {
        "username": "root",
        "password": "password",
        "database": "crypto_values",
        "host": "localhost",
        "dialect": "mysql",
        "seederStorage": "sequelize",
        "modelsDictionaryPath": "/../../models" //from the plugins dictionary
    },
    "testServer": {
        "username": "root",
        "password": "password",
        "database": "crypto_values_test",
        "host": "localhost",
        "dialect": "mysql",
        "seederStorage": "sequelize",
        "modelsDictionaryPath": "/../../models" //from the plugins dictionary
    }
};
