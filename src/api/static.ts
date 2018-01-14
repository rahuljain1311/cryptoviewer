'use strict';
import * as hapi from "hapi";

exports.register = (server: hapi.Server, options: hapi.PluginRegistrationOptions, next: hapi.ServerMethodNext) => {

    server.route({
        method: 'GET',
        path: '/images/{param*}',
        handler: {
            directory: {
                path: '../images'
            }
        }
    });
    // server.route({
    //     method: 'GET',
    //     path: '/{param*}',
    //     handler: {
    //         directory: {
    //             path: './static',
    //             redirectToSlash: true,
    //             index: true
    //         }
    //     }
    // });
    next(null, null, undefined);
};

exports.register.attributes = {
    name: 'static'
};
