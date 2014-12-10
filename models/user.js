var mongodb = require('./db'); 
function User(user) { 
    this.id = user.id;
    this.nick_name = user.nick_name; 
    this.address = user.address;
    this.tel = user.tel;
    this.weixin = user.weixin;
}; 
module.exports = User; 
User.prototype.save = function save(callback) { 
// 存入Mongodb 的文档
    var user = { 
        id: this.id,
        nick_name: this.nick_name,
        address: this.address,
        tel: this.tel,
        weixin: this.weixin,
    }; 
    mongodb.open(function(err, db) { 
        if(err) { 
            return callback(err); 
        } 
        // 读取users 集合
        db.collection('users', function(err, collection) { 
            if(err) { 
                mongodb.close(); 
                return callback(err); 
            } 
            // 为name 属性添加索引
            collection.ensureIndex('id', {unique: true}); 
            // 写入user 文档
            collection.insert(user, {safe: true}, function(err, user) { 
                mongodb.close(); 
                callback(err, user); 
            }); 
        });
    }); 
}; 
User.get = function get(userid, callback) { 
    mongodb.open(function(err, db) { 
        if(err) { 
            return callback(err); 
        } 
        // 读取users 集合
        db.collection('users', function(err, collection) { 
            if(err) { 
                mongodb.close(); 
                return callback(err); 
            } 
            // 查找name 属性为username 的文档
            collection.findOne({name: userid}, function(err, doc) { 
                mongodb.close(); 
                if(doc) { 
                // 封装文档为User 对象
                    var user = new User(doc); 
                    callback(err, user); 
                } else{ 
                    callback(err, null); 
                } 
            }); 
        }); 
    }); 
}; 
