const { Router } = require("express");
const usersRouter = Router();
const usersController = require("../controllers/usersController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const verifyToken = require("../utils/jwtUtils");

usersRouter.get("/", verifyToken, usersController.getAllUsers);
usersRouter.get("/following", verifyToken, usersController.getFollowingUsers);
usersRouter.post("/login", usersController.loginPost);
usersRouter.post("/signup", upload.single("file"), usersController.signupPost);
usersRouter.put(
  "/profile/pic",
  verifyToken,
  upload.single("file"),
  usersController.profilePicPut
);
usersRouter.put("/profile/name", verifyToken, usersController.profileNamePut);

module.exports = usersRouter;
