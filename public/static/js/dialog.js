define(function (require, exports, module){
    "use strict";

    require('DialogCSS'); //加载CSS样式
    var Mask = require('Mask');

    var Dialog = function (){
        this.message = ''; //要显示的内容
        this.isShowCancel = false; //是否显示取消按钮
        this.onConfirm = null; //点击确定按钮的回调函数
        this.onCancel = null;
        this.onClose = null; //点击关闭按钮的回调函数
        this.isMask = true;

        this._eventNamespace = 'MySelfDialog';
        this._mask = new Mask; //遮罩层
    };

    var _html = '<div class="myself-dialog" id="dialog">' +
                    '<div class="dialog-ctrl-panel">' +
                        '<div class="close">x</div>' +
                    '</div>' +
                    '<div class="dialog-content-panel">' +
                        '<div class="content"></div>' +
                    '</div>' +
                    '<div class="dialog-btn-panel">' +
                        '<div class="dialog-btn confirm">确定</div>' +
                        '<div class="dialog-btn cancel" style="display:none">取消</div>' +
                    '</div>' +
                '</div>'

    //内部方法
    $.extend(Dialog.prototype, {
        _appendDialog: function (){
            var $d = $(_html).appendTo('body');
            return $d;
        },
        _getPos: function ($dialog){
            var $win = $(window);
            var wW = $win.width(),
                wH = $win.height(),
                dW = $dialog.outerWidth(),
                dH = $dialog.outerHeight();
            var pos = {left: 0, top: 0};
            pos.left = (wW - dW) / 2;
            pos.top = (wH - dH) / 2;
            return pos;
        }
    });

    //外部方法
    $.extend(Dialog.prototype, {

        //显示窗口
        show: function (){
            var $dialog = $('#dialog');
            if (!$dialog || !$dialog.length){ //单例模式
                $dialog = this._appendDialog();
            }
            var message = this.message;
            $dialog.find('.dialog-content-panel .content').html(message);
            $dialog.show().css(this._getPos($dialog));
            
            //mask
            if (this.isMask){
                this._mask.show();
            }

            //event
            var namespace = '.' + this._eventNamespace,
                _this = this,
                $close = $dialog.find('.dialog-ctrl-panel .close'),
                $confirm = $dialog.find('.dialog-btn-panel .dialog-btn.confirm'),
                $cancel = $dialog.find('.dialog-btn-panel .dialog-btn.cancel');

            if (this.isShowCancel){
                $cancel.show();
            } else {
                $cancel.hide();
            }

            $close.off(namespace).on('click' + namespace, function (){
                _this.hide();
            });
            $confirm.off(namespace).on('click' + namespace, function (){
                if (typeof _this.onConfirm === 'function'){
                    _this.onConfirm.call(_this);
                }
                _this.hide();
            });
            $cancel.off(namespace).on('click' + namespace, function (){
                if (typeof _this.onCancel === 'function'){
                    _this.onCancel.call(_this);
                }
                _this.hide();
            });
        },

        //关闭窗口
        hide: function (){
            var $dialog = $('#dialog');
            if (!$dialog || !$dialog.length){
                return;
            }
            $dialog.hide();
            if (typeof this.onClose === 'function'){
                this.onClose.call(this);
            }
            this._mask.hide();

            //针对默认的开启方法。
            clearTimeout(window._MySelfDialogTimmer);
        },

        //默认的窗口开启方法
        defaultOpen: function (message, dur){
            clearTimeout(window._MySelfDialogTimmer);
            this.message = message;
            this.show();
            var _this = this;
            window._MySelfDialogTimmer = setTimeout(function (){
                _this.hide();
            }, (dur || 2000));
        }

    });

    module.exports = Dialog;
});