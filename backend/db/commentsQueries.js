const prisma = require("./prismaClient");

const createComment = async (authorId, postId, text) => {
  const createdComment = await prisma.comment.create({
    data: {
      authorId: Number(authorId),
      postId: Number(postId),
      text,
    },
  });
  return createdComment;
};

module.exports = { createComment };
