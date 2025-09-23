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
    where: { id: userid },
  });
  return foundUser;
};

const addUserEmail = () => {};

module.exports = { addUserGithub, getUserByEmail, getUserById };
