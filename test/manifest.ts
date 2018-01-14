'use strict';

import * as Lab from "lab";
import * as Code from "code";
const Manifest = require('../manifest');
const lab = exports.lab = Lab.script();

lab.experiment('Manifest', () => {

    lab.test('it gets manifest data', (done: any) => {

        Code.expect(Manifest.get('/')).to.be.an.object();
        done();
    });

    lab.test('it gets manifest meta data', (done: any) => {

        Code.expect(Manifest.meta('/')).to.match(/this file defines the plot device/i);
        done();
    });
});
