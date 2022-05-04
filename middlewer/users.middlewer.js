const { User } = require('../models/users');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { appError } = require('../utils/AppError');

const userExists = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const user = await User.findOne({ where: { id } });

   if (!user) {
      return next(new appError('User not found by id', 404));
   }

   req.user = user;

   next();
});

module.exports = { userExists };
