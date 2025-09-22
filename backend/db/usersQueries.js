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

const addUserEmail = () => {};

module.exports = { addUserGithub };
