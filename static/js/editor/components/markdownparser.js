/*
 * markdown语法解析器，该部分的解析器使用marked。
 * 该组件用于marked的配置和个性化部分修改。
 */

define(function (require, exports, module){
    var marked = require('marked');

    module.exports = marked;
});