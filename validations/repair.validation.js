const { body, validationResult } = require('express-validator');

const validationsRepair = [
   body('date').notEmpty().withMessage('Date is required'),
   body('computerNumber')
      .notEmpty()
      .withMessage('Computer number is required')
      .isLength({ min: 7 })
      .withMessage('Computer number cannot be mimimum 7 characters'),
   body('comments').notEmpty().withMessage('Comments are required'),
];

const checkValidationsRepair = (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      const messages = errors.array().map(({ msg }) => msg);

      const errMgs = messages.join(', ');

      res.status(400).json({
         status: 'error',
         errors: errMgs,
      });
   }

   next();
};

module.exports = { validationsRepair, checkValidationsRepair };
