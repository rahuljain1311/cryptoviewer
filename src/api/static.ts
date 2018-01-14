'use strict';
import * as hapi from "hapi";

exports.register = (server: hapi.Server, options: hapi.PluginRegistrationOptions, next: hapi.ServerMethodNext) => {

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './',
                redirectToSlash: true,
                index: true
            }
        }
    });
    next(null, null, undefined);
};

exports.register.attributes = {
    name: 'static'
};
