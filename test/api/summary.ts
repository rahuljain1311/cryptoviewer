'use strict';

import * as Lab from "lab";
import * as Code from "code";
import * as Hapi from "hapi";
import { Server as Composer }  from "../../createServer";
import {get as getCookie }  from "./getCookies";
const lab = exports.lab = Lab.script();

const experiment = lab.experiment;
const test = lab.test;

const summary = '/api/1/summary/';
experiment('Summary  - ', { timeout: 10000 }, () => {

    let linkAuthCookie: any;
    lab.before({ timeout: 50000 }, (done: any) => {

        return Composer((err: any, server: Hapi.Server) => {

            if (err) {
                console.error(err);
            }
            return getCookie(server).then((cookie: any) => {
                linkAuthCookie = cookie;
                server.stop(done);
            });
        });
    });
    
    test('it tests valid GET api', (done: any) => {

        const serverOptions = {
            method: 'GET',
            url: summary + '1',
            headers: {
                cookie: linkAuthCookie
            }
        };
        Composer((err: any, server: Hapi.Server) => {

            if (err) {
                console.error(err);
            }
            server.select('api').inject(serverOptions, (response) => {

                Code.expect(response.statusCode).to.equal(200);
                server.stop(done);
            });
        });
    });

    test('it tests invalid GET api', (done: any) => {

        const serverOptions = {
            method: 'GET',
            url: summary + '100',
            headers: {
                cookie: linkAuthCookie
            }
        };
        Composer((err: any, server: Hapi.Server) => {

            if (err) {
                console.error(err);
            }
            server.select('api').inject(serverOptions, (response) => {

                Code.expect(response.statusCode).to.equal(403);
                server.stop(done);
            });
        });
    });
});
