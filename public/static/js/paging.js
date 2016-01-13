define(function (require, exports, module){

    var paging = function ($target){
        this.$target = $target;
        this.curPage = 1;
        this.totalPage = 1;
        this.onPage = null;
    }

    $.extend(paging.prototype, {
        init: function (){
            var $target = this.$target;
            var $prev = $('.paging-button.prev', $target),
                $next = $('.paging-button.next', $target),
                $cur = $('.paging-num.cur', $target),
                $input = $('input.paging-input', $target),
                $goto = $('.paging-button.goto', $target);
            var curPage = parseInt(this.onPage),
                totalPage = parseInt(this.totalPage),
                eventNamespce = '.Paging';
            var _this = this;

            if (!$.isNumeric(curPage) || curPage < 1){
                curPage = 1;
            }
            if (!$.isNumeric(totalPage) || totalPage < 1){
                totalPage = 1;
            }
            $cur.html(curPage);

            $prev.off(eventNamespce);
            if (curPage <= 1){
                $prev.addClass('disabled');
            } else {
                $prev.removeClass('disabled');
                $prev.on('click' + eventNamespce, function (){
                    curPage--;
                    if (typeof _this.onPage === 'function'){
                        _this.onPage.call($(this), curPage);
                    }
                });
            }

            $next.off(eventNamespce);
            if (curPage >= totalPage){
                $next.addClass('disabled');
            } else {
                $next.removeClass('disabled');
                $next.on('click' + eventNamespce, function (){
                    curPage++;
                    if (typeof _this.onPage === 'function'){
                        _this.onPage.call($(this), curPage);
                    }
                });
            }

            $goto.off(eventNamespce);
            $goto.on('click' + eventNamespce, function (){
                var val = parseInt($input.val());
                if (!$.isNumeric(val) || val < 1){
                    return;
                }
                if (typeof _this.onPage === 'function'){
                    _this.onPage.call($(this), val);
                }
            });

            $input.val('');
        },

        disable: function (){
            var $target = this.$target;
            $('.paging-button', $target).off('.Paging');
        }
    });

    module.exports = paging;
});