'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
   
        return queryInterface.createTable('BTCs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            // date,txVolume(USD),txCount,marketcap(USD),price(USD),exchangeVolume(USD),generatedCoins,fees

            date: {
                type: Sequelize.STRING
            },
            'txVolume(USD)': {
                type: Sequelize.DOUBLE
            },
            txCount: {
                type: Sequelize.DOUBLE
            },
            'marketcap(USD)': {
                type: Sequelize.DOUBLE
            },
            'price(USD)': {
                type: Sequelize.DOUBLE
            },
            'exchangeVolume(USD)': {
                type: Sequelize.DOUBLE
            },
            generatedCoins: {
                type: Sequelize.DOUBLE
            },
            fees: {
                type: Sequelize.DOUBLE
            },
            type: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                // defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                // defaultValue: Sequelize.fn('NOW')
            }
        });
    },
    down: function (queryInterface) {
        return queryInterface.dropTable('BTCs');
    }
};
