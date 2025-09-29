const { Router } = require("express");
const postsRouter = Router();
const postsController = require("../controllers/postsController");
const verifyToken = require("../utils/jwtUtils");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

postsRouter.get("/", verifyToken, postsController.getFollowingPosts);
postsRouter.get("/single", verifyToken, postsController.getUserPosts);
postsRouter.post(
  "/",
  verifyToken,
  upload.single("file"),
  postsController.createPost
);
postsRouter.post("/:postId/like", verifyToken, postsController.likePost);
postsRouter.delete("/:postId/like", verifyToken, postsController.unlikePost);

module.exports = postsRouter;
