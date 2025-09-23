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

const getUsersPosts = async (followingUserIds) => {
  const posts = [];
  for (const userid of followingUserIds) {
    const userPosts = await prisma.post.findMany({
      where: {
        authorId: Number(userid),
      },
    });
    userPosts.forEach((post) => posts.push(post));
  }
  posts.sort((a, b) => a.id - b.id);
  return posts;
};

module.exports = { createPost, getUsersPosts };
