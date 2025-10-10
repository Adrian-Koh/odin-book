const commentsQueries = require("../db/commentsQueries");
const usersQueries = require("../db/usersQueries");
const jwt = require("jsonwebtoken");

const createComment = async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const { postId } = req.params;
      const { comment } = req.body;
      const createdComment = await commentsQueries.createComment(
        authData.user.id,
        postId,
        comment
      );
      res.json({ createdComment });
    }
  });
};

const editComment = async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const { commentId } = req.params;
      const { comment } = req.body;

      const authorId = await commentsQueries.getCommentAuthorId(commentId);
      if (authorId !== authData.user.id)
        return next(new Error("Cannot edit comment user did not create."));

      const updatedComment = await commentsQueries.editComment(
        commentId,
        comment
      );
      res.json({ updatedComment });
    }
  });
};

const deleteComment = async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const { commentId } = req.params;

      const authorId = await commentsQueries.getCommentAuthorId(commentId);
      if (authorId !== authData.user.id)
        return next(new Error("Cannot delete comment user did not create."));

      await commentsQueries.deleteComment(commentId);
      res.json({ message: "successfully deleted comment" });
    }
  });
};

const getPostComments = async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const { postId } = req.params;
      const comments = await commentsQueries.getPostComments(postId);
      res.json({ comments });
    }
  });
};

module.exports = { createComment, editComment, deleteComment, getPostComments };
