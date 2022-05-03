const express = require('express');

//Routers
const { usersRouter } = require('./routes/user.route');
const { repairsRouter } = require('./routes/repair.route');

//Init express app
const app = express();

//Enable incoming JSON data
app.use(express.json());

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

module.exports = { app };
