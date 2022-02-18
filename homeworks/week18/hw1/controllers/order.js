const orderController = {
  index: (req, res, next) => {
    try {
      res.render("order");
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  manageOrder: (req, res, next) => {
    try {
      res.render("cms/cms-order");
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },
};

module.exports = orderController;
