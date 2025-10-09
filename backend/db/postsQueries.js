const prisma = require("./prismaClient");

const postIncludeData = {
  author: {
    select: {
      id: true,
      email: true,
      displayName: true,
      avatarUrl: true,
    },
  },
  likes: {
    select: {
      likedBy: {
        select: {
          id: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
  },
  comments: {
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
  },
};

const createPost = async (authorId, caption, photoUrl = null) => {
  const createdPost = await prisma.post.create({
    data: {
      caption,
      photoUrl,
      authorId: Number(authorId),
    },
  });
  return createdPost;
};

const editPost = async (postId, caption) => {
  const editedPost = await prisma.post.update({
    where: { id: Number(postId) },
    data: {
      caption,
      editedTime: new Date(),
    },
    include: postIncludeData,
  });
  return editedPost;
};

const deletePost = async (postId) => {
  await prisma.post.delete({
    where: { id: Number(postId) },
  });
};

const getUsersPosts = async (userIds) => {
  const posts = [];
  for (const userid of userIds) {
    const userPosts = await prisma.post.findMany({
      where: {
        authorId: Number(userid),
      },
      include: postIncludeData,
    });
    userPosts.forEach((post) => posts.push(post));
  }
  posts.sort((a, b) => b.id - a.id);
  return posts;
};

const likePost = async (userId, postId) => {
  await prisma.postLike.create({
    data: {
      likedById: Number(userId),
      postId: Number(postId),
    },
  });
};

const unlikePost = async (userId, postId) => {
  await prisma.postLike.delete({
    where: {
      postId_likedById: { likedById: Number(userId), postId: Number(postId) },
    },
  });
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getUsersPosts,
  likePost,
  unlikePost,
};
