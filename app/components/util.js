/*
 * 工具类
 */
var util = {};
var count = 0; //用来标记uid中的唯一标示。
var fs = require('fs');

util.getDateString = function (date){
    if (!date){
        return;
    }
    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        seconds = date.getSeconds();
    return (year + '-' + month + '-' + day  + ' ' + hour + ':' + minute + ':' + seconds);
}

util.sqlFilter = function (str){
    if (!str){
        return "";
    }
    str = str.replace(/"/g, '\\"');
    str = str.replace(/'/g, '\\');
    return str;
}

util.getImageName = function (namespace){
    var date = new Date;
    var result = namespace || 'MySelfImg';
    result += '' + date.getTime() + Math.floor(Math.random() * 10000) + count;
    count++;
    return result;
}

util.copy = function (src, dst){
    fs.renameSync(src, dst);
    //fs.writeFileSync(dst, fs.readFileSync(src));
}

module.exports = util;