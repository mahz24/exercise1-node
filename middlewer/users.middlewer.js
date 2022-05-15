//Extentions
const jwt = require('jsonwebtoken');

//Models
const { User } = require('../models/users');

//Errors
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

const protectToken = catchAsync(async (req, res, next) => {
   let token;

   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
   ) {
      token = req.headers.authorization.split(' ')[1];
   }

   if (!token) {
      return next(new appError('Sesion invalidate', 403));
   }

   //Validate token
   const decoded = jwt.verify(token, process.env.JWT_SECRET);

   const user = await User.findOne({
      where: { id: decoded.id, status: 'active' },
   });

   if (!user) {
      return next(
         new appError('The owner of this token is not longer available', 403)
      );
   }

   req.sessionUser = user;

   next();
});

const protectEmployee = catchAsync(async (req, res, next) => {
   console.log(req.sessionUser);
   if (req.sessionUser.role !== 'employee') {
      return next(new appError('Restricted access', 403));
   }

   next();
});

const ProtectUser = catchAsync(async (req, res, next) => {
   const { id } = req.params;
   if (req.sessionUser.id !== Number(id)) {
      return next(new appError('You don`t have access to this acount', 403));
   }
   console.log(id);
   next();
});

module.exports = { userExists, protectToken, protectEmployee, ProtectUser };
