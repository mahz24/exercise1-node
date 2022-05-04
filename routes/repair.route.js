const express = require('express');

const {
   createRepair,
   getAllRepairs,
   getRepairById,
   updateRepair,
   deleteRepair,
} = require('../contollers/repair.controller');
const { repairExists } = require('../middlewer/repair.middlewer');
const {
   validationsRepair,
   checkValidationsRepair,
} = require('../validations/repair.validation');

const router = express.Router();

//Main endpoints
router
   .route('/')
   .get(getAllRepairs)
   .post(validationsRepair, checkValidationsRepair, createRepair);

//Endpoints by id
router
   .route('/:id')
   .get(repairExists, getRepairById)
   .patch(repairExists, updateRepair)
   .delete(repairExists, deleteRepair);

module.exports = { repairsRouter: router };
