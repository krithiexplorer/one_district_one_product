const express = require("express");
const rootRouter = express.Router();
const usersRouter = require('./users');

rootRouter.use('/users',usersRouter);

module.exports = rootRouter;