const res = require('express/lib/response');
const { User } = require('../models/users');

const userExists = async (req, res, next) => {
   const { id } = req.params;

   const user = await User.findOne({ where: { id } });

   if (!user) {
      return res
         .status(404)
         .json({ status: 'error', message: 'user not found given by id' });
   }

   req.user = user;

   next();
};

module.exports = { userExists };
