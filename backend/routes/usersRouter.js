const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");
const verifyToken = require("../utils/jwtUtils");
const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports = usersRouter;
