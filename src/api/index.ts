'use strict';
import * as hapi from "hapi";

export function register (server: hapi.Server, options: hapi.PluginRegistrationOptions, next: hapi.ServerMethodNext) {

    server.route(require('./campaign'));
    next(null, null, undefined);
};

exports.register.attributes = {
    name: 'api'
};
