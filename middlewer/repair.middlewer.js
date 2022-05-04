const { Repair } = require('../models/repairs');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { appError } = require('../utils/AppError');

const repairExists = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const repair = await Repair.findOne({ where: { id, status: 'pending' } });

   if (!repair) {
      return next(new appError('Repair cannot be pending', 404));
   }

   req.repair = repair;

   next();
});

module.exports = { repairExists };
