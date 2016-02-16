var mongodb = require('./db');
var crypto = require('crypto');

function User(user) {
  this.phoneNumber = user.phoneNumber;
  this.password = user.password;
};

module.exports = User;

//存储用户信息
User.prototype.save = function(callback) {
  /*var md5 = crypto.createHash('md5'),
      email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
      head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";*/
  //要存入数据库的用户信息文档
  var user = {
    phoneNumber: this.phoneNumber,
    password: this.password
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //将用户数据插入 users 集合
      collection.insert(user, {
        safe: true
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        console.log('创建用户成功，该用户是－－－－－－－－－－');
        console.log(user);//成功！err 为 null，并返回存储后的用户文档
        callback(null, user);
      });
    });
  });

};

//读取用户信息
User.get = function(phoneNumber, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        phoneNumber: phoneNumber
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }
        callback(null, user);//成功！返回查询的用户信息
      });
    });
  });
};