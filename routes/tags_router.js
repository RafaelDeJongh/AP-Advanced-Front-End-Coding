var express = require("express");
var tags = express.Router();
tags.get('/tags/:id',function(req,res){
	res.render("tags",{
		id:Number(req.params.id),
		items:req.app.get('postsFile').posts,
		tags:req.app.get('tagsFile').tags,
		category:req.app.get('categoryFile').category
		
	});
});
module.exports = tags;