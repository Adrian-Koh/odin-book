const postsQueries = require("../db/postsQueries");
const usersQueries = require("../db/usersQueries");
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
      res.json({ message: "successfully created post", createdPost });
    }
  });
};

const getFollowingPosts = async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const user = authData.user;
      const following = await usersQueries.getUserFollowing(user.id);
      const followingUserIds = following.map(
        (followingUser) => followingUser.followingId
      );
      followingUserIds.push(user.id);
      const posts = await postsQueries.getUsersPosts(followingUserIds);
      res.json({ posts });
    }
  });
};

module.exports = { createPost, getFollowingPosts };
