var express = require("express");
var path = require("path");
var app = express();

app.use(function requestHandler(req,res){
	res.setHeader("Developed-By","Rafael De Jongh");
	res.setHeader("Content-Security-Policy","default-src https:; img-src https: data: blob:; font-src https: data:; script-src https:; style-src https:;");
	res.setHeader("X-Frame-Options","SAMEORIGIN");
	res.setHeader("X-XSS-Protection","1; mode=block");
	res.setHeader("Referrer-Policy","no-referrer-when-downgrade");
});

app.set('postsFile', require('./config/posts.json'));
app.set('categoryFile', require('./config/category.json'));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'))

app.use(require("./routes/root_router"));
app.use(require("./routes/posts_router"));
app.use(require("./routes/category_router"));

app.listen(app.get('port'), function() {
	console.log('Node luistert op poort', app.get('port'));
});
