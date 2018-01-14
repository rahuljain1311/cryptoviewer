import * as _ from "lodash";
const Model = require('../../models/index');
import * as http from 'http';
var request = require('request');
const APIKey = 'O09B5JDLTHP0VNZQ'

export function getData (currencyname: string) {

    return Model.BTC.findAll({
        where: { type: currencyname },
        attributes: ['txVolume(USD)', 'price(USD)', 'date'],
        order: [ ['date', 'DESC'] ],
        limit: 100
    }).then((currencyData: any) => {

        currencyData = JSON.parse(JSON.stringify(currencyData));
        return currencyData;
    });
};

export function getLastDayData (currencyname: string) {

    const url = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=' + 
    currencyname + '&market=USD&apikey=' + APIKey;
    return new Promise((resolve, reject) => {

        request(url, (error: any, response: any, JSONbody: any) =>  {

            if (!error && response.statusCode == 200) {
                
                const body = JSON.parse(JSONbody);
                const lastRefreshed = body['Meta Data']['7. Last Refreshed'];

                const rawData = body['Time Series (Digital Currency Intraday)'];
                const processedData: any = [];
                for(var key in rawData){
                    processedData.push({
                        timeStamp: key,
                        price: rawData[key]['1a. price (USD)'],
                        volume: rawData[key]['2. volume'],
                        marketCapital: rawData[key]['3. market cap (USD)'],
                    });
                }

                resolve({
                    price: body['Time Series (Digital Currency Intraday)'][lastRefreshed]['1a. price (USD)'],
                    volume: body['Time Series (Digital Currency Intraday)'][lastRefreshed]['2. volume'],
                    marketCapital: body['Time Series (Digital Currency Intraday)'][lastRefreshed]['3. market cap (USD)'],
                    currencyCode: body['Meta Data']['2. Digital Currency Code'],
                    currencyName: body['Meta Data']['3. Digital Currency Name'],
                    marketCode: body['Meta Data']['4. Market Code'],
                    marketName: body['Meta Data']['5. Market Name'],
                    lastRefreshed: lastRefreshed,
                    lastRefreshedUnit: body['Meta Data']['8. Time Zone'],
                    lastDayData: processedData
                });
            }
        });
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

                resolve({
                    price: body['Time Series (Digital Currency Intraday)'][lastRefreshed]['1a. price (USD)'],
                    volume: body['Time Series (Digital Currency Intraday)'][lastRefreshed]['2. volume'],
                    marketCapital: body['Time Series (Digital Currency Intraday)'][lastRefreshed]['3. market cap (USD)'],
                    currencyCode: body['Meta Data']['2. Digital Currency Code'],
                    currencyName: body['Meta Data']['3. Digital Currency Name'],
                    marketCode: body['Meta Data']['4. Market Code'],
                    marketName: body['Meta Data']['5. Market Name'],
                    lastRefreshed: lastRefreshed,
                    lastRefreshedUnit: body['Meta Data']['8. Time Zone']
                });
            }
        });
    });
};

export function getAllCurrencies() {

    const currencies = ['BTC', 'DOGE', 'ETH', 'LTC'];
    const promises : any = [];
    _.forEach(currencies, (currency) => {
        promises.push(getRealTimeData(currency));
    })
    return Promise.all(promises).then((allCurrencyData) => {

        console.log('all data = ', allCurrencyData);
        return allCurrencyData;
    });
}
