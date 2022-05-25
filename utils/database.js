const { Sequelize } = require('sequelize');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// database connection
const db = new Sequelize({
   dialect: 'postgres',
   host: process.env.DB_HOST,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB,
   logging: false,
   dialectOption:
      process.env.NODE_ENV === 'production'
         ? {
              ssl: {
                 require: true,
                 rejetUnauthorized: false,
              },
           }
         : {},
});

module.exports = { db };
