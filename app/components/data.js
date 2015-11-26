var CONFIG = require('../config');
var mysql = require('mysql');
var async = require('async');

var data = function (){};

data.query = function (sql, callback){
    var host = CONFIG.sql.host,
        user = CONFIG.sql.user,
        password = CONFIG.sql.password,
        database = CONFIG.sql.database;

    var conn = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
    async.waterfall([
        function (next){
            conn.connect();
            conn.query(sql, function (err, rows, fields){
                if (err){
                    throw err;
                }
                next(null, rows);
            });
        }, function (rows, next){
            conn.end();
            callback.call(this, rows);
        }
    ]);
}

module.exports = data;