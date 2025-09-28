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
        photoUrl = await uploadPhoto(authData.user.id, req.file);
      }
      const { caption } = req.body;
      const createdPost = await postsQueries.createPost(
        authData.user.id,
        caption,
        photoUrl
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

const likePost = async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const user = authData.user;
      const { postId } = req.params;
      await postsQueries.likePost(user.id, postId);
      res.json({ message: "successfully liked post" });
    }
  });
};

const unlikePost = async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const user = authData.user;
      const { postId } = req.params;
      await postsQueries.unlikePost(user.id, postId);
      res.json({ message: "successfully unliked post" });
    }
  });
};

module.exports = { createPost, getFollowingPosts, likePost, unlikePost };
