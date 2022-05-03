const req = require('express/lib/request');
const res = require('express/lib/response');
const { Repair } = require('../models/repairs');

//all repairs
const getAllRepairs = async (req, res) => {
   try {
      const repairs = await Repair.findAll();

      res.status(200).json({ repairs });
   } catch (error) {
      console.log(error);
   }
};

//New repair
const createRepair = async (req, res) => {
   try {
      const { date, userId } = req.body;

      const newRepair = await Repair.create({ date, userId });

      res.status(201).json({ newRepair });
   } catch (error) {
      console.log(error);
   }
};

//Repair by id
const getRepairById = async (req, res) => {
   try {
      const { repair } = req;

      res.status(201).json({ repair });
   } catch (error) {
      console.log(error);
   }
};

//Update repair
const updateRepair = async (req, res) => {
   try {
      const { repair } = req;
      const { status } = req.body;

      await repair.update({ status });

      res.status(201).json({ status: 'success' });
   } catch (error) {
      console.log();
   }
};

//Delete repair
const deleteRepair = async (req, res) => {
   try {
      const { repair } = req;

      await repair.update({ status: 'cancelled' });

      res.status(200).json({ status: 'success' });
   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   getAllRepairs,
   createRepair,
   getRepairById,
   updateRepair,
   deleteRepair,
};
