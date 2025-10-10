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

const addUserEmail = async (email, passwordHash, name, avatarUrl = null) => {
  const user = await prisma.user.create({
    data: {
      loginMethod: "EMAIL",
      email,
      passwordHash,
      displayName: name,
      avatarUrl,
    },
  });
  return user;
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

const getAllUsers = async (userid) => {
  const allUsers = await prisma.user.findMany({
    where: {
      NOT: {
        id: Number(userid),
      },
    },
  });
  return allUsers;
};

const getUserFollowing = async (userid) => {
  const followingUsers = await prisma.follow.findMany({
    where: {
      followerId: Number(userid),
    },
    include: {
      following: {
        select: {
          id: true,
          avatarUrl: true,
          displayName: true,
          email: true,
        },
      },
    },
  });
  return followingUsers;
};

const updateProfilePic = async (userId, avatarUrl) => {
  const user = await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      avatarUrl,
    },
  });
  return user;
};

const updateDisplayName = async (userId, displayName) => {
  const user = await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      displayName,
    },
  });
  return user;
};

module.exports = {
  addUserGithub,
  addUserEmail,
  getUserByEmail,
  getUserById,
  getAllUsers,
  getUserFollowing,
  updateProfilePic,
  updateDisplayName,
};
