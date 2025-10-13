const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
require("dotenv").config();

const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const usersRouter = require("./routes/usersRouter");
const followRouter = require("./routes/followRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");

const corsOptions = {
  origin: "https://ak-odinbook.netlify.app",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./utils/passport");
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/follow", followRouter);
app.use("/posts", postsRouter);
app.use("/posts", commentsRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ status: "error", message: "Error: " + err.message });
});

app.listen(8000, () => console.log("Listening on port 8000."));
