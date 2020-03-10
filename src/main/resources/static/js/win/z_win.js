/*******************************************************************************
 * window
 ******************************************************************************/
;
Math.uuid = (function() {
	var $ = "0123356789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
			.split("");
	return function(_, G) {
		var C = $, F = [], D = Math.random;
		G = G || C.length;
		if (_) {
			for (var B = 0; B < _; B++)
				F[B] = C[0 | D() * G];
		} else {
			var E;
			F[8] = F[13] = F[18] = F[23] = "-";
			F[14] = "4";
			for (B = 0; B < 36; B++)
				if (!F[B]) {
					E = 0 | D() * 16;
					F[B] = C[(B == 19) ? (E & 3) | 8 : E & 15];
				}
		}
		return F.join("");
	};
})();
if (!$.fn.noSelect) {
	$.fn.noSelect = function(p) {
		if (p == null) {
			prevent = true;
		} else {
			prevent = p;
		}
		if (prevent) {
			return this.each(function() {
				if ($.browser.msie || $.browser.safari) {
					$(this).bind('selectstart', function() {
						return false;
					});
				} else if ($.browser.mozilla) {
					$(this).css('MozUserSelect', 'none');
					$('body').trigger('focus');
				} else if ($.browser.opera) {
					$(this).bind('mousedown', function() {
						return false;
					});
				} else {
					$(this).attr('unselectable', 'on');
				}
			});
		} else {
			return this.each(function() {
				if ($.browser.msie || $.browser.safari) {
					$(this).unbind('selectstart');
				} else if ($.browser.mozilla) {
					$(this).css('MozUserSelect', 'inherit');
				} else if ($.browser.opera) {
					$(this).unbind('mousedown');
				} else {
					$(this).removeAttr('unselectable', 'on');
				}
			});
		}
	};
}

(function($) {
	/***************************************************************************
	 * 所有window均以main.jsp窗口为父窗口，其他iframe窗口调用main.jsp窗口的这个 组件创建window。
	 **************************************************************************/
	 var brow=$.browser;     
	 var bInfo="";     
	 if(brow.msie){
		 bInfo="0";
		}     
	 if(brow.mozilla){
		 bInfo="1";
		 }     
	 if(brow.safari){
		 bInfo="2";
		 }     
	 if(brow.opera){
		 bInfo="3";
		 }     
	//窗口高度及宽度调整值
	var fixwd = 15, fixht = 34, fixbutton = 32;
	if(bInfo=='1'){
		fixbutton = 43;
	}
	// window数组
	window.winArr = [];
	// 根据名字取得window对象
	window.getWin = function(name) {
		var winL = winArr.length;
		var i = 0;
		for (; i < winL; i++) {
			if (winArr[i].name == name) {
				return winArr[i];
			}
		}
		return null;
	};
	//关闭所有弹框
	window.closeAllWin = function() {
		var winL = winArr.length;
		var i = 0;
		for (; i < winL; i++) {
			winArr[i].closeMe();
		}
	};
	// ui对象
	$.ui = $.ui || {};

	$.ui.win = function(config) {
		this.init(config);
	};
	// 提示信息方法
	$.ui.win.msgBox = function(config) {
		// 默认宽度250，默认高度150
		var tempwd = 250;
		var tempht = 150;
		// 自定义宽度，高度
		if (config.width) {
			tempwd = config.width;
		}
		if (config.height) {
			tempht = config.height;
		}

		// yesnocancel类型的宽度必须大于等于265
		if (tempwd < 265 && config.type == "yesNoCancel") {
			tempwd = 265;
		}

		// confirm类型的宽度必须大于等于175
		if (tempwd < 175 && config.type == "confirm") {
			tempwd = 175;
		}
		var buttons = null;
		/***********************************************************************
		 * 根据类型选择button
		 **********************************************************************/
		// confirm prompt yesNoCancel alert error warning question information
		switch (config.type) {
		case "confirm":
			buttons = [
					{
						title : "确定",
						clickFun : function() {
							if (config.triggerWin && config.closedFun) {
								var popwreturnfun = config.triggerWin[config.closedFun];
								if (popwreturnfun) {
									popwreturnfun(1);
								}
							}
							msgWin.closeMe();
						}
					},
					{
						title : "取消",
						clickFun : function() {
							if (config.triggerWin && config.closedFun) {
								var popwreturnfun = config.triggerWin[config.closedFun];
								if (popwreturnfun) {
									popwreturnfun(0);
								}
							}
							msgWin.closeMe();
						}
					} ];
			break;
		case "yesNoCancel":
			buttons = [
					{
						title : "是",
						clickFun : function() {
							if (config.triggerWin && config.closedFun) {
								var popwreturnfun = config.triggerWin[config.closedFun];
								if (popwreturnfun) {
									popwreturnfun(1);
								}
							}
							msgWin.closeMe();
						}
					},
					{
						title : "否",
						clickFun : function() {
							if (config.triggerWin && config.closedFun) {
								var popwreturnfun = config.triggerWin[config.closedFun];
								if (popwreturnfun) {
									popwreturnfun(-1);
								}
							}
							msgWin.closeMe();
						}
					},
					{
						title : "取消",
						clickFun : function() {
							if (config.triggerWin && config.closedFun) {
								var popwreturnfun = config.triggerWin[config.closedFun];
								if (popwreturnfun) {
									popwreturnfun(0);
								}
							}
							msgWin.closeMe();
						}
					} ];
			break;
		case "prompt":
			buttons = [ {
				title : "确定",
				clickFun : function() {
					if (config.triggerWin && config.closedFun) {
						var popwreturnfun = config.triggerWin[config.closedFun];
						if (popwreturnfun) {
							popwreturnfun(msgWin.getPrompTxt());
						}
					}
					msgWin.closeMe();
				}
			} ];
			break;
		case "alert":
		case "error":
		case "warning":
		case "question":
		case "information":
			buttons = [ {
				title : "确定",
				clickFun : function() {
					if (config.triggerWin && config.closedFun) {
						var popwreturnfun = config.triggerWin[config.closedFun];
						if (popwreturnfun) {
							popwreturnfun(1);
						}
					}
					msgWin.closeMe();
				}
			} ];
			break;
		default:
			buttons = [ {
				title : "确定",
				// returnFun : closedFun,//点击后调用iframe页面的beforeClose方法
				clickFun : function() {
					if (config.triggerWin && config.closedFun) {
						var popwreturnfun = config.triggerWin[config.closedFun];
						if (popwreturnfun) {
							popwreturnfun();
						}
					}
					msgWin.closeMe();
				}
			} ];
		}
		/***********************************************************************
		 * 根据类型选择button结束
		 **********************************************************************/
		// 弹框配置参数
		var msgConfig = {
			title : '提示信息',// 标题
			width : tempwd,// 宽度
			height : tempht,// 高度
			message : {
				message : config.message,// 消息内容
				type : config.type
			// 消息类型，confirm prompt yesNoCancel alert error warning question
			// information
			},
			module : true,
			button : {
				position : "center",
				buttons : buttons
			},
			min : false,
			max : false,
			close : true
		};
		var msgWin = new $.ui.win(msgConfig);
	};

	$.ui.win.prototype = {
		// 默认设置
		defaults : {
			title : "unknown title",// 窗口标题
			width : 500,// 宽度
			height : 500,// 高度
			iconClass : "dialog_icon_default",// 左上角图标
			min : true,// 是否显示最小按钮
			max : true,// 是否显示最大按钮
			close : true,// 是否显示关闭按钮
			module : false,// 是否以模态窗口方式打开
			buttons : null,// 按钮
			/*
			 * [ { value : btnSaveVal, returnFun :
			 * "returnFun",//点击后调用iframe页面的returnFun方法 click : function(win, v)
			 * "returnFun",//点击后调用iframe页面的returnFun方法 click : function(win, v)
			 * {//生成窗口的主页面的方法 // getValue(v); // alert('index.js') //
			 * win.closeMe(); } }, { value : "关闭", returnFun :
			 * "beforeClose",//点击后调用iframe页面的beforeClose方法 click : function(win) {
			 * win.closeMe(); } } ]
			 */
			closeFun : null,// 关闭按钮点击后事件
			/*
			 * { selfFun:function(win,value){//本窗口方法 },
			 * returnFun:"returnFun"}//弹出页面的返回方法
			 */
			position : null,// 弹出框位置，
			/*
			 * {left:10,//左上角横坐标位置 top:10//左上角纵坐标位置 }
			 */
			timeClose : null,// 自动关闭窗口设定时间，为大于0的自然数
			show : true,// 是否立即显示
			resize : false,// 是否可以更改窗口大小
			triggerWin : null
		// 触发弹窗的window对象
		},
		// 初始化
		init : function(config) {

			// 继承初始参数
			config = $.extend({}, $.ui.win.prototype.defaults, config);
			this.config = config;

			var me = this;
			// 若没配置id，则uuid
			if (!config.id) {
				config.id = Math.uuid();
			}
			// 若没配置名称，则id
			if (!config.name) {
				config.name = config.id;
			}
			this.name = config.name;
			this.ishide = !config.show;
			// 同一时间window的名称不能同名
			var winL = window.winArr.length;
			var i = 0;
			for (; i < winL; i++) {
				if (window.winArr[i].name == this.name) {
					break;
				}
			}
			if (i < winL) {
				alert("不能同时设置重复名称，请另外设置一个名称!");
				return;
			} else {
				// 放置本window在winArr数组中
				window.winArr.push(this);
			}

			// 初始化z-index
			var currentzindex = 100;
			// 如果没有创建过window，也就是没有currentWin，则currentWin设为自己
			if (!window.currentWin) {
				window.currentWin = this;
				this.preWin = null;
				this.nextWin = null;
			} else {
				// 根据当前window的z-index设置本window的z-index
				currentzindex = parseInt(window.currentWin.$windowdiv
						.css("z-index")) + 1;
				// 形成一个首位相连的链表
				// 设置本window的前一个window为currentWin;
				this.preWin = window.currentWin;
				// currentWin的nextWin设为本window
				window.currentWin.nextWin = this;
				// currentWin设为自己
				window.currentWin = this;
			}

			// 在main.jsp和本window之间放置一个遮罩层
			this.$blockdiv = $("<div class=\"m-overlay\" style=\"width:"
					+ config.width + "\"></div>");
			// 本window的容器
			this.$windowdiv = $("<div id=\"test\"class=\"m-dialog\" " + "id=\""
					+ config.id
					+ "windiv\"  style=\"border:0px solid red\"></div>");
			// 本window的z-index
			this.$windowdiv.css({
				"z-index" : currentzindex + 1
			});
			// 添加布局table
			this.$layoutTable = $("<table style=\"LINE-HEIGHT: 1.4;margin:0;padding:0; BORDER-COLLAPSE: collapse; FONT-FAMILY: 微软雅黑; FONT-SIZE: 14px; border:0px solid red;width:100%;\" cellSpacing=0 cellPadding=0></table>");
			this.$layoutTable.append("<tbody></tbody>");

			/** ********窗口顶部start************* */

			var $topTr = $("<tr style=\"noselect\"></tr>");
			// 左边圆角
			$tlTd = $("<td class=\"x-window-tl rbResize\"></td>");
			if (config.resize) {
				$tlTd.mousedown(function(e) {
					me.dragStart('ltResize', e);
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				});
			} else {
				$tlTd = $("<td class=\"x-window-tl\"></td>");
			}
			$topTr.append($tlTd);

			// 顶部中间
			var $tcTd = $("<td class=\"x-window-tc cbResize\"></td>");
			if (config.resize) {
				$tcTd.mousedown(function(e) {
					me.dragStart('ctResize', e);
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				});
			} else {
				$tcTd = $("<td class=\"x-window-tc\"></td>");
			}
			$topTr.append($tcTd);

			// 右边圆角
			var $trTd = $("<td class=\"x-window-tr lbResize\"></td>");
			if (config.resize) {
				$trTd.mousedown(function(e) {
					me.dragStart('rtResize', e);
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				});
			} else {
				$trTd = $("<td class=\"x-window-tr\"></td>");
			}
			$topTr.append($trTd);
			$("tbody", this.$layoutTable).append($topTr);
			/** ********窗口顶部start************* */

			/** ********窗口头部start************* */
			var $headerTr = $("<tr style=\"CURSOR: move; -moz-user-select: -moz-none\"></tr>");

			// 左边线
			if (config.resize) {
				var $lmTd = $("<TD class=\"x-window-ml  wResize\"></TD>");

				$lmTd.mousedown(function(e) {
					me.dragStart('leftBorderResize', e);
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				});
				$headerTr.append($lmTd);
			} else {
				$headerTr.append("<td class=\"x-window-ml \"></td>");
			}

			this.$titleTd = $("<td class=\"x-window-bc\"></td>");
			var $titlediv = $("<div class=\"dialog_title\"><SPAN style=\"FLOAT: left\" class=\""
					+ config.iconClass + "\">" + config.title + "</SPAN></div>");
			this.$titleTd.append($titlediv);
			// 关闭按钮
			if (config.close) {
				this.$closediv = $("<div class=\"x-tool x-tool-close\" title=\"关闭\"></div>");
				this.$closediv.mousedown(function(e) {
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				}).click(function() {
					me.closeMe(true);
				}).mouseover(function() {
					this.className = 'x-tool x-tool-close-over';
				}).mouseout(function() {
					this.className = 'x-tool x-tool-close';
				}).appendTo(this.$titleTd);
			}

			// 最大按钮
			if (config.max) {
				this.$maxdiv = $("<div class=\"x-tool x-tool-maximize\" title=\"最大化\"></div>");
				this.$maxdiv.mousedown(function(e) {
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				}).click(function() {
					me.maxMe();
				}).mouseover(function() {
					this.className = 'x-tool x-tool-maximize-over';
				}).mouseout(function() {
					this.className = 'x-tool x-tool-maximize';
				}).appendTo(this.$titleTd);
			}
			// 重置按钮
			if (config.max || config.min) {
				this.$restorediv = $("<div class=\"x-tool x-tool-restore\" title=\"还原\" style=\"display:none\"></div>");
				this.$restorediv.mousedown(function(e) {
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				}).click(function(e) {
					me.restoreMe();
				}).mouseover(function() {
					this.className = 'x-tool x-tool-restore-over';
				}).mouseout(function() {
					this.className = 'x-tool x-tool-restore';
				}).appendTo(this.$titleTd);
			}
			// 最小按钮
			if (config.min) {
				this.$mindiv = $("<div class=\"x-tool x-tool-minimize\" title=\"最小化\" ></div>");
				this.$mindiv.mousedown(function(e) {
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				}).click(function() {
					me.minMe();
				}).mouseover(function() {
					this.className = 'x-tool x-tool-minimize-over';
				}).mouseout(function() {
					this.className = 'x-tool x-tool-minimize';
				}).appendTo(this.$titleTd);
			}
			$headerTr.append(this.$titleTd);

			// 右边线
			if (config.resize) {
				var $rmTd = $("<TD class=\"x-window-mr  wResize\"></TD>");
				$rmTd.mousedown(function(e) {
					me.dragStart('rightBorderResize', e);
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				});
				$headerTr.append($rmTd);
			} else {
				$headerTr.append("<td class=\"x-window-mr \"></td>");
			}

			$("tbody", this.$layoutTable).append($headerTr);
			/** ********窗口头部end************* */

			/** ********窗口内容start************* */
			this.$bodyParentTr = $("<tr vAlign=\"top\"></tr>");
			// 左边线
			if (config.resize) {
				var $lmTd = $("<TD class=\"x-window-ml  wResize\"></TD>");

				$lmTd.mousedown(function(e) {
					me.dragStart('leftBorderResize', e);
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				});
				this.$bodyParentTr.append($lmTd);
			} else {
				this.$bodyParentTr.append("<td class=\"x-window-ml \"></td>");
			}

			var $bodyParentTd = $("<td align=\"middle\"></td>");

			var $bodyTable = $("<table border=\"0\" cellSpacing=\"0\" cellPadding=\"0\" width=\"100%\" bgColor=\"#ffffff\"></table>");
			$bodyTable.append("<tbody></tbody>");

			var $bodyTr = $("<tr></tr>");

			var $bodyTd = $("<td vAlign=\"top\"></td>");
			var bodyHeight = config.height - fixht;
			if (config.button) {
				bodyHeight -= 36;
			}
			this.$bodyDiv = $("<div  style=\"POSITION: relative; TEXT-ALIGN: left; WIDTH:"
					+ (config.width - fixwd)
					+ "px; HEIGHT: "
					+ bodyHeight
					+ "px;overflow:hidden;border:1px solid #EFFDFF;background:#CED9E7\"></div>");
			// 如果有iframe，iframe上面需要有遮罩div
			this.$winblock = $("<div class=\"winblock\">&nbsp;</div>");
			this.$bodyDiv.append(this.$winblock);

			$bodyTd.append(this.$bodyDiv);
			$bodyTr.append($bodyTd);
			$("tbody", $bodyTable).append($bodyTr);

			// 如果有按钮配置
			/*
			 * if (config.button && config.button.length > 0) { var
			 * $buttonTr=$("<TR></tr>"); var $buttonTd=$("<td height=\"36\"></td>");
			 * var $buttonDiv=$("<div></div>"); var bl=config.button.length;
			 * for ( var i = 0; i < bl; i++) { var btn = config.button[i]; var
			 * $tmpbtn = $("<input type=\"button\" class=\"button\" value=\"" +
			 * btn.value + "\"/>"); $tmpbtn.hover(function() {
			 * $(this).addClass("button_hover"); }, function() {
			 * $(this).removeClass("button_hover"); }).click((function(k) { //
			 * 得到配置的button的方法 var f = config.button[k].click; var returnFun =
			 * config.button[k].returnFun; return function() { //
			 * iframe方式时得到iframe的window var popw =
			 * document.getElementById(config.id + "popwindow"); var popv =
			 * null; if (popw) { // 得到window popw = popw.contentWindow; //
			 * iframe的window的returnFun方法 var popwreturnfun = eval("popw." +
			 * returnFun); if (popwreturnfun) { popv=popwreturnfun(); } } f(me,
			 * popv); }; })(i)); $buttonDiv.append($tmpbtn); }
			 */
			if (config.button) {
				var $buttonTr = $("<TR style=\"background:		#CED9E7\"></tr>");
				var $buttonTd = $("<td></td>");
				var $buttonDiv = $("<div></div>");
				var buttonConfig = {
					position : config.button.position,
					containerDiv : $buttonDiv,
					buttons : config.button.buttons
				};
				new $.ui.button(buttonConfig);
				$buttonTd.append($buttonDiv);
				$buttonTr.append($buttonTd);
				$("tbody", $bodyTable).append($buttonTr);
			}
			$bodyParentTd.append($bodyTable);
			this.$bodyParentTr.append($bodyParentTd);
			// 右边线
			if (config.resize) {
				var $rmTd = $("<TD class=\"x-window-mr  wResize\"></TD>");
				$rmTd.mousedown(function(e) {
					me.dragStart('rightBorderResize', e);
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				});
				this.$bodyParentTr.append($rmTd);
			} else {
				this.$bodyParentTr.append("<td class=\"x-window-mr \"></td>");
			}
			// this.$bodyParentTr.append("<td class=\"dialog_mrm \"></td>");
			$("tbody", this.$layoutTable).append(this.$bodyParentTr);
			/** ********窗口内容 end************* */

			/** ********窗口底部 start************* */

			if (config.resize) {
				var $lbTd = $("<TD class=\"x-window-bl lbResize\"></TD>");
				var $cbTd = $("<TD class=\"x-window-bc cbResize\"></TD>");
				var $rbTd = $("<TD class=\"x-window-br  rbResize\"></TD>");
				$lbTd.mousedown(function(e) {
					me.dragStart('lbResize', e);
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				});
				$cbTd.mousedown(function(e) {
					me.dragStart('bottomBorderResize', e);
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				});
				$rbTd.mousedown(function(e) {
					me.dragStart('rbResize', e);
					// 如果提供了事件对象，则这是一个非IE浏览器
					if (e && e.preventDefault) {
						// 阻止默认浏览器动作(W3C)
						e.preventDefault();
					} else {
						// IE中阻止函数器默认动作的方式
						window.event.returnValue = false;
					}
					return false;
				});
				var $bTr = $("<tr></tr>");
				$bTr.append($lbTd);
				$bTr.append($cbTd);
				$bTr.append($rbTd);
				$("tbody:eq(0)", this.$layoutTable).append($bTr);
			} else {
				$("tbody:eq(0)", this.$layoutTable).append(
						"<TR>" + "<TD class=\"x-window-bl\"></TD>"
								+ "<TD class=\"x-window-bc\"></TD>"
								+ "<TD class=\"x-window-br\"></TD>" + "</TR>");
			}

			/** ********窗口底部 end************* */

			// 把本window放在body中
			this.$windowdiv.append(this.$layoutTable);
			this.$windowdiv.appendTo(document.body);

			// mousedown事件
			this.$windowdiv.mousedown(function(e) {
				// 取得currentWin的z-index
				var czindex = parseInt(window.currentWin.$windowdiv
						.css("z-index"));
				var tmpWin = me;
				// 循环找nextWin，设置其z-index
				while (tmpWin.nextWin) {
					tmpWin = tmpWin.nextWin;
					var $tmpdiv = tmpWin.$windowdiv;
					var oldzindex = parseInt($tmpdiv.css("z-index"));
					$tmpdiv.css("z-index", oldzindex - 2);
				}
				// currentWin不为自己
				if (window.currentWin != me) {
					// 有本窗口的preWin
					if (me.preWin) {
						// preWin的nextWin指向本window的nextWin
						me.preWin.nextWin = me.nextWin;
					}
					// 有本窗口的nextWin
					if (me.nextWin) {
						// nextWin的preWin指向本window的preWin
						me.nextWin.preWin = me.preWin;
					}
					// currentWin的nextWin指向本window
					window.currentWin.nextWin = me;
					// 本window的preWin指向currentWin
					me.preWin = window.currentWin;
					// 本window的nextWin指向null
					me.nextWin = null;
					// 本window的z-index
					me.$windowdiv.css("z-index", czindex);
					// currentWin设置为本window
					window.currentWin = me;

					// 如果不点击在标题栏上，则window的上面的一层遮罩隐藏
					if (!($(e.target).hasClass("dialog_title"))) {
						me.$winblock.hide();
					}
				}
			});
			// title的mousedown
			this.$titleTd[0].onmousedown = function(e) {
				me.dragStart('move', e);
			};

			// 如果是模态方式打开,添加主窗口与本window之间的遮罩层
			if (config.module) {
				this.$blockdiv.css("z-index", currentzindex).height(
						window.document.documentElement.clientHeight).width(
						window.document.documentElement.clientWidth - 6)
						.appendTo(document.body).show();
			}
			// $("#debugDiv").append("window.document.documentElement.scrollWidth"+window.document.documentElement.scrollWidth+"<br/>");
			// $("#debugDiv").append("window.document.documentElement.scrollHeight"+window.document.documentElement.scrollWidth+"<br/>");
			// 根据配置加载内容
			this.loadcontentbyconfig();
		},
		dragStart : function(dragtype, e) { // 开始拖动
			e = e || window.event;
			var originalWDiv = this.$windowdiv[0];
			if (originalWDiv.setCapture) {
				originalWDiv.setCapture();
			} else if (window.captureEvents) {
				window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
			}
			var me = this;
			this.move = true;
			this._x = e.clientX - parseInt(this.$windowdiv.css("left"));
			this._y = e.clientY - parseInt(this.$windowdiv.css("top"));
			this._h = e.clientY - parseInt(this.$windowdiv.css("height"));
			if (dragtype == 'move') {// 移动窗口
				// this.$windowdiv.addClass("containerMoving");
				// this.$windowdiv.width(this.$windowdiv.width());
				// this.$windowdiv.height(this.$windowdiv.height());
				// this.$layoutTable.hide();
			} else if (dragtype == 'leftBorderResize'
					|| dragtype == 'rightBorderResize') {
				this._clientX = e.clientX;
				this._width = this.$windowdiv.width();
			} else if (dragtype == 'bottomBorderResize'
					|| dragtype == 'ctResize') {
				this._clientY = e.clientY;
				this._height = this.$windowdiv.height();
			} else if (dragtype == 'lbResize' || dragtype == 'rbResize'
					|| dragtype == 'ltResize' || dragtype == 'rtResize') {
				this._clientX = e.clientX;
				this._clientY = e.clientY;
				this._width = this.$windowdiv.width();
				this._height = this.$windowdiv.height();
			}

			// 显示本window的上面的遮罩层
			this.$winblock.show();
			document.onmousemove = function(e) {
				e = e || window.event;
				me.dragMove(dragtype, e);
			}
			document.onmouseup = function(e) {
				e = e || window.event;
				me.dragEnd(dragtype, e);
				// 作废捕获局限
				if (originalWDiv.releaseCapture) {
					originalWDiv.releaseCapture();
				} else if (window.captureEvents) {
					window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
				}
			}
			$('body').noSelect();// 拖动时，不让选择页面上的文本
		},
		dragMove : function(dragtype, e) {// mousemove事件
			var diffX = e.clientX - this._clientX;
			var diffY = e.clientY - this._clientY;
			var x = e.clientX - this._x;
			var y = e.clientY - this._y;
			var fixheight = 0;
			if (dragtype == 'move') {// 移动窗口
				this.$windowdiv.css("left", x + 'px');
				this.$windowdiv.css("top", y + 'px');
			} else if (dragtype == 'leftBorderResize'
					&& this._width - diffX > ($('div', this.$titleTd).width() + 150)) {
				// 左边线移动改变窗口宽度

				this.$bodyDiv.css({
					width : (this._width - diffX - fixwd) + 'px'
				});
				this.$windowdiv.css({
					left : x + 'px',
					width : (this._width - diffX) + 'px'
				});
			} else if (dragtype == 'rightBorderResize'
					&& this._width + diffX > ($('div', this.$titleTd).width() + 150)) {
				// 右边线移动改变窗口宽度
				this.$bodyDiv.css({
					width : (this._width + diffX - fixwd) + 'px'
				});
				this.$windowdiv.css({
					width : (this._width + diffX) + 'px'
				});
			} else if (dragtype == 'bottomBorderResize') {
				// 底部边线移动改变窗口高度
				if (this.config.button) {
					fixheight = fixht + fixbutton;
				} else {
					fixheight = fixht;
				}
				this.$bodyDiv.css({
					height : (this._height + diffY - fixheight) + 'px'
				});
				this.$windowdiv.css({
					height : (this._height + diffY) + 'px'
				});
			} else if (dragtype == 'lbResize') {
				// 底部左下角移动改变窗口高度宽度
				if (this.config.button) {
					fixheight = fixht + fixbutton;
				} else {
					fixheight = fixht;
				}

				this.$bodyDiv.css({
					height : (this._height + diffY - fixheight) + 'px'
				});
				this.$windowdiv.css({
					height : (this._height + diffY) + 'px'
				});

				if (this._width - diffX > ($('div', this.$titleTd).width() + 150)) {
					this.$bodyDiv.css({
						width : (this._width - diffX - fixwd) + 'px'
					});
					this.$windowdiv.css({
						left : x + 'px',
						width : (this._width - diffX) + 'px'
					});
				}
			} else if (dragtype == 'rbResize') {
				// 底部右下角移动改变窗口高度宽度
				if (this.config.button) {
					fixheight = fixht + fixbutton;
				} else {
					fixheight = fixht;
				}
				this.$bodyDiv.css({
					height : (this._height + diffY - fixheight) + 'px'
				});
				this.$windowdiv.css({
					height : (this._height + diffY) + 'px'
				});

				if (this._width + diffX > ($('div', this.$titleTd).width() + 150)) {
					this.$bodyDiv.css({
						width : (this._width + diffX - fixwd) + 'px'
					});
					this.$windowdiv.css({
						width : (this._width + diffX) + 'px'
					});
				}

			} else if (dragtype == 'ltResize') {
				if (this._width - diffX > ($('div', this.$titleTd).width() + 150)) {
					// 左右移动改变窗口宽度

					this.$bodyDiv.css({
						width : (this._width - diffX - fixwd) + 'px'
					});
					this.$windowdiv.css({
						left : x + 'px',
						width : (this._width - diffX) + 'px'
					});
				}

				// 上下移动改变窗口宽度
				if (this.config.button) {
					fixheight = fixht + fixbutton;
				} else {
					fixheight = fixht;
				}

				if ((this._height - diffY - fixheight) > 0) {
					this.$bodyDiv.css({
						height : (this._height - diffY - fixheight) + 'px'
					});
					this.$windowdiv.css({
						top : y + 'px',
						height : (this._height - diffY) + 'px'
					});
				}

			} else if (dragtype == 'ctResize') {
				// 上下移动改变窗口宽度
				if (this.config.button) {
					fixheight = fixht + fixbutton;
				} else {
					fixheight = fixht;
				}
				if ((this._height - diffY - fixheight) > 0) {
					this.$bodyDiv.css({
						height : (this._height - diffY - fixheight) + 'px'
					});
					this.$windowdiv.css({
						top : y + 'px',
						height : (this._height - diffY) + 'px'
					});
				}
			} else if (dragtype == 'rtResize') {

				// 顶部右上角移动改变窗口高度宽度
				if (this.config.button) {
					fixheight = fixht + fixbutton;
				} else {
					fixheight = fixht;
				}

				if (this._width + diffX > ($('div', this.$titleTd).width() + 150)) {
					this.$bodyDiv.css({
						width : (this._width + diffX - fixwd) + 'px'
					});
					this.$windowdiv.css({
						width : (this._width + diffX) + 'px'
					});
				}

				// 上下移动改变窗口宽度
				if (this.config.button) {
					fixheight = fixht + fixbutton;
				} else {
					fixheight = fixht;
				}
				if ((this._height - diffY - fixheight) > 0) {
					this.$bodyDiv.css({
						height : (this._height - diffY - fixheight) + 'px'
					});
					this.$windowdiv.css({
						top : y + 'px',
						height : (this._height - diffY) + 'px'
					});
				}
			}

		},
		dragEnd : function(dragtype, e) {// 拖动结束
			if (dragtype == 'move') {
				this.$winblock.hide();

				this.$windowdiv.removeClass("containerMoving")
				this.$layoutTable.show();
				var maxleft = window.document.documentElement.clientWidth
						+ window.document.documentElement.scrollLeft
						- this.$windowdiv.width();
				var maxtop = window.document.documentElement.clientHeight
						+ window.document.documentElement.scrollTop
						- this.$windowdiv.height();
				var x = e.clientX - this._x;
				var y = e.clientY - this._y;
				// alert(maxleft)
				if (x < window.document.documentElement.scrollLeft) {
					this.$windowdiv.css("left",
							window.document.documentElement.scrollLeft + 'px');
				}
				if (x > maxleft) {
					this.$windowdiv.css("left", maxleft + 'px');
				}

				if (y < window.document.documentElement.scrollTop) {
					this.$windowdiv.css("top",
							window.document.documentElement.scrollTop + 'px');
				}
				if (y > maxtop) {
					this.$windowdiv.css("top", maxtop + 'px');
				}
			}
			$('body').noSelect(false);
			document.onmousemove = null;
			document.onmouseup = null;
		},
		closeMe : function(defaultClose) {// 关闭
			var me = this;
			var timer = null;
			// 如果是点击右上角关闭按钮关闭，且配置了关闭事件，则执行关闭事件
			if (defaultClose) {
				var f = null;
				var returnFun = null;
				if (me.config.closeFun) {
					// 得到配置的close的方法
					f = me.config.closeFun.selfFun;
					returnFun = me.config.closeFun.returnFun;
					// iframe方式时得到iframe的window
					var popw = document.getElementById(me.config.id
							+ "popwindow");
					var popv = null;
					if (popw) {
						// 得到window
						popw = popw.contentWindow;
						// iframe的window的returnFun方法
						var popwreturnfun = eval("popw." + returnFun);
						if (popwreturnfun) {
							popv = popwreturnfun();
						}
					}
					// 本窗口方法执行
					if (f) {
						f(me, popv);
					}
				}
			}

			var handler = function() {
				var popw = document.getElementById(me.config.id + "popwindow");
				if (popw) {
					popw.contentWindow.document.write('');
					popw.contentWindow.close();
				}
				me.$windowdiv.remove();
				me.$blockdiv.remove();
				if (me.nextWin) {
					me.nextWin.preWin = me.preWin;
					me.nextWin.$winblock.hide();
					// 设置currentWin
					window.currentWin = me.nextWin;
				}
				if (me.preWin) {// 有preWin，则激活
					me.preWin.nextWin = me.nextWin;
					me.preWin.$winblock.hide();
					// 设置currentWin
					window.currentWin = me.preWin;
				}
				if (!me.preWin&&!me.nextWin) {
					window.currentWin = null;
				}else{
					me.preWin=null;
					me.nextWin=null;
				}

				var winL = window.winArr.length;
				var i = winL - 1;
				// winArr去掉该window
				for (; i >= 0; i--) {
					if (window.winArr[i].name == me.name) {
						window.winArr.splice(i, 1);
					}
				}
				clearInterval(timer);
			};
			timer = setInterval(handler, 350);
		},
		maxMe : function() {// 最大化
			if (this.max) { // 已经最大化
				return;
			}
			var me = this;
			var otop = parseInt(this.$windowdiv.css("top"));
			var oleft = parseInt(this.$windowdiv.css("left"));
			var owidth = this.$windowdiv.width();
			var oheight = this.$bodyDiv.height();
			var fixheight = 0;
			if (this.config.button) {
				fixheight = fixht + fixbutton;
			} else {
				fixheight = fixht;
			}
			if (this.min) {// 如果是最小状态
				this.$bodyParentTr.show();
			} else {// 设置原来的状态参数
				this.otop = otop;
				this.oleft = oleft;
				this.owidth = owidth;
				this.oheight = oheight;
			}
			// 显示重置按钮
			this.$restorediv.show();
			// 显示最小按钮
			if (this.$mindiv) {
				this.$mindiv.show();
			}
			// 最大按钮隐藏
			this.$maxdiv.hide();
			this.$windowdiv.css({
				top : window.document.documentElement.scrollTop + 1,
				left : window.document.documentElement.scrollLeft + 1,
				width : window.document.documentElement.clientWidth - 4
			});
			// $("#debugDiv").append("window.document.documentElement.clientWidth"+window.document.documentElement.clientWidth+"<br/>");
			// $("#debugDiv").append("this.$windowdiv.width"+this.$windowdiv.width()+"<br/>");
			this.$bodyDiv.css({
				height : window.document.documentElement.clientHeight
						- fixheight,
				width : window.document.documentElement.clientWidth - fixwd - 4
			});

			// this.$bodyDiv.hide();
			this.max = true;
			this.min = false;
		},
		minMe : function() {// 最小化
			if (this.min) {
				return;
			}
			var me = this;
			var otop = parseInt(this.$windowdiv.css("top"));
			var oleft = parseInt(this.$windowdiv.css("left"));
			var owidth = this.$windowdiv.width();
			var oheight = this.$bodyDiv.height();
			if (!this.max) {
				this.otop = otop;
				this.oleft = oleft;
				this.owidth = owidth;
				this.oheight = oheight;
			}

			this.min = true;
			this.max = false;
			// 显示重置按钮
			this.$restorediv.show();
			// 隐藏最小按钮
			this.$mindiv.hide();
			// 显示最大按钮
			if (this.$maxdiv) {
				this.$maxdiv.show();
			}
			this.$windowdiv.css({
				top : window.document.documentElement.clientHeight
						+ window.document.documentElement.scrollTop - fixht,
				left : window.document.documentElement.scrollLeft,
				width : $('div', this.$titleTd).width() + 150
			});
			$("table:eq(0)", this.$windowdiv).css("width",
					$('div', this.$titleTd).width() + 63);
			this.$bodyParentTr.hide();
		},
		restoreMe : function() {// 重置
			var me = this;
			var topstep;
			var leftstep;
			var widthstep;
			var heightstep;
			var p;
			// 恢复移动及改变大小
			me.$titleTd[0].onmousedown = function(e) {
				me.dragStart('move', e);
			};
			if (this.max || this.min) {//
				this.$windowdiv.css({
					top : this.otop,
					left : this.oleft,
					width : this.owidth
				});

				this.$bodyDiv.css({
					height : this.oheight,
					width : this.owidth - fixwd
				});
				this.$bodyParentTr.show();
			} else {
				return;
			}
			this.min = false;
			this.max = false;
			// 显示和隐藏各按钮
			this.$restorediv.hide();
			if (this.$mindiv) {
				this.$mindiv.show();
			}
			if (this.$maxdiv) {
				this.$maxdiv.show();
			}
		},
		setTitle : function(title) {// 设置title
			$('span', this.$titleTd).html(title);
		},
		getTitle : function() {// 得到title
			return $('span', this.$titleTd).html();
		},
		hideMe : function() {// 隐藏
			this.$windowdiv.hide();
			this.ishide = true;
		},
		showMe : function() {// 显示
			this.$windowdiv.show();
		},
		getConfig : function() {// 得到config
			return this.config;
		},
		loadcontentbyconfig : function() {// 根据配置，取得加载内容并加载
			var me = this;
			var config = me.config;
			var loader = config.loader;
			me.$winblock.css({
				"height" : (config.height - fixht) + "px",
				"width" : (config.width - fixwd) + "px"
			});
			var wintop = (window.document.documentElement.clientHeight - config.height)
					/ 2 + window.document.documentElement.scrollTop;
			var winleft = (window.document.documentElement.clientWidth - config.width)
					/ 2 + window.document.documentElement.scrollLeft;

			if (wintop < 0) {
				wintop = 0;
			}
			if (winleft < 0) {
				winleft = 0;
			}

			if (!config.position) {
				me.$windowdiv.css({
					// "visibility":"visible",
					"width" : config.width + "px",
					"left" : winleft + "px",
					"top" : wintop + "px"
				});
			} else {
				me.$windowdiv.css({
					"display" : "block",
					"width" : config.width + "px",
					"left" : config.position.left + "px",
					"top" : config.position.top + "px"
				});
			}

			if (config.show) {
				this.$windowdiv.css({
					"visibility" : "visible"
				}).focus();
			}
			if (loader && loader.iframeflag) {// iframe方式加载窗口内容
				me.$bodyDiv.css("overflow", "hidden");
				me.$bodyDiv
						.append("<iframe id=\""
								+ config.id
								+ "popwindow\" name=\""
								+ config.id
								+ "popwindow\" src=\""
								+ loader.url
								+ "\" width=\"100%\" height=\"100%\" frameborder=\"0\"></iframe>");
				if (config.show) {
					// loading状态
					me.$winblock.addClass("winblockLoading").removeClass(
							"winblock");

					me.$winblock.show();

					var iframe = document.getElementById(config.id
							+ "popwindow");
					// iframe加载完毕，取消loading状态
					if (iframe.attachEvent) {
						iframe.attachEvent("onload", function() {
							me.$winblock.removeClass("winblockLoading")
									.addClass("winblock");
							me.$winblock.hide();
						});
					} else {
						iframe.onload = function() {
							me.$winblock.removeClass("winblockLoading")
									.addClass("winblock");
							me.$winblock.hide();
						};
					}
				}
			} else {
				if (loader) {// ajax方式加载窗口
					var param = loader.param;
					if (!param) {
						param = {};
					}
					// loading状态
					me.$winblock.addClass("winblockLoading").removeClass(
							"winblock");
					me.$winblock.show();

					$.ajax({
						type : 'post',// ajax提交方式
						url : loader.url,// 提交的url
						data : param,// 参数
						dataType : 'text',// 数据返回的形式，默认为text即文本
						cache : false,
						success : function(content) {
							me.$bodyDiv.empty().append(content);
							// 加载完毕，取消loading状态
							me.$winblock.removeClass("winblockLoading")
									.addClass("winblock");
							me.$winblock.hide();
						},
						error : function(XMLHttpRequest, textStatus,
								errorThrown) {
							alert('data error');
							me.closeMe();
						}
					});
				} else if (config.contentdiv) {
					var contentdiv = config.contentdiv;
					if (typeof (contentdiv) == "string") {
						contentdiv = $("#" + contentdiv).clone();
					} else {
						contentdiv = contentdiv.clone();
					}
					contentdiv.show();
					me.$bodyDiv.empty().append(contentdiv);
				} else if (config.message) {
					// 弹出框
					// confirm prompt yesNoCancel alert error warning question
					// information

					var $msgTb = $("<TABLE border=0 cellSpacing=0 cellPadding=10 align=center  height=\"100%\"></table>");
					var $msgTr1 = $("<tr></tr>");
					var icon = "";
					// confirm prompt yesNoCancel alert error warning question
					// information
					// 根据弹框类型选择图标
					switch (config.message.type) {
					case "confirm":
					case "yesNoCancel":
					case "question":
						icon = "mb-question";
						break;
					case "error":
						icon = "mb-error";
						break;
					case "warning":
						icon = "mb-warning";
						break;
					case "information":
						icon = "mb-info";
						break;
					default:
					}
					// 加载弹框图标
					if (icon != "") {
						$msgTr1.append("<TD align=center><div class=\"mb-icon "
								+ icon + "\" ></div></TD>");
					}
					// 消息内容
					var $msgTd1 = $("<TD style=\"FONT-FAMILY: 微软雅黑; FONT-SIZE: 14px;width:100%\" valign=\"top\" align=\"left\"><div style=\"padding-top:5px;\">"
							+ config.message.message + "</div></TD>");
					if (config.message.type == "prompt") {
						// 简单输入框
						me.$promptTxt = $("<input type=\"text\"/>");
						$msgTd1.append(me.$promptTxt);
					}
					$msgTr1.append($msgTd1);
					$msgTb.append($msgTr1);
					me.$bodyDiv.empty().append($msgTb);
				}
			}
			if (config.timeClose) {
				var timeReg = /^\d+$/;
				if (timeReg.test(config.timeClose)) {
					var timer = null;
					var handler = function() {
						me.closeMe();
						clearInterval(timer);
					};
					timer = setInterval(handler, config.timeClose * 1000 - 200);
				} else {
					alert("自动关闭窗口时间必须为大于0的整数!");
				}
			}
		},
		get$body : function() {
			return this.$bodyDiv;
		},
		ishidden : function() {
			return this.ishide;
		},
		hideIconExceptClose : function() {
			// 隐藏除了关闭按钮的其他按钮
			if (this.$maxdiv) {
				this.$maxdiv.hide();
			}
			if (this.$mindiv) {
				this.$mindiv.hide();
			}
			if (this.$restorediv) {
				this.$restorediv.hide();
			}
		},
		setWidth : function(widthval) {
			// 设置宽度
			this.$windowdiv.css("width", widthval + 'px');
		},
		setHeight : function(heightval) {
			// 设置高度
			var fixheight = 0;
			if (this.config.button) {
				fixheight = fixht + fixbutton;
			} else {
				fixheight = fixht;
			}
			this.$bodyDiv.css("height", heightval - fixheight + 'px');
			this.$windowdiv.css("height", heightval + 'px');
		},
		setWidthAndHeight : function(widthval, heightval) {
			// 设置宽度和高度
			this.setWidth(widthval);
			this.setHeight(heightval);
		},
		moveCenter : function() {
			// 移动到屏幕中心
			var owidth = this.$windowdiv.width();
			var oheight = this.$bodyDiv.height();
			var fixheight = 0;
			if (this.config.button) {
				fixheight = fixht + fixbutton;
			} else {
				fixheight = fixht;
			}
			var wintop = (window.document.documentElement.clientHeight
					- oheight - fixheight)
					/ 2 + window.document.documentElement.scrollTop;
			if (wintop < 0) {
				wintop = 0;
			}
			var winleft = (window.document.documentElement.clientWidth - owidth)
					/ 2 + window.document.documentElement.scrollLeft;
			if (winleft < 0) {
				winleft = 0;
			}
			this.$windowdiv.css({
				"left" : winleft + "px",
				"top" : wintop + "px"
			});
		},
		getPopupWindow : function() {
			// 若以iframe方式打开，可以用此方法得到打开窗口的window对象
			var popw = document.getElementById(config.id + "popwindow");
			if (popw) {
				// 得到window
				popw = popw.contentWindow;
			}
			return popw;
		},
		getPrompTxt : function() {
			return this.$promptTxt.val();
		}
	};

})(jQuery);
