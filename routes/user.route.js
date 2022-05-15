const express = require('express');

const {
   userExists,
   protectToken,
   ProtectUser,
} = require('../middlewer/users.middlewer');

//Funcions controllers
const {
   getAllUser,
   createUser,
   getUserById,
   updateUser,
   deleteUser,
   login,
} = require('../contollers/user.controller');

//Validations
const {
   validationCreateUser,
   checkValidationsUser,
} = require('../validations/user.validation');

const router = express.Router();

//login endpoint
router.post('/login', login);

//create user endpoint
router.post('/', validationCreateUser, checkValidationsUser, createUser);

//Token protected
router.use(protectToken);

//Main endpoint
router.get('/', getAllUser);

//Endpoint by id
router
   .route('/:id')
   .get(userExists, getUserById)
   .patch(ProtectUser, userExists, updateUser)
   .delete(ProtectUser, userExists, deleteUser);

module.exports = { usersRouter: router };
