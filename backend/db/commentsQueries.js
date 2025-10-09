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

const getPostComments = async (postId) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(postId),
    },
    select: {
      author: {
        select: {
          id: true,
          displayName: true,
          email: true,
          avatarUrl: true,
        },
      },
      id: true,
      text: true,
      addedTime: true,
    },
  });
  comments.sort((a, b) => a.id - b.id);
  return comments;
};

module.exports = { createComment, getPostComments };
