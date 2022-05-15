//Extentions
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

//Models
const { User } = require('../models/users');

//Errors
const { catchAsync } = require('../utils/catchAsync');
const { appError } = require('../utils/AppError');

//All users function
const getAllUser = catchAsync(async (req, res, next) => {
   const user = await User.findAll({ attributes: { exclude: ['password'] } });

   res.status(200).json({
      user,
   });
});

//New user funtion
const createUser = catchAsync(async (req, res, next) => {
   const { name, email, password, role } = req.body;

   const salt = await bcrypt.genSalt(12);
   const hashPassword = await bcrypt.hash(password, salt);

   const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role,
   });

   newUser.password = undefined;

   res.status(201).json({ newUser });
});

//User by id funtion
const getUserById = catchAsync(async (req, res, next) => {
   const { user } = req;

   user.password = undefined;

   res.status(200).json({ user });
});

// Update user funtion
const updateUser = catchAsync(async (req, res, next) => {
   const { user } = req;
   const { name, email, password, role } = req.body;

   await user.update({ name, email, password, role });

   res.status(200).json({ status: 'success' });
});

//Delete user funtion
const deleteUser = catchAsync(async (req, res, next) => {
   const { user } = req;

   await user.update({ status: 'unavalible' });

   res.status(200).json({ status: 'success' });
});

//login funtion
const login = catchAsync(async (req, res, next) => {
   const { email, password } = req.body;

   const user = await User.findOne({ where: { email, status: 'active' } });

   //Check that user exist
   if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new appError('invalid credentials', 400));
   }

   const token = await jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      process.env.JWT_EXPITATION
   );

   user.password = undefined;

   res.status(200).json({ token, user });
});

module.exports = {
   getAllUser,
   createUser,
   getUserById,
   updateUser,
   deleteUser,
   login,
};
