const res = require('express/lib/response');
const { User } = require('../models/users');

//All users
const getAllUser = async (req, res) => {
   try {
      const user = await User.findAll();

      res.status(200).json({
         user,
      });
   } catch (error) {
      console.log();
   }
};
//New user
const createUser = async (req, res) => {
   try {
      const { name, email, password, role } = req.body;

      const newUser = await User.create({ name, email, password, role });

      res.status(201).json({ newUser });
   } catch (error) {
      console.log(error);
   }
};

//User by id
const getUserById = async (req, res) => {
   try {
      const { user } = req;

      res.status(200).json({ user });
   } catch (error) {
      console.log(error);
   }
};

// Update user
const updateUser = async (req, res) => {
   try {
      const { user } = req;
      const { name, email, password, role } = req.body;

      await user.update({ name, email, password, role });

      res.status(200).json({ status: 'success' });
   } catch (error) {
      console.log(error);
   }
};

//Delete user
const deleteUser = async (req, res) => {
   try {
      const { user } = req;

      await user.update({ status: 'unavalible' });

      res.status(200).json({ status: 'success' });
   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   getAllUser,
   createUser,
   getUserById,
   updateUser,
   deleteUser,
};
