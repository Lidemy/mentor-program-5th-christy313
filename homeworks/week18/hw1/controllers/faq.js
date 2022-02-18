const db = require("../models");
const { Question } = db;

const faqController = {
  index: async (req, res, next) => {
    try {
      const questions = await Question.findAll({
        order: [["id", "ASC"]],
      });
      res.render("faq", {
        questions,
      });
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  manageFaq: async (req, res, next) => {
    try {
      const questions = await Question.findAll({
        order: [["id", "ASC"]],
      });
      res.render("cms/cms-faq", {
        questions,
      });
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  add: (req, res, next) => {
    try {
      res.render("cms/cms-add-faq");
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  handleNewFaq: async (req, res, next) => {
    const { sequence, title, content } = req.body;
    if (!sequence || !title || !content) {
      req.flash("errorMessage", "Please fill in all the required fields.");
      return next();
    }
    if (isNaN(Number(sequence))) {
      req.flash("errorMessage", "Please fill in Sequence with integer ONLY.");
      return next();
    }
    try {
      await Question.create({
        sequence,
        title,
        content,
      });
      return res.redirect("/cms/faq");
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  delete: async (req, res, next) => {
    try {
      const question = await Question.findOne({
        where: {
          id: req.params.id,
        },
      });
      await question.destroy();
      return res.redirect("/cms/faq");
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  edit: async (req, res, next) => {
    try {
      const question = await Question.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.render("cms/cms-edit-faq", {
        question,
      });
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  handleEdit: async (req, res, next) => {
    const { sequence, title, content } = req.body;
    if (!sequence || !title || !content) {
      req.flash("errorMessage", "Please fill in all the required fields.");
      return next();
    }
    if (isNaN(Number(sequence))) {
      req.flash("errorMessage", "Please fill in Sequence with integer ONLY.");
      return next();
    }
    try {
      const question = await Question.findOne({
        where: {
          id: req.params.id,
        },
      });
      await question.update({
        sequence,
        title,
        content,
      });
      return res.redirect("/cms/faq");
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },
};

module.exports = faqController;
