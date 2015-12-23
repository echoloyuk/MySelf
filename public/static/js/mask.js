define(function (require, exports, module){
    "use strict";

    require('MaskCSS');

    var _html = '<div class="myself-mask" id="mask"></div>';

    var Mask = function (){

    };

    //内部方法
    $.extend(Mask.prototype, {
        _appendMask: function (){
            var $m = $(_html).appendTo('body');
            return $m;
        }
    });

    //外部方法
    $.extend(Mask.prototype, {
        show: function (){
            var $mask = $('#mask');
            if (!$mask || !$mask.length){
                $mask = this._appendMask();
            }
            $mask.show();
        },
        hide: function (){
            var $mask = $('#mask');
            if (!mask || !$mask.length){
                return;
            }
            $mask.hide();
        }
    });

    module.exports = Mask;
});