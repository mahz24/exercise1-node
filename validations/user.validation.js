const { body, validationResult } = require('express-validator');

const validationCreateUser = [
   body('name').notEmpty().withMessage('Name cannot be empty'),
   body('email')
      .notEmpty()
      .withMessage('Email cannot be empty')
      .isEmail()
      .withMessage('Email must be a valid email address'),
   body('password')
      .notEmpty()
      .withMessage('Password must be a valid password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
];

const checkValidationsUser = (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      const messages = errors.array().map(({ msg }) => msg);

      const errMgs = messages.join(', ');

      return res.status(400).json({
         status: 'error',
         message: errMgs,
      });
   }

   next();
};

module.exports = { validationCreateUser, checkValidationsUser };
