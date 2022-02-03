const db = require("../models");
const { Prize } = db;

const prizeController = {
  cms: async (req, res, next) => {
    try {
      const prizes = await Prize.findAll({
        order: [["id", "ASC"]],
      });
      res.render("cms", {
        prizes,
      });
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  add: (req, res) => {
    res.render("add");
  },

  handleNewPrize: async (req, res, next) => {
    const { item, content, url, ratio } = req.body;
    if (!item || !content || !url || !ratio) {
      req.flash("errorMessage", "Please fill in all the required fields.");
      return next();
    }
    if (isNaN(Number(ratio)) || ratio < 1 || ratio > 100) {
      req.flash("errorMessage", "Please fill in ratio with 1 to 100.");
      return next();
    }
    try {
      await Prize.create({
        item,
        content,
        url,
        ratio,
      });
      res.redirect("/cms");
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  index: async (req, res, next) => {
    try {
      const prizes = await Prize.findAll({
        order: [["id", "ASC"]],
      });
      res.render("index", {
        prizes,
      });
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  delete: async (req, res, next) => {
    try {
      const prize = await Prize.findOne({
        where: {
          id: req.params.id,
        },
      });
      await prize.destroy();
      res.redirect("/cms");
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  edit: async (req, res, next) => {
    try {
      const prize = await Prize.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.render("edit", {
        prize,
      });
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  handleEdit: async (req, res, next) => {
    const { item, content, url, ratio } = req.body;
    if (!item || !content || !url || !ratio) {
      req.flash("errorMessage", "Please fill in all the required fields.");
      return next();
    }
    if (isNaN(Number(ratio)) || ratio < 1 || ratio > 100) {
      req.flash("errorMessage", "Please fill in ratio with 1 to 100.");
      return next();
    }
    try {
      const prize = await Prize.findOne({
        where: {
          id: req.params.id,
        },
      });
      await prize.update({
        item,
        content,
        url,
        ratio,
      });
      res.redirect("/cms");
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  api: async (req, res) => {
    try {
      const drawResult = await getDraw();
      const randomNumber = Math.floor(Math.random() * 100);
      const id = drawResult[randomNumber];

      const data = await Prize.findOne({
        where: { id },
        attributes: { include: ["item", "content", "url"] },
      });
      res.send(data);
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },
};

async function getDraw() {
  const totalRatio = await Prize.sum("ratio");
  const allPrizes = await Prize.findAll();
  let countRatio = [];
  for (const prize of allPrizes) {
    const ratio = (prize.ratio / totalRatio).toFixed(2) * 100;
    countRatio.push({
      id: prize.id,
      ratio,
    });
  }
  let result = [];
  for (let i = 0; i < countRatio.length; i++) {
    for (let j = 1; j <= countRatio[i].ratio; j++) {
      result.push(countRatio[i].id);
    }
  }
  return result;
}

module.exports = prizeController;
