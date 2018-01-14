'use strict';
import * as Currency from "../businessLogic/cryptocurrency";
import * as Validate from "../businessLogic/validate";
import Constants from "../helpers/constants";
const FORBIDDEN_MSG = Constants.FORBIDDEN_MSG;
import * as Boom from "boom";
import * as hapi from "hapi";
import * as _ from 'lodash';
const JoiSchema = require('../joiSchema/schema');

module.exports = [
    {
        method: 'GET',
        path: '/oldCurrencyData/{currencyname}',
        handler: ( req: hapi.Request, reply: hapi.ReplyNoContinue ) => {            

            req.params.currencyname = _.lowerCase(req.params.currencyname);
            return Promise.all([
                Validate.currencyName(req.params.currencyname)
            ]).then(() => {

                reply(Currency.getData(req.params.currencyname));
            }).catch(() => {

                reply(Boom.create(403, FORBIDDEN_MSG));
            });
        },
        config: {
            tags: ['api'],
            // validate: {
            //     params: JoiSchema.campaignNo
            // },
            // response: {
            //     schema: JoiSchema.symptomsById
            // }
        }
    },
    {
        method: 'GET',
        path: '/lastDayData/{currencyname}',
        handler: ( req: hapi.Request, reply: hapi.ReplyNoContinue ) => {            

            req.params.currencyname = _.lowerCase(req.params.currencyname);
            return Promise.all([
                Validate.currencyName(req.params.currencyname)
            ]).then(() => {

                const currency = _.upperCase(req.params.currencyname);
                reply(Currency.getLastDayData(currency));
            }).catch(() => {

                reply(Boom.create(403, FORBIDDEN_MSG));
            });
        },
        config: {
            tags: ['api'],
            // validate: {
            //     params: JoiSchema.campaignNo
            // },
            // response: {
            //     schema: JoiSchema.symptomsById
            // }
        }
    },
    {
        method: 'GET',
        path: '/allCurrencies',
        handler: ( req: hapi.Request, reply: hapi.ReplyNoContinue ) => {            

            reply(Currency.getAllCurrencies());
        },
        config: {
            tags: ['api'],
            // validate: {
            //     params: JoiSchema.campaignNo
            // },
            // response: {
            //     schema: JoiSchema.symptomsById
            // }
        }
    }
];
