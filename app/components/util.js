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

module.exports = util;