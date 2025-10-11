const { Router } = require("express");
const followRouter = Router();
const followController = require("../controllers/followController");
const verifyToken = require("../utils/jwtUtils");

followRouter.post(
  "/requests/:followingId",
  verifyToken,
  followController.createFollowRequest
);
followRouter.delete(
  "/requests/:followingId",
  verifyToken,
  followController.cancelFollowRequest
);
followRouter.post(
  "/requests/accept/:followerId",
  verifyToken,
  followController.acceptFollowRequest
);
followRouter.get("/requests", verifyToken, followController.getFollowRequests);
followRouter.delete(
  "/:followingId",
  verifyToken,
  followController.deleteFollow
);

module.exports = followRouter;
