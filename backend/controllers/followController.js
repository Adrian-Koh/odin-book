const followQueries = require("../db/followQueries");
const jwt = require("jsonwebtoken");

async function createFollowRequest(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const user = authData.user;
      const { followingId } = req.params;
      await followQueries.addFollowRequest(user.id, followingId);
      res.json({ message: "follow request added" });
    }
  });
}

async function acceptFollowRequest(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const user = authData.user;
      const { followerId } = req.params;
      await followQueries.addFollow(followerId, user.id);
      await followQueries.removeFollowRequest(followerId, user.id);
      res.json({ message: "follow request accepted" });
    }
  });
}

async function cancelFollowRequest(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const user = authData.user;
      const { followerId } = req.params;
      await followQueries.removeFollowRequest(followerId, user.id);
      res.json({ message: "follow request cancelled" });
    }
  });
}

async function getFollowRequests(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const user = authData.user;
      const received = await followQueries.getFollowRequestsReceived(user.id);
      const sent = await followQueries.getFollowRequestsSent(user.id);

      res.json({ received, sent });
    }
  });
}

module.exports = {
  createFollowRequest,
  acceptFollowRequest,
  cancelFollowRequest,
  getFollowRequests,
};
