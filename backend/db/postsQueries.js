const prisma = require("./prismaClient");

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

const getUsersPosts = async (userIds) => {
  const posts = [];
  for (const userid of userIds) {
    const userPosts = await prisma.post.findMany({
      where: {
        authorId: Number(userid),
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            displayName: true,
            avatarUrl: true,
          },
        },
        likes: true,
        comments: {
          select: {
            author: {
              select: {
                displayName: true,
              },
            },
            text: true,
            addedTime: true,
          },
        },
      },
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

module.exports = { createPost, getUsersPosts, likePost, unlikePost };
