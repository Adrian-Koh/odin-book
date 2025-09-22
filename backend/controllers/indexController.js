const indexGet = (req, res, next) => {
  res.json({ message: "Home page" });
};

module.exports = { indexGet };
