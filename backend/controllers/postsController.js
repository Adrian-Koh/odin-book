const postsQueries = require("../db/postsQueries");
const { uploadPhoto } = require("../utils/supabase");

const createPost = async (req, res, next) => {
  let photoUrl = null;
  if (req.file) {
    photoUrl = await uploadPhoto(req.file);
  }
  const { caption } = req.body;
  const createdPost = await postsQueries.createPost();
};

module.exports = { createPost };
