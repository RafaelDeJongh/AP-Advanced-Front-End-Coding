var express = require("express");
var posts = express.Router();
posts.get('/blog/:id', function(req,res){
	var postsFile = req.app.get('postsFile');
	var id = req.params.id;
	var teller = 0;
	var item = "";
	while(teller < postsFile.posts.length){
		if (postsFile.posts[teller].id == id){
			item = postsFile.posts[teller];
		}
		teller++;
	}
	if(item !== ""){
		res.render("posts",{
			item:item,
			category:req.app.get('categoryFile').category
		});
	}else{
		res.render("404",{});
	}
	});
module.exports = posts;