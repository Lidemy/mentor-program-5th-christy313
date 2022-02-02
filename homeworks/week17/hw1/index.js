const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const port = process.env.PORT || 5001;

const userController = require("./controllers/user");
const articleController = require("./controllers/article");

app.set("view engine", "ejs");
app.use(
  session({
    secret: "process.env.SESSION_SECRET",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash("errorMessage");
  next();
});

app.get("/", articleController.index);

function redirectBack(req, res) {
  res.redirect("back");
}
app.get("/login", userController.login);
app.post("/login", userController.handleLogin, redirectBack);
app.get("/logout", userController.logout);

app.get("/new-post", articleController.newPost);
app.post("/new-post", articleController.handleNewPost, redirectBack);

app.get("/delete_article/:id", articleController.delete);
app.get("/edit_article/:id", articleController.edit);
app.post("/edit_article/:id", articleController.handleEdit, redirectBack);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
