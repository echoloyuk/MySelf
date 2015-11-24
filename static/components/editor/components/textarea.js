define(function (require, exports, module){

	//textarea组件的构造函数
	var TextArea = function ($target, option){

		//变量
		this.$target = null; //textarea的jQuery对象
		this.target = null; // textarea的DOM对象
		this.tabBtnSpace = 4; //tab键的默认空格数量，默认为4个空格
		this.onTextChange = null; //当任何文本发生变化时的回调函数。
        this.extendKeyEvent = null; //拓展的键盘事件。默认为keyup。
        /* 拓展事件
        extendKeyEvent = [{
            type: 'keyup', //事件类型
            reg: /cma$/,
            handler: function (keyCode, curStr, content){
                this; //object
            },
            dirKey: false, //方向键响应吗？如果为true，则方向键响应。默认不响应
            backspace: false //退格键响应吗？如果为true，则退格键响应。默认不响应 
        }]
        */

		//内部变量
		this._id = 'MaCTextArea'; //组件内部id，用于事件的命名空间等。
		this._isShift = false; //组件内部的变量，用于记录是否按下shift。

		if ($target instanceof jQuery){
			this.$target = $target;
		} else {
			this.$target = $($target);
		}

		this.target = this.$target.get(0);

		if (option){
			$.extend(this, option);
		}
	}

	//内部方法
	$.extend(TextArea.prototype, {

		//去掉tab键等默认的按键在textarea上的作用。
		_removeDefaultBtnEffect: function (){
			var $target = this.$target,
				namespace = '.MaCTextAreaRemoveDefaultEffect';
			var _this = this;
			
			$target.off(namespace).on('keydown' + namespace, function (e){
				var keyCode = e.keyCode;

				if (keyCode === 9){
					e.preventDefault();
				}
			});
		},

		//添加默认键盘事件
		_addDefaultKeyEffect: function (){
			var $target = this.$target,
				namespace = '.MaCTextAreaAddDefaultEffect';
			var _this = this;

			//绑定shift按下的事件
			$target.off(namespace).on('keydown' + namespace, function (e){
				var keyCode = e.keyCode;
				if (keyCode === 16){
					_this._isShift = true;
				}

			//绑定shift抬起的事件
			}).on('keyup' + namespace, function (e){
				var keyCode = e.keyCode;
				if (keyCode === 16){
					_this._isShift = false;
				}
			});

			//绑定tab按键按下的默认缩进功能。
			$target.on('keydown' + namespace, function (e){
				var target = _this.target,
					content = _this.getContent(),
					keyCode = e.keyCode,
					space = _this.tabBtnSpace;
				var pos = _this.getSelectionPosition(),
					start = pos.start,
					end = pos.end;
				var firstLineOfRange, rangeStr, spaceStr, spaceReg, spaceReg2, tmp1;

				if (start < 0 || end < 0){
					console.log('selection error');
					return;
				}
				if (keyCode === 9 && !_this._isShift){ //向后缩进

					//生成空格
					spaceStr = [];
					for (var i = 0; i < space; i++){
						spaceStr.push(' ');
					}
					spaceStr = spaceStr.join('');

					//如果是选中一个选区
					if (start !== end){
						firstLineOfRange = content.lastIndexOf('\n', start);
						if (firstLineOfRange < 0){
							firstLineOfRange = 0;
						}
						rangeStr = content.substring(firstLineOfRange, end);
						rangeStr = rangeStr.replace(/\n/g, '\n' + spaceStr);
						if (firstLineOfRange === 0){
							rangeStr = spaceStr + rangeStr;
						}
						
						_this.replaceStr(firstLineOfRange, end, rangeStr, null, 0); //在chrome下\n的选中是在上一行。
					} else {

						//如果是字符
						_this.replaceStr(start, end, spaceStr, false);
					}
				} else if (keyCode === 9 && _this._isShift){ //向前缩进

					//准备4个空格
					spaceStr = ['\\n'];
					for (var i = 0; i < space; i++){
						spaceStr.push(' ');
					}
					spaceStr = spaceStr.join('');
					spaceReg = new RegExp(spaceStr, 'g');
					spaceReg2 = new RegExp(spaceStr.replace('\\n', '^'));

					//如果有选取
					if (start !== end){
						firstLineOfRange = content.lastIndexOf('\n', start); //需要向前找到当前行的开始
						if (firstLineOfRange < 1){ //当向前找到了最开头，由于没有\n，需要把第一行也能算进去。
							firstLineOfRange = 0;
						} else {
							firstLineOfRange++;
						}
						rangeStr = content.substring(firstLineOfRange, end);

						//向左缩进
						rangeStr = rangeStr.replace(spaceReg, '\n');
						rangeStr = rangeStr.replace(spaceReg2, ''); //去掉开头的空格

						//替换
						_this.replaceStr(firstLineOfRange, end, rangeStr);

					//如果是光标
					} else { 

						//拿到前面的值
						firstLineOfRange = content.lastIndexOf('\n', start);
						if (firstLineOfRange < 1){
							firstLineOfRange = 0;
						} else {
							firstLineOfRange++; //不要\n这个符号
						}
						rangeStr = content.substring(firstLineOfRange , end);
						//关键：判断当前这一行前面的所有内容都是空格
						for (var i = 0, count = rangeStr.length; i < count; i++){
							if (rangeStr.charAt(i) !== ' '){
								return; //任何前面的字符不是空格的，都什么都不做
							}
						}

						//替换
						tmp1 = 0; //tmp用来记录一共需要去掉几个空格
						for (var i = 0; i < space; i++){
							if (rangeStr.charAt(rangeStr.length - 1 - i) !== ' '){
								break;
							} else {
								tmp1++;
							}
						}
						rangeStr = rangeStr.substring(0, rangeStr.length - tmp1);
						_this.replaceStr(firstLineOfRange, end, rangeStr, true, rangeStr.length - 1, rangeStr.length - 1);
					}
				}
			});
		},

        //绑定拓展的键盘事件
        _addExtendKeyEffect: function (){
            var $target = this.$target,
                namespace = '.MaCTextAreaAddExtendEffect';
            var _this = this;

            $target.off(namespace); //去掉所有的拓展事件

            //这里之所以使用keyup的原因是需要得到按键按下后的整体内容
            $target.on('keyup', function (e){
                var eventList = _this.extendKeyEvent,
                    keyCode = e.keyCode,
                    content = $target.val(),
                    pos = _this.getSelectionPosition(),
                    start = pos.start,
                    end = pos.end;
                var curStr = content.substring(0, start);
                var cur, curF, curR, curD, curB;

                //事件列表为空时，就不用循环了。
                if (!eventList || !$.isArray(eventList) || eventList.length < 1){
                    return;
                }

                //如果方向键不响应
                if (!_this.dirKey && (keyCode >= 37 && keyCode <= 40)){
                	return;
                }

                //如果退格键不响应
                if (!_this.backspace)

                for (var i = 0, count = eventList.length; i < count; i++){
                    cur = eventList[i];
                    curF = cur['handler'];
                    curR = cur['reg'];
                    curD = cur['dirKey']; //dirKey
                    curB = cur['backspace']; //backspace

                    //当dirkey不是true时，则不响应
                	if (!curD && (keyCode >= 37 && keyCode <= 40)){
                		continue;
                	}

                	//当退格键不是true时，则不响应
                	if (!curB && keyCode === 8){
                		continue
                	}

                    if (curR && curR.test){
                        if (curR.test(curStr)){
                            if (cur && cur['type'] === 'keyup' && typeof curF === 'function'){
                                curF.call(_this, keyCode, curStr, content);
                            }
                        }
                    } else {
                        if (cur && cur['type'] === 'keyup' && typeof curF === 'function'){
                            curF.call(_this, keyCode, curStr, content);
                        }
                    }
                }

            });
        }

	});
    

	//外部方法
	$.extend(TextArea.prototype, {

		//获得textarea的文本
		getContent: function (){
			return this.$target.val();
		},

		//初始化
		init: function (){

			//去掉默认事件
			this._removeDefaultBtnEffect();

			//绑定默认的自带事件
			this._addDefaultKeyEffect();

            //绑定拓展的事件
            this._addExtendKeyEffect();
		},

		//获得光标位置
		getCursorPosition: function (){
			var $target = this.$target,
				target = this.target;
			var pos = target.selectionStart;
			return (pos >= 0 ? pos : -1);
		},

		//获得选中的位置
		getSelectionPosition: function (){
			var $target = this.$target,
				target = this.target;
			var start = target.selectionStart,
				end = target.selectionEnd;
			return {
				start : (start >= 0 ? start : -1),
				end : (end >= 0 ? end : -1)
			};
		},

		//将某个范围的文本替换为指定文字
        //这里的selectStart和selectEnd是指replaceStr的起始和终止位置。而不是原文的位置。
		replaceStr: function (start, end, replaceStr, isSelect, selectStart, selectEnd){
			var $target = this.$target,
				target = this.target,
				content = $target.val();
			var onTextChange = this.onTextChange;
			var strArr = [],
				strS, strE, finalStr;

			if (!$.isNumeric(start) || !$.isNumeric(end) || start < 0 || end < 0 || null === replaceStr){
				console.log('start or end or replaceStr error');
				return;
			}
			strS = content.slice(0, start);
			strE = content.slice(end, content.length);
			strArr.push(strS);
			strArr.push(replaceStr);
			strArr.push(strE);
			finalStr = strArr.join('');
			$target.val(finalStr);

			//响应回调函数
			if (typeof onTextChange === 'function'){
				onTextChange.call(this, $target);
			}

			if (isSelect === false){
				target.selectionStart = target.selectionEnd = start + replaceStr.length;
			} else {
				$target.focus();
				if ($.isNumeric(selectStart) || $.isNumeric(selectEnd)){
					target.selectionStart = start + ($.isNumeric(selectStart) ? (selectStart + 1) : 0);
					target.selectionEnd = start + ($.isNumeric(selectEnd) ? (selectEnd + 1) : replaceStr.length);
				} else {
					//选中新替换的文字
					target.selectionStart = start;
					target.selectionEnd = start + replaceStr.length;
				}
			}
		},

		//设置焦点，并设置光标位置。
		setPosition: function (start, end){
			var $target = this.$target,
				target = this.target;

			$target.focus();
			if ($.isNumeric(start)){
				target.selectionStart = start;
				if ($.isNumeric(end)){
					target.selectionEnd = end;
				}
			}
		},

        //获得选中的位置文字
        getString: function (start, end){
            var $target = this.$target,
                target = this.target,
                content = $target.val();

            if (!$.isNumeric(start)){
                return;
            }
            return content.substring(start, end);
        },

        //获得整行的文字
        getStringLine: function (pos){
            var $target = this.$target,
                target = this.target,
                content = $target.val();
            if (!$.isNumeric(pos)){
                return;
            }

            //pos得到的是光标位置的后面的一个字。所以要向前移
            var start = content.lastIndexOf('\n', pos - 1),
                end = content.indexOf('\n', pos),
                strL;

            if (start < 0){
                start = 0;
            }
            if (end < 0){
                end = content.length;
            }
            strL = content.substring(start, end);
            strL = $.trim(strL);
            return strL;
        }
	});

	module.exports = TextArea;
});