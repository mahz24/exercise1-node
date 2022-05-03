const { Repair } = require('../models/repairs');

const repairExists = async (req, res, next) => {
   const { id } = req.params;

   const repair = await Repair.findOne({ where: { id } });

   if (!repair) {
      res.status(404).json({
         status: 'error',
         message: 'repair not found given by id',
      });
   }

   req.repair = repair;

   next();
};

const statusIsPending = (req, res, next) => {
   const { repair } = req;

   const repairStatus = repair.status;

   if (repairStatus !== 'pending') {
      res.status(404).json({
         status: 'error',
         message: 'repair is not pending',
      });
   }
   next();
};

module.exports = { repairExists, statusIsPending };
