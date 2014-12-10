var mongodb = require('./db'); 
function Comment(comment) { 
    this.customer = comment.customer;
    this.content = comment.content;
}; 
module.exports = Comment; 
Comment.prototype.save = function save(callback) { 
// 存入Mongodb 的文档
    var comment = { 
        customer: this.customer,
        content: this.content,
    }; 
    mongodb.open(function(err, db) { 
        if(err) { 
            return callback(err); 
        } 
        // 读取comments 集合
        db.collection('comments', function(err, collection) { 
            if(err) { 
                mongodb.close(); 
                return callback(err); 
            } 
            // 为name 属性添加索引
            collection.ensureIndex('id', {unique: true}); 
            // 写入comment 文档
            collection.insert(comment, {safe: true}, function(err, comment) { 
                mongodb.close(); 
                callback(err, comment); 
            }); 
        });
    }); 
}; 
Comment.get = function get(commentPage, callback) { 
    mongodb.open(function(err, db) { 
        if(err) { 
            return callback(err); 
        } 
        // 读取comments 集合
        db.collection('comments', function(err, collection) { 
            if(err) { 
                mongodb.close(); 
                return callback(err); 
            } 
            collection.find().toArray(function(err, doc) {
                mongodb.close(); 
                if(doc) { 
                // 封装文档为comment 对象
                    var comments = [];
                    var allTotal = doc.length;              //总共有多少条评论记录
                    var startPos = (commentPage - 1) * 5;   //每页显示5个
                    var endPos = commentPage * 5;
                    for (var i = startPos;i < endPos && i < allTotal; i++) {
                         var comment = new Comment(doc[i]);
                         comments.push(comment);
                    }
                    callback(err, comments, allTotal); 
                } else{ 
                    callback(err, null); 
                } 
            });           
        }); 
    }); 
}; 
