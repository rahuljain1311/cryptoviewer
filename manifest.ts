'use strict';

import * as Confidence from "confidence";
import * as Path from "path";
import * as Config from "./config";

const criteria = {
    env: process.env.NODE_ENV
};

const manifest = {
    $meta: 'This file defines the plot device.',
    server: {
        debug: {
            request: ['error']
        },
        connections: {
            routes: {
                log: true,
                files: {
                    relativeTo: Path.join(__dirname, 'client/build')
                }
            }
        }
    },
    connections: [{
        port: Config.get('/port/api'),
        labels: 'api',
        routes: { cors: true }
    },
    {
        port: Config.get('/port/docs'),
        labels: 'docs'
    }],
    registrations: [
        {
            plugin: {
                register: 'inert',
            }
        },
        {
            plugin: {
                register: 'vision',
            }
        },
        {
            plugin: {
                register: 'good',
                options: Config.get('/logging')
            }
        },
        {
            plugin: {
                register: 'hapi-swagger',
                options: Config.get('/swaggerOptions'),
                select: ['docs']
            }
        },
        {
            plugin: require('./src/api/static'),
            options: {
                select: ['api'],
                routes: {
                    prefix: '/static'
                }
            }
        },
        {
            plugin: require('./src/api/index'),
            options: {
                select: ['api', 'docs'],
                routes: {
                    prefix: '/api'
                }
            }
        },
        {
            plugin: require('./src/api/reactRouter'),
            options: {
                select: ['api']
            }
        },
        {
            plugin: require('./src/plugins/sequelizeHapi')
        },
        {
            plugin: {
                register: 'inject-then',
            }
        }
    ]
};


const store = new Confidence.Store(manifest);


export function get (key: string) {

    return store.get(key, criteria);
};


export function meta (key: string) {

    return store.meta(key, criteria);
};
