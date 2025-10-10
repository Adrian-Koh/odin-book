const usersQueries = require("../db/usersQueries");
const followQueries = require("../db/followQueries");
const jwt = require("jsonwebtoken");
const {
  generatePasswordHash,
  validPassword,
} = require("../utils/passwordUtils");

async function postFollow(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const user = authData.user;
      const { followingId } = req.params;
      await followQueries.addFollow(user.id, followingId);
      res.json({ message: "follow success" });
    }
  });
}

async function deleteFollow(req, res, next) {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const user = authData.user;
      const { followingId } = req.params;
      await followQueries.removeFollow(user.id, followingId);
      res.json({ message: "unfollow success" });
    }
  });
}

module.exports = {
  postFollow,
  deleteFollow,
};
