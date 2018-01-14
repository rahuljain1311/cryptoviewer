'use strict';
import * as Campaign from "../businessLogic/campaign";
import * as Validate from "../businessLogic/validate";
import Constants from "../helpers/constants";
const FORBIDDEN_MSG = Constants.FORBIDDEN_MSG;
import * as Boom from "boom";
import * as hapi from "hapi";
const JoiSchema = require('../joiSchema/schema');

module.exports = [
    {
        method: 'GET',
        path: '/campaign/{campaignNo}',
        handler: ( req: hapi.Request, reply: hapi.ReplyNoContinue ) => {            

            // return Promise.all([
            //     Validate.campaign(req.params.campaignNo),
            //     Validate.operational(req.auth.credentials.expiry)
            // ]).then(() => {

                reply(Campaign.getSymptoms(req.params.campaignNo));
            // }).catch(() => {

            //     reply(Boom.create(403, FORBIDDEN_MSG));
            // });
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
