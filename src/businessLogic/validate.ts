import * as _ from "lodash";
import * as Moment from "moment";
const Model = require('../../models/index');

export function currencyName (currencyname: string) {

    return new Promise((resolve, reject) => {

        if(currencyname != 'btc' && currencyname != 'doge' && currencyname != 'eth' && currencyname != 'ltc')
        return reject();
    else
        return resolve();
    });
};
