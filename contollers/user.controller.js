const res = require('express/lib/response');
const { User } = require('../models/users');

//Errors
const { catchAsync } = require('../utils/catchAsync');

//All users
const getAllUser = catchAsync(async (req, res) => {
   const user = await User.findAll();

   res.status(200).json({
      user,
   });
});

//New user
const createUser = catchAsync(async (req, res, next) => {
   const { name, email, password, role } = req.body;

   const newUser = await User.create({ name, email, password, role });

   res.status(201).json({ newUser });
});

//User by id
const getUserById = catchAsync(async (req, res) => {
   const { user } = req;

   res.status(200).json({ user });
});

// Update user
const updateUser = catchAsync(async (req, res) => {
   const { user } = req;
   const { name, email, password, role } = req.body;

   await user.update({ name, email, password, role });

   res.status(200).json({ status: 'success' });
});

//Delete user
const deleteUser = catchAsync(async (req, res) => {
   const { user } = req;

   await user.update({ status: 'unavalible' });

   res.status(200).json({ status: 'success' });
});

module.exports = {
   getAllUser,
   createUser,
   getUserById,
   updateUser,
   deleteUser,
};
