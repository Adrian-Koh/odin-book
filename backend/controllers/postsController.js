const postsQueries = require("../db/postsQueries");
const { uploadPhoto } = require("../utils/supabase");
const jwt = require("jsonwebtoken");

const createPost = async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      let photoUrl = null;
      if (req.file) {
        photoUrl = await uploadPhoto(req.file);
      }
      const { caption } = req.body;
      const createdPost = await postsQueries.createPost(
        authData.user.id,
        caption
      );
      res.json({ message: "created post", createdPost, user: req.user });
    }
  });
};

module.exports = { createPost };
