const { Router } = require("express");
const postsRouter = Router();
const postsController = require("../controllers/postsController");
const multer = require("multer");
const verifyToken = require("../utils/jwtUtils");
const upload = multer({ storage: multer.memoryStorage() });

postsRouter.post(
  "/",
  verifyToken,
  upload.single("file"),
  postsController.createPost
);

module.exports = postsRouter;
