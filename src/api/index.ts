'use strict';
import * as hapi from "hapi";

export function register (server: hapi.Server, options: hapi.PluginRegistrationOptions, next: hapi.ServerMethodNext) {

    server.route(require('./cryptocurrency'));
    next(null, null, undefined);
};

exports.register.attributes = {
    name: 'api'
};
