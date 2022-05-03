const { Sequelize } = require('sequelize');

const db = new Sequelize({
   dialect: 'postgres',
   host: 'localhost',
   username: 'postgres',
   password: 'mahz2410',
   database: 'computer_repair',
   logging: false,
});

module.exports = { db };
