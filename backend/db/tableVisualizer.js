const prisma = require("./prismaClient");

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  console.log("All users: " + JSON.stringify(users));
};

getAllUsers();
