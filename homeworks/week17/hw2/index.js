const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const port = process.env.PORT || 5001;

const userController = require("./controllers/user");
const prizeController = require("./controllers/prize");

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
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash("errorMessage");
  next();
});

app.get("/", prizeController.index);

function redirectBack(req, res) {
  res.redirect("back");
}

app.get("/api", prizeController.api);

app.get("/login", userController.login);
app.post("/login", userController.handleLogin, redirectBack);
app.get("/logout", userController.logout);

app.get("/cms", prizeController.cms);

app.get("/add", prizeController.add);
app.post("/add", prizeController.handleNewPrize, redirectBack);

app.get("/delete_prize/:id", prizeController.delete);

app.get("/edit_prize/:id", prizeController.edit);
app.post("/edit_prize/:id", prizeController.handleEdit, redirectBack);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
