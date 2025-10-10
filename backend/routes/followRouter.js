const { Router } = require("express");
const followRouter = Router();
const followController = require("../controllers/followController");
const verifyToken = require("../utils/jwtUtils");

followRouter.post("/:followingId", verifyToken, followController.postFollow);
followRouter.delete(
  "/:followingId",
  verifyToken,
  followController.deleteFollow
);

module.exports = followRouter;
