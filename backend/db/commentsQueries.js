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

const editComment = async (commentId, text) => {
  const updatedComment = await prisma.comment.update({
    where: {
      id: Number(commentId),
    },
    data: {
      text,
      editedTime: new Date(),
    },
  });
  return updatedComment;
};

const deleteComment = async (commentId) => {
  await prisma.comment.delete({
    where: {
      id: Number(commentId),
    },
  });
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
      editedTime: true,
    },
  });
  comments.sort((a, b) => a.id - b.id);
  return comments;
};

module.exports = { createComment, editComment, deleteComment, getPostComments };
