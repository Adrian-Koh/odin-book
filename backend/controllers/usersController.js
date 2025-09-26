const usersQueries = require("../db/usersQueries");
const jwt = require("jsonwebtoken");
const {
  generatePasswordHash,
  validPassword,
} = require("../utils/passwordUtils");

const getAllUsers = async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const user = authData.user;
      const users = await usersQueries.getAllUsers(user.id);
      res.json({ users });
    }
  });
};
const getFollowingUsers = async (req, res, next) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      return next(err);
    } else {
      const user = authData.user;
      const users = await usersQueries.getUserFollowing(user.id);
      res.json({ users });
    }
  });
};

const loginPost = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await usersQueries.getUserByEmail(email);

    if (validPassword(password, user.passwordHash)) {
      delete user.passwordHash; // remove passwordHash from token sent to user
      jwt.sign(
        { user },
        process.env.SECRET_KEY,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) {
            return next(err);
          }
          res.json({ token });
        }
      );
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    return next(err);
  }
};

async function signupPost(req, res, next) {
  try {
    const { email, password, name } = req.body;

    // reject if email already exists
    const existingUser = await usersQueries.getUserByEmail(email);
    if (existingUser)
      throw new Error(`The email ${email} has already been registered.`);

    const passwordHash = generatePasswordHash(password);

    let avatarUrl = null;
    if (req.file) {
      avatarUrl = await uploadFile(username, req.file);
    }

    const user = await usersQueries.addUserEmail(
      email,
      passwordHash,
      name,
      avatarUrl
    );
    res.json({
      message: "signup success",
      user,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAllUsers, getFollowingUsers, loginPost, signupPost };
