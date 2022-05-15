const req = require('express/lib/request');
const res = require('express/lib/response');
const { Repair } = require('../models/repairs');
const { User } = require('../models/users');

//Errors
const { catchAsync } = require('../utils/catchAsync');

//all repairs
const getAllRepairs = catchAsync(async (req, res) => {
   const repairs = await Repair.findAll({
      where: { status: 'pending' },
      include: [{ model: User }],
   });

   res.status(200).json({ repairs });
});

//New repair
const createRepair = catchAsync(async (req, res, next) => {
   const { date, userId, computerNumber, comments } = req.body;

   const newRepair = await Repair.create({
      date,
      userId,
      computerNumber,
      comments,
   });

   res.status(201).json({ newRepair });
});

//Repair by id
const getRepairById = catchAsync(async (req, res) => {
   const { repair } = req;

   res.status(201).json({ repair });
});

//Update repair
const updateRepair = catchAsync(async (req, res) => {
   const { repair } = req;
   const { status } = req.body;

   await repair.update({ status });

   res.status(201).json({ status: 'success' });
});

//Delete repair
const deleteRepair = catchAsync(async (req, res) => {
   const { repair } = req;

   await repair.update({ status: 'cancelled' });

   res.status(200).json({ status: 'success' });
});

module.exports = {
   getAllRepairs,
   createRepair,
   getRepairById,
   updateRepair,
   deleteRepair,
};
