'use strict';

module.exports = {
    up: function (queryInterface) {
        
        return Promise.all([
            queryInterface.sequelize.query(`
            LOAD DATA LOCAL INFILE "./CSVdata/btc.csv" 
            INTO TABLE BTCs 
            COLUMNS TERMINATED BY ',' 
            OPTIONALLY ENCLOSED BY '"' 
            ESCAPED BY '"' 
            LINES TERMINATED BY '\n' 
            IGNORE 1 LINES
            (date,\`txVolume(USD)\`,txCount,\`marketcap(USD)\`,\`price(USD)\`,\`exchangeVolume(USD)\`,generatedCoins,fees)
            SET type = 'btc';`),

            queryInterface.sequelize.query(`
            LOAD DATA LOCAL INFILE "./CSVdata/doge.csv" 
            INTO TABLE BTCs 
            COLUMNS TERMINATED BY ',' 
            OPTIONALLY ENCLOSED BY '"' 
            ESCAPED BY '"' 
            LINES TERMINATED BY '\n' 
            IGNORE 1 LINES
            (date,\`txVolume(USD)\`,txCount,\`marketcap(USD)\`,\`price(USD)\`,\`exchangeVolume(USD)\`,generatedCoins,fees)
            SET type = 'doge';`),

            queryInterface.sequelize.query(`
            LOAD DATA LOCAL INFILE "./CSVdata/eth.csv" 
            INTO TABLE BTCs 
            COLUMNS TERMINATED BY ',' 
            OPTIONALLY ENCLOSED BY '"' 
            ESCAPED BY '"' 
            LINES TERMINATED BY '\n' 
            IGNORE 1 LINES
            (date,\`txVolume(USD)\`,txCount,\`marketcap(USD)\`,\`price(USD)\`,\`exchangeVolume(USD)\`,generatedCoins,fees)
            SET type = 'eth';`),

            queryInterface.sequelize.query(`
            LOAD DATA LOCAL INFILE "./CSVdata/ltc.csv" 
            INTO TABLE BTCs 
            COLUMNS TERMINATED BY ',' 
            OPTIONALLY ENCLOSED BY '"' 
            ESCAPED BY '"' 
            LINES TERMINATED BY '\n' 
            IGNORE 1 LINES
            (date,\`txVolume(USD)\`,txCount,\`marketcap(USD)\`,\`price(USD)\`,\`exchangeVolume(USD)\`,generatedCoins,fees)
            SET type = 'ltc';`),
            
        ]);
    },
    down: function (queryInterface) {
        return queryInterface.bulkDelete('BTCs', null, {});
    }
};
