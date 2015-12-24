/*
 * 获取用户相关的数据
 * @author echoloyuk
 */

var async = require('async');
var connection = require('../components/connection');

var user = {};

//当数据库查询出错时，统一做出相同的处理
var isSqlErr = function (err, onErr){
    if (err){
        if (typeof onErr === 'function'){
            onErr.call(this, err);
            return true;
        } else {
            throw err;
        }
    }
}

user._getAllUser = function (onSucc, onErr){
    var conn = connection.connect();
    async.waterfall([
        function (next){
            conn.query('select * from myself_user', function (err, rows, fields){
                if (isSqlErr(err, onErr)){
                    return;
                }

                if (typeof onSucc === 'function'){
                    onSucc.call(this, rows, fields);
                }
            });
        }
    ])
};

user.loginAuth = function (user, pass, onSucc, onErr){
    var conn = connection.connect();
    var sql = 'select * from myself_user where ' + 
                'username="' + user + '" ' +
                'and password="' + pass + '"';

    conn.query(sql , function (err, rows, fields){
        if (isSqlErr(err, onErr)){
            return
        }
        if (rows.length === 1){
            rows = rows; //该步骤处理module，只是vo与数据库相同
            onSucc.call(this, rows, fields);
        } else {
            onErr.call(this, rows, fields);
        }
    });
};

user.getUserId = function (username, onSucc, onErr){
    var conn = connection.connect();
    var sql = 'select * from myself_user where username="' + username + '"';
    conn.query(sql, function (err, rows, fields){
        if (isSqlErr(err, onErr)){
            return;
        }
        if (rows.length === 1){
            onSucc.call(this, rows[0].id);
        } else {
            onErr.call(this, rows, fields);
        }
    });
};

module.exports = user;