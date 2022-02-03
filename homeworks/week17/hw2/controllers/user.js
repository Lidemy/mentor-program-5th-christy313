const bcrypt = require("bcrypt");
const db = require("../models");
const { User } = db;

const userController = {
  login: (req, res) => {
    res.render("user/login");
  },

  handleLogin: async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash("errorMessage", "Please fill in all the required fields.");
      return next();
    }

    try {
      let user = await User.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        req.flash("errorMessage", "invalid user or password");
        return next();
      }
      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash("errorMessage", "invalid user or password");
          return next();
        }
        req.session.username = user.username;
        res.redirect("/");
      });
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};

module.exports = userController;
