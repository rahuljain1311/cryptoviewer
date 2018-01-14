'use strict';

const Fs = require('fs');
const Path = require('path');
const seq = require('sequelize-hierarchy');
const Sequelize = seq();
const basename = Path.basename(module.filename);
const env = process.env.NODE_ENV || 'production';
const config = require(__dirname + '/../config/config')[env];
const db = {};

let sequelize;
if (config && config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
}
else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

Fs
    .readdirSync(__dirname)
    .filter((file) => {

        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {

        const model = sequelize.import(Path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {

    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
