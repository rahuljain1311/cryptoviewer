'use strict';
import * as Hapi from "hapi";
import { params } from "../joiSchema/schema";
import { request } from "http";
import Constants from "../helpers/constants";

exports.register = (server: Hapi.Server, options: Hapi.PluginRegistrationOptions, next: Hapi.ServerMethodNext) => {

    server.route({
        method: 'GET',
        path: '/asset-manifest.json',
        handler: ( req: Hapi.Request, reply: any ) => {
            reply.file('../../client/build/asset-manifest.json');
        }
    });
    server.route({
        method: 'GET',
        path: '/favicon.ico',
        handler: ( req: Hapi.Request, reply: any ) => {
            reply.file('../../client/build/favicon.ico');
        }
    });
    server.route({
        method: 'GET',
        path: '/manifest.json',
        handler: ( req: Hapi.Request, reply: any ) => {
            reply.file('../../client/build/manifest.json');
        }
    });
    // server.route({
    //     method: 'GET',
    //     path: '/service-worker.js',
    //     handler: ( req: any, reply: any ) => {
    //         reply.file('../../client/build/service-worker.js');
    //     }
    // });
    next(null, null, undefined);
};

exports.register.attributes = {
    name: 'reactRouter'
};
