const express = require('express');

const { userExists } = require('../middlewer/users.middlewer');

const {
   getAllUser,
   createUser,
   getUserById,
   updateUser,
   deleteUser,
} = require('../contollers/user.controller');

const router = express.Router();

//Main endpoint
router.route('/').get(getAllUser).post(createUser);

//Endpoint by id
router
   .route('/:id')
   .get(userExists, getUserById)
   .patch(userExists, updateUser)
   .delete(userExists, deleteUser);

module.exports = { usersRouter: router };
