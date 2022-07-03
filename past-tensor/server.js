const express = require("express");
const init = require("./utils/init");
const nlp = require("compromise");
nlp.extend(require("compromise-sentences"));
require("dotenv").config({});

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", { text: "" });
});

app.post("/", (req, res) => {
  let doc = nlp(req.body.sentence);
  doc.sentences().toPastTense();
  const text = doc.text();
  res.render("index", { text });
});

init(app);
