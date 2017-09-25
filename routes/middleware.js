/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
		{ label: 'Contact', key: 'contact', href: '/contact' },
	];
	next();
};
//HTTP Headers for Security & Cache
exports.initHeaders = function (req, res, next) {
	//Security
	res.setHeader("Developed-By","Rafael De Jongh");
	res.setHeader("Content-Security-Policy","default-src 'self' https:; img-src 'self' data: blob: https:; font-src 'self' data: https:; script-src 'self' https:; style-src 'self' https: 'unsafe-inline';");
	res.setHeader("X-Frame-Options","SAMEORIGIN");
	res.setHeader("X-XSS-Protection","1; mode=block");
	res.setHeader("Referrer-Policy","no-referrer-when-downgrade");
	res.setHeader("Expect-CT","max-age=86400,enforce");
	res.removeHeader('X-Powered-By');
	//Caching
	res.setHeader("Cache-Control","public,max-age=2592000");
	res.setHeader("Expires",new Date(Date.now() + 2592000000).toUTCString());
	next();
};
/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};

/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
