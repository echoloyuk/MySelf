/*
 * 数据库连接组件
 * @author echoloyuk
 */

var CONFIG = require('../config');
var mysql = require('mysql');

var host = CONFIG.sql.host,
    user = CONFIG.sql.user,
    password = CONFIG.sql.password,
    database = CONFIG.sql.suffix + CONFIG.sql.database;

var conn = {}

//连接数据库
conn.connect = function (){
    var conn = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });
    return conn;
}

module.exports = conn;
