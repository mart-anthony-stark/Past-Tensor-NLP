const express = require("express");
const init = require("./utils/init");
const nlp = require("compromise");
nlp.extend(require("compromise-sentences"));
require("dotenv").config({});

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", { past: "", present: undefined });
});

app.post("/", (req, res) => {
  const present = req.body.sentence;
  let doc = nlp(present);
  doc.sentences().toPastTense();
  const past = doc.text();
  res.render("index", { past, present });
});

init(app);
