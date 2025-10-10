const prisma = require("./prismaClient");

const addFollowRequest = async (requesterId, responderId) => {
  await prisma.followRequest.create({
    data: {
      requesterId: Number(requesterId),
      responderId: Number(responderId),
    },
  });
};

const removeFollowRequest = async (requesterId, responderId) => {
  await prisma.followRequest.delete({
    where: {
      requesterId_responderId: {
        requesterId: Number(requesterId),
        responderId: Number(responderId),
      },
    },
  });
};

const addFollow = async (followerId, followingId) => {
  await prisma.follow.create({
    data: {
      followerId: Number(followerId),
      followingId: Number(followingId),
    },
  });
};

const removeFollow = async (followerId, followingId) => {
  await prisma.follow.delete({
    where: {
      followingId_followerId: {
        followerId: Number(followerId),
        followingId: Number(followingId),
      },
    },
  });
};

const getFollowRequestsReceived = async (userid) => {
  const requests = await prisma.followRequest.findMany({
    where: {
      responderId: Number(userid),
    },
  });
  return requests;
};

const getFollowRequestsSent = async (userid) => {
  const requests = await prisma.followRequest.findMany({
    where: {
      requesterId: Number(userid),
    },
  });
  return requests;
};

module.exports = {
  addFollowRequest,
  removeFollowRequest,
  addFollow,
  removeFollow,
  getFollowRequestsReceived,
  getFollowRequestsSent,
};
