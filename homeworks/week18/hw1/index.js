const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const port = process.env.PORT || 5001;
require("dotenv").config();

const faqController = require("./controllers/faq");
const menuController = require("./controllers/menu");
const orderController = require("./controllers/order");
const prizeController = require("./controllers/prize");
const userController = require("./controllers/user");

app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash("errorMessage");
  next();
});
app.use(express.static(`${__dirname}/public`));

function redirectBack(req, res) {
  res.redirect("back");
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/draw", prizeController.index);
app.get("/menu", menuController.index);
app.get("/order", orderController.index);
app.get("/faq", faqController.index);

app.get("/api", prizeController.api);

app.get("/signup", userController.signup);
app.post("/signup", userController.handleSignup, redirectBack);
app.get("/login", userController.login);
app.post("/login", userController.handleLogin, redirectBack);
app.get("/logout", userController.logout);

app.get("/cms", userController.cms);
app.get("/cms/prize", prizeController.managePrize);
app.get("/cms/faq", faqController.manageFaq);
app.get("/cms/menu", menuController.manageMenu);
app.get("/cms/order", orderController.manageOrder);

app.get("/cms/add-prize", prizeController.add);
app.post("/cms/add-prize", prizeController.handleNewPrize, redirectBack);
app.get("/cms/delete-prize/:id", prizeController.delete);
app.get("/cms/edit-prize/:id", prizeController.edit);
app.post("/cms/edit-prize/:id", prizeController.handleEdit, redirectBack);

app.get("/cms/add-faq", faqController.add);
app.post("/cms/add-faq", faqController.handleNewFaq, redirectBack);
app.get("/cms/delete-faq/:id", faqController.delete);
app.get("/cms/edit-faq/:id", faqController.edit);
app.post("/cms/edit-faq/:id", faqController.handleEdit, redirectBack);

app.get("/cms/add-menu", menuController.add);
app.post("/cms/add-menu", menuController.handleNewMenu, redirectBack);
app.get("/cms/delete-menu/:id", menuController.delete);
app.get("/cms/edit-menu/:id", menuController.edit);
app.post("/cms/edit-menu/:id", menuController.handleEdit, redirectBack);

app.listen(port, () => {
  console.log(`Just a bite listening at http://localhost:${port}`);
});
