/*
 * 工具类
 */
var util = {};

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

module.exports = util;