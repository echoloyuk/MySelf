/*
 * 瀑布流，jquery插件，适用于宽度固定的容器
 */

;(function (window, $){

    var Waterfall = function (){
        this.$target = null; //瀑布流外部容器
        this.$items = null; //瀑布流容器
        this.marginLeft = 0;
        this.marginRight = 0;
        this.marginTop = 0;
        this.marginBottom = 0;
        this._arr;
    }

    Waterfall.prototype = {
        _init: function (){
            var $target, $items;
            if (this.$target instanceof $){
                $target = this.$target;
            } else {
                $target = $(this.$target);
            }
            if (this.$items instanceof $){
                $items = this.$items
            } else {
                $items = $(this.$items, $target);
            }
            this.$target = $target;
            this.$items = $items;
        },

        _getColNum: function ($item){
            var mT = this.marginTop,
                mB = this.marginBottom;
            var height = $item.outerHeight();
            var arr = this._arr;
            var minH = -1, col = 0;
            for (var i = 0, count = arr.length; i < count; i++){
                if (minH < 0){
                    minH = arr[i]
                } else {
                    if (minH > arr[i]){
                        minH = arr[i];
                        col = i;
                    }
                }
            }
            return col;
        },

        _getMaxHeight: function (){
            var arr = this._arr;
            var h = 0;
            for (var i = 0, count = arr.length; i < count; i++){
                if (h < arr[i]){
                    h = arr[i];
                }
            }
            return h;
        },

        init: function (){
            this._init();
            var $target = this.$target,
                $items = this.$items;
            var itemWidth = $items.eq(0).outerWidth(),
                totalWidth = $target.innerWidth(),
                totalHeight = 0,
                mL = this.marginLeft,
                mR = this.marginRight,
                mT = this.marginTop,
                mB = this.marginBottom;
            var colNum = Math.floor(totalWidth / (itemWidth + mL + mR));
            var arr = [];
            for (var i = 0; i < colNum; i++){
                arr.push(0);
            }
            this._arr = arr;
            var _this = this;

            $items.each(function (index, ele){
                var $this = $(this);
                var col = _this._getColNum($this);

                $this.css({
                    left: col * (itemWidth + mL + mR) + mL,
                    top: arr[col] + mT
                });
                arr[col] += $this.outerHeight() + mT + mB;
            });

            totalHeight = _this._getMaxHeight();

            $target.css({
                height: totalHeight
            });
        }
    };

    if (typeof define === 'function'){
        define(function (require, exports, module){
            module.exports = Waterfall;
        });
    } else {
        window.waterfall = Waterfall;
    }

})(window, $);