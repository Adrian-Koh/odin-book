const { Router } = require("express");
const followRouter = Router();
const followController = require("../controllers/followController");
const verifyToken = require("../utils/jwtUtils");

followRouter.post(
  "/:followingId",
  verifyToken,
  followController.createFollowRequest
);
followRouter.delete(
  "/:followingId",
  verifyToken,
  followController.cancelFollowRequest
);
followRouter.post(
  "/accept/:followerId",
  verifyToken,
  followController.acceptFollowRequest
);

module.exports = followRouter;
