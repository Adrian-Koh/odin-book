const prisma = require("./prismaClient");

const createPost = async (authorId, caption, photoUrl = null) => {
  const createdPost = await prisma.post.create({
    data: {
      caption,
      photoUrl,
      authorId,
    },
  });
  return createdPost;
};

module.exports = { createPost };
