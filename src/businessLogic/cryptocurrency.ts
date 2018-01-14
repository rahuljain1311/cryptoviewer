import * as _ from "lodash";
const Model = require('../../models/index');

export function getData (currencyname: string) {

    return Model.BTC.findAll({
        where: { type: currencyname },
        attributes: ['txVolume(USD)', 'price(USD)', 'date']
    }).then((currencyData: any) => {

        currencyData = JSON.parse(JSON.stringify(currencyData));
        return currencyData;
    });
};
