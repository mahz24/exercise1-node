const express = require('express');
const helmet = require('helmet');
const compresssion = require('compression');
const morgan = require('morgan');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config({ path: './config.env' });

//Routers
const { usersRouter } = require('./routes/user.route');
const { repairsRouter } = require('./routes/repair.route');
const { errorHandler } = require('./contollers/errors.controller');

//Init express app
const app = express();

//Enable incoming JSON data
app.use(express.json());

//Libreries for production
app.use(helmet());
app.use(compresssion());

//Log incoming requests
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else morgan('combined');

const limiter = rateLimit({
   max: 10000,
   windowMs: 1 * 60 * 1000,
   message: 'Too many request from this IP',
});

app.use(limiter);

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

//Errors handlers
app.use('*', errorHandler);

module.exports = { app };
