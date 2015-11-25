var CONFIG = require('../config');
var mysql = require('mysql');
var async = require('async');

var data = function (){};

data.testConn = function (){
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
    var result;
    async.waterfall([
        function (next){
            conn.connect();
            conn.query('select * from myself_user', function (err, rows, fields){
                if (err){
                    throw err;
                }
                next(null, rows);
            });
        }, function (rows, next){
            conn.end();
            console.log(1);
            console.log(rows);
            result = rows;
        }
    ]);
    console.log(2);
    console.log(result);
    return result;
}

module.exports = data;