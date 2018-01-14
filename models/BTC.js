'use strict';

module.exports = function (sequelize, DataTypes) {

    const BTC = sequelize.define('BTC', {
        date: {
            type: DataTypes.STRING
        },
        'txVolume(USD)': {
            type: DataTypes.DOUBLE
        },
        txCount: {
            type: DataTypes.DOUBLE
        },
        'marketcap(USD)': {
            type: DataTypes.DOUBLE
        },
        'price(USD)': {
            type: DataTypes.DOUBLE
        },
        'exchangeVolume(USD)': {
            type: DataTypes.DOUBLE
        },
        generatedCoins: {
            type: DataTypes.DOUBLE
        },
        fees: {
            type: DataTypes.DOUBLE
        },
    });
    return BTC;
};
