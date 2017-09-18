var express = require("express");
var category = express.Router();
category.get('/category/:id',function(req, res){
	res.render("category",{
		id:Number(req.params.id),
		items:req.app.get('postsFile').posts,
		category:req.app.get('categoryFile').category
	});
});
module.exports = category;