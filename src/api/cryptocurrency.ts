'use strict';
import * as Currency from "../businessLogic/cryptocurrency";
import * as Validate from "../businessLogic/validate";
import Constants from "../helpers/constants";
const FORBIDDEN_MSG = Constants.FORBIDDEN_MSG;
import * as Boom from "boom";
import * as hapi from "hapi";
const JoiSchema = require('../joiSchema/schema');

module.exports = [
    {
        method: 'GET',
        path: '/cryptocurrency/{currencyname}',
        handler: ( req: hapi.Request, reply: hapi.ReplyNoContinue ) => {            

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
    }
];
