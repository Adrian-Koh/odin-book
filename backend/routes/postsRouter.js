const { Router } = require("express");
const postsRouter = Router();
const postsController = require("../controllers/postsController");
const { isAuthenticated } = require("../utils/authMiddleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

postsRouter.post(
  "/",
  isAuthenticated,
  upload.single("file"),
  postsController.createPost
);

module.exports = postsRouter;
