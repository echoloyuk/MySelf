/*
 * 工具类
 */
var util = {};
var count = 0; //用来标记uid中的唯一标示。

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

util.getImageName = function (filename){
    var date = new Date;
    var result = 'myself' + date.getTime() + Math.floor(Math.random() * 10000) + count;
    count++;
    result += filename.substring(filename.lastIndexOf('.'));
    return result;
}

util.getUID = function (name){
    var date = new Date;
    var result = (name ? name : '');
    result += date.getTime() + '' + count;
    count++;
    return result;
}

module.exports = util;