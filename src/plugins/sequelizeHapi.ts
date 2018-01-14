'use strict';

import * as Fs from "fs";
import * as Path from "path";
const Sequelize = require('sequelize');
let db: { [key: string]: { associate: Function} } = {};
const Cls = require('continuation-local-storage');
const namespace = Cls.createNamespace('patient-engagement');
// Sequelize.useCLS(namespace);
Sequelize.cls   = namespace;
const env = process.env.NODE_ENV || 'production';
const myOptions = require(__dirname + '/../../config/config')[env];
import * as hapi from "hapi";

export function register (server: hapi.Server, options: hapi.PluginRegistrationOptions, next: hapi.ServerMethodNext) {

    const sequelize = new Sequelize(myOptions.database, myOptions.username, myOptions.password, myOptions);

    Fs
        .readdirSync(__dirname + myOptions.modelsDictionaryPath)
        .filter((file: string) => {

            return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
        })
        .forEach((file: string) => {

            const model = sequelize.import(Path.join(__dirname + myOptions.modelsDictionaryPath, file));
            db[model.name] = model;
        });

    Object.keys(db).forEach((modelName) => {

        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    server.expose('db', db);
    next(null, null, undefined);
};

exports.register.attributes = {
    name: 'sequelizeHapi',
    version: '1.0.0'
};
