const { Router } = require("express");
const commentsRouter = Router();
const commentsController = require("../controllers/commentsController");
const verifyToken = require("../utils/jwtUtils");

commentsRouter.get(
  "/:postId/comments",
  verifyToken,
  commentsController.getPostComments
);
commentsRouter.post(
  "/:postId/comments",
  verifyToken,
  commentsController.createComment
);
commentsRouter.put(
  "/:postId/comments/:commentId",
  verifyToken,
  commentsController.editComment
);
commentsRouter.delete(
  "/:postId/comments/:commentId",
  verifyToken,
  commentsController.deleteComment
);

module.exports = commentsRouter;
