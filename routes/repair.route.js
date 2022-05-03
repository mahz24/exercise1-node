const express = require('express');

const {
   createRepair,
   getAllRepairs,
   getRepairById,
   updateRepair,
   deleteRepair,
} = require('../contollers/repair.controller');
const {
   repairExists,
   statusIsPending,
} = require('../middlewer/repair.middlewer');

const router = express.Router();

//Main endpoints
router.route('/').get(getAllRepairs).post(createRepair);

//Endpoints by id
router
   .route('/:id')
   .get(repairExists, statusIsPending, getRepairById)
   .patch(repairExists, statusIsPending, updateRepair)
   .delete(repairExists, statusIsPending, deleteRepair);

module.exports = { repairsRouter: router };
