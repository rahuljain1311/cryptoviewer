'use strict';

import * as Lab from "lab";
import * as Code from "code";
import { Server as Composer }  from "../createServer";

const lab = exports.lab = Lab.script();

lab.experiment('App', () => {

    lab.test('it composes a server', (done: any) => {

        Composer((err: any, composedServer: any) => {

            Code.expect(composedServer).to.be.an.object();
            done();
        });
    });
});
