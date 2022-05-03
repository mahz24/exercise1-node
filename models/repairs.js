const { DataTypes } = require('sequelize');
const { db } = require('../utils/dataBase');

const Repair = db.define('repair', {
   id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
   },

   date: {
      type: DataTypes.STRING,
      allowNull: false,
   },

   status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
   },

   userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
});

module.exports = { Repair };
