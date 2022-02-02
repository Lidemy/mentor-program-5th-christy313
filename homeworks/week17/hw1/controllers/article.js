const db = require("../models");
const { Article, User } = db;

const articleController = {
  newPost: (req, res) => {
    res.render("new-post");
  },

  handleNewPost: (req, res, next) => {
    const { userId } = req.session;
    const { title, content } = req.body;
    if (!title || !content) {
      req.flash("errorMessage", "Please fill in all the required fields.");
      return next();
    }

    Article.create({
      title,
      content,
      UserId: userId,
    })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  index: (req, res) => {
    Article.findAll({
      include: User,
      order: [["updatedAt", "DESC"]],
    })
      .then((articles) => {
        res.render("index", {
          articles,
        });
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  delete: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId,
      },
    })
      .then((article) => {
        return article.destroy();
      })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  edit: (req, res) => {
    Article.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((article) => {
        res.render("edit", {
          article,
        });
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },

  handleEdit: (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
      req.flash("errorMessage", "Please fill in all the required fields.");
      return next();
    }

    Article.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId,
      },
    })
      .then((article) => {
        return article.update({
          title: req.body.title,
          content: req.body.content,
        });
      })
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        req.flash("errorMessage", err.toString());
        return next();
      });
  },
};

module.exports = articleController;
