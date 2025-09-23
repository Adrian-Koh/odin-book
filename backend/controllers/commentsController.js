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

module.exports = { createComment };
