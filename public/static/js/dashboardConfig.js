/*
 * 仪表盘配置文件
 * @author machi
 */
define(function (require, exports, module){
    var config = {
        ctrlList: [
            {
                name: '写文章',
                link: '/admin/editor/'
            }, {
                name: '文章管理',
                link: '/admin/article/'
            }
        ]
    }
    module.exports = config;
});