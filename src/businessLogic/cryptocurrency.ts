import * as _ from "lodash";
const Model = require('../../models/index');
import * as http from 'http';
var request = require('request');
const APIKey = 'O09B5JDLTHP0VNZQ'

export function getData (currencyname: string) {

    return Model.BTC.findAll({
        where: { type: currencyname },
        attributes: ['txVolume(USD)', 'price(USD)', 'date']
    }).then((currencyData: any) => {

        currencyData = JSON.parse(JSON.stringify(currencyData));
        return currencyData;
    });
};

export function getRealTimeData (currencyname: string) {

    const url = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=' + 
    currencyname + '&market=USD&apikey=' + APIKey;
    return new Promise((resolve, reject) => {

        request(url, (error: any, response: any, JSONbody: any) =>  {

            if (!error && response.statusCode == 200) {
                
                const body = JSON.parse(JSONbody);
                const lastRefreshed = body['Meta Data']['7. Last Refreshed'];
                resolve(body['Time Series (Digital Currency Intraday)'][lastRefreshed]);
            }
        });
    });
};

export function getAllCurrencies() {

}
