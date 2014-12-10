/* GET home page. */
var User = require('../models/user.js');
var Comment = require('../models/comment.js');

exports.index = function(req, res){
	Comment.get(1, function(err, comments, allTotal) {
		if(err) {
			coments = [];
		}
		res.render('index', {comments: comments,totalNum: allTotal});
	});
};
