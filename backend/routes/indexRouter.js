const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const verifyToken = require("../utils/jwtUtils");
const { isAuthenticated } = require("../utils/authMiddleware");

indexRouter.get("/", isAuthenticated, indexController.indexGet);

module.exports = indexRouter;
