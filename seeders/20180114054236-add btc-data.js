'use strict';

module.exports = {
    up: function (queryInterface) {
        
        return queryInterface.sequelize.query(`
            LOAD DATA LOCAL INFILE "./CSVdata/btc.csv" 
            INTO TABLE BTCs 
            COLUMNS TERMINATED BY ',' 
            OPTIONALLY ENCLOSED BY '"' 
            ESCAPED BY '"' 
            LINES TERMINATED BY '\n' 
            IGNORE 1 LINES
            (date,\`txVolume(USD)\`,txCount,\`marketcap(USD)\`,\`price(USD)\`,\`exchangeVolume(USD)\`,generatedCoins,fees);
        `);
    },
    down: function (queryInterface) {
        return queryInterface.bulkDelete('BTCs', null, {});
    }
};
