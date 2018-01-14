'use strict';

import * as Confidence from "confidence";
import Constants from "./src/helpers/constants";

const criteria = {
    env: process.env.NODE_ENV
};

const logging = {
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout']
    }
};

const swaggerOptionContent = {
    info: {
        'title': 'Crypto API Documentation',
        'version': '1'
    },
    connectionLabel: 'api'
};

const config = {
    $meta: 'This file configures the plot device.',
    projectName: 'Crypto',
    port: {
        api: {
            $filter: 'env',
            local: 5000,
            production: 5000,
            testServer: 5000,
            $default: 5000
        },
        docs: {
            $filter: 'env',
            local: 5001,
            production: 5001,
            testServer: 5001,
            $default: 5001
        }
    },
    host: {
        $filter: 'env',
        local: 'http://localhost',
        production: 'http://5.5.5.5',
        testServer: 'http://6.6.6.6',
        $default: 'http://localhost'
    },
    logging: {
        $filter: 'env',
        local: logging,
        production: logging,
        testServer: logging,
        $default: logging
    },
    swaggerOptions: {
        $filter: 'env',
        local: swaggerOptionContent,
        production: swaggerOptionContent,
        testServer: swaggerOptionContent,
        $default: swaggerOptionContent
    }
};

const store = new Confidence.Store(config);

export function get (key: string) {

    return store.get(key, criteria);
};

export function meta (key: string) {

    return store.meta(key, criteria);
};
