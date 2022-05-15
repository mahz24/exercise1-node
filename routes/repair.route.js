//Extentions
const express = require('express');
const { get } = require('express/lib/response');

//Controllers Funcions
const {
   createRepair,
   getAllRepairs,
   getRepairById,
   updateRepair,
   deleteRepair,
} = require('../contollers/repair.controller');

//Validations
const { repairExists } = require('../middlewer/repair.middlewer');
const {
   protectEmployee,
   protectToken,
} = require('../middlewer/users.middlewer');
const {
   validationsRepair,
   checkValidationsRepair,
} = require('../validations/repair.validation');

const router = express.Router();

//Main endpoints
router.post('/', validationsRepair, checkValidationsRepair, createRepair);

//Validation role
router.use(protectToken);
router.use(protectEmployee);

//Endpoint that get all repairs
router.get('/', getAllRepairs);

//Endpoints by id
router
   .route('/:id')
   .get(repairExists, getRepairById)
   .patch(repairExists, updateRepair)
   .delete(repairExists, deleteRepair);

module.exports = { repairsRouter: router };
