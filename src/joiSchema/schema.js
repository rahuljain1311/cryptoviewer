'use strict';

const Joi = require('joi');

const main = {
    insuranceNo: Joi.number().integer().min(1).required(),
    dependents: {
        children: Joi.number().integer().min(0),
        parentDad: Joi.boolean(),
        parentMom: Joi.boolean(),
        spouse: Joi.boolean()
    },
    location: {
        latitude: Joi.number().min(-90).max(90).required(),
        longitude: Joi.number().min(-180).max(180).required(),
        zipcode: Joi.number().min(0).required(),
        name: Joi.string().max(255).required(),
        address: Joi.string().max(500).required()
    },

    messageType: Joi.number().integer().min(1).max(2).required(),
    phoneNumber: Joi.string().max(20).required(),
    emailId: Joi.string().max(100).required(),
    expiryTime: Joi.number().integer().min(1).required(),
    expiryUnit: Joi.string().required().valid([
        'seconds', 
        'minutes',
        'hours',
        'days',
        'weeks',
        'months'
    ]),

    callToAction: {
        "name": Joi.string().max(255).required(),
        "description": Joi.string().max(255).required(),
        "link": Joi.string().max(255).required(),
    }
};

exports.params = Joi.object({
    insuranceNo: main.insuranceNo
});

exports.familyProfileById = Joi.object({
    insuranceNo: main.insuranceNo
});
