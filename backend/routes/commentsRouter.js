const { Router } = require("express");
const commentsRouter = Router();
const commentsController = require("../controllers/commentsController");
const verifyToken = require("../utils/jwtUtils");

commentsRouter.post(
  "/:postId/comments",
  verifyToken,
  commentsController.createComment
);

module.exports = commentsRouter;
