var express = require("express");
var root = express.Router();

root.get('/', function(req, res) {
  res.render("index", {
    posts: req.app.get('postsFile').posts,
    categorieen: req.app.get('categorieenFile').categorieen
  });
});

module.exports = root;
