const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const verifyToken = require("../utils/jwtUtils");

indexRouter.get("/", verifyToken, indexController.indexGet);

module.exports = indexRouter;
