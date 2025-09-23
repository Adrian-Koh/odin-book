const prisma = require("./prismaClient");

const addUserGithub = async (
  githubId,
  email,
  displayName,
  avatarUrl = null
) => {
  const createdUser = await prisma.user.create({
    data: {
      loginMethod: "GITHUB",
      githubId,
      email,
      displayName,
      avatarUrl,
    },
  });
  return createdUser;
};

const getUserByEmail = async (email) => {
  const foundUser = await prisma.user.findUnique({
    where: { email },
  });
  return foundUser;
};

const getUserById = async (userid) => {
  const foundUser = await prisma.user.findUnique({
    where: { id: Number(userid) },
  });
  return foundUser;
};

const getUserFollowing = async (userid) => {
  const followingUsers = await prisma.follow.findMany({
    where: {
      followerId: Number(userid),
    },
  });
  return followingUsers;
};

const addUserEmail = () => {};

module.exports = {
  addUserGithub,
  getUserByEmail,
  getUserFollowing,
  getUserById,
};
