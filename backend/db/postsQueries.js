const prisma = require("./prismaClient");

const createPost = async (caption, authorId, photoUrl = null) => {
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
