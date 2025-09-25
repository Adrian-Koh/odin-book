const prisma = require("./prismaClient");

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  console.log("All users: " + JSON.stringify(users));
};

const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      likes: true,
    },
  });
  console.log("All posts: " + JSON.stringify(posts));
};

getAllPosts();
