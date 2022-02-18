const db = require("../models");
const { Menu } = db;

const menuController = {
  index: async (req, res, next) => {
    try {
      const menus = await Menu.findAll({
        order: [["id", "ASC"]],
      });
      res.render("menu", {
        menus,
      });
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },
  manageMenu: async (req, res, next) => {
    try {
      const menus = await Menu.findAll({
        order: [["id", "ASC"]],
      });
      res.render("cms/cms-menu", {
        menus,
      });
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  add: (req, res, next) => {
    try {
      res.render("cms/cms-add-menu");
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  handleNewMenu: async (req, res, next) => {
    const { item, price, photo } = req.body;
    if (!item || !price || !photo) {
      req.flash("errorMessage", "Please fill in all the required fields.");
      return next();
    }
    try {
      await Menu.create({
        item,
        price,
        photo,
      });
      return res.redirect("/cms/menu");
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  delete: async (req, res, next) => {
    try {
      const menu = await Menu.findOne({
        where: {
          id: req.params.id,
        },
      });
      await menu.destroy();
      return res.redirect("/cms/menu");
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  edit: async (req, res, next) => {
    try {
      const menu = await Menu.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.render("cms/cms-edit-menu", {
        menu,
      });
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  handleEdit: async (req, res, next) => {
    const { item, price, photo } = req.body;
    if (!item || !price || !photo) {
      req.flash("errorMessage", "Please fill in all the required fields.");
      return next();
    }
    try {
      const menu = await Menu.findOne({
        where: {
          id: req.params.id,
        },
      });
      await menu.update({
        item,
        price,
        photo,
      });
      return res.redirect("/cms/menu");
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },
};

module.exports = menuController;
