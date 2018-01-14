'use strict';

import * as Lab from "lab";
import * as Hapi from "hapi";
import * as Config from "../../config";
const IndexPlugin = require('../../src/api/index');

const lab = exports.lab = Lab.script();

lab.beforeEach((done: any) => {

    const plugins = [IndexPlugin];
    const server = new Hapi.Server().select('api');
    server.connection({ 
        port: Config.get('/port/api')
    });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }
        done();
    });
});

lab.experiment('Index Plugin', () => {

});
