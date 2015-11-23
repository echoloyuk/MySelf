/*
 * HelloWorld组件的工具
 * 该组件用于marked的配置和个性化部分修改。
 */

define(function (require, exports, module){
    var Util = function (){

    }

    //内部方法
    $.extend(Util.prototype, {

    });

    //外部方法
    $.extend(Util.prototype, {

        //显示$box到某个容器到正中央
        toDIVCenter: function ($box){
            if (!$box || !$box.length){
                return;
            }
            if ($box.css('position') !== 'absolute' && $box.css('position') !== 'fixed'){
                $box.css('position', 'absolute');
            }

            $box.css({
                left: '50%',
                top: '50%'
            }).css({
                marginLeft: -($box.width() / 2),
                marginTop: -($box.height() / 2)
            });

        }
    });

    module.exports = new Util;
});