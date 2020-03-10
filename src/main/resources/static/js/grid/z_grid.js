/*
根据参数，动态改变grid高宽
显示和隐藏div的高度调节
 */
function grid(p) {
	// 默认参数
	this.p = {
		animate : false,// 是否可以交换列，改变列宽度
		selectType : null,// 行点击后，选择则该行，可选项：单选'single',多选'multiple'，若不配置此参数则不选择
		autoload : true,// 是否自动加载
		errormsg : '数据错误！',// 错误信息，暂未用
		// resizeable : false,// 自动调节大小
		nomsg : '没有数据！',// 没有数据信息
		pagestat : '显示数据为{from}-{to}条，总数据为{total}条。',// 状态信息
		rp : 20,
		sort : false,
		callback : {
			afterloaded : null,
			rowclick : null,
			rowselect : null
		}
	// 每页显示条数
	};
	this.init(p);// 调用初始化方法
}

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

grid.prototype = {
	init : function(p) {
		$.extend(this.p, p);// 继承默认参数
		var me = this;
		// 定义grid的容器
		me.$grid = typeof me.p.containerDiv == "string" ? $("#"
				+ me.p.containerDiv) : me.p.containerDiv;
		// 初始化grid时的url参数
		me.param = p.param;
		me.gridjsondata = [];
		// 定义grid的左边界，上边界，等
		var toffset = me.$grid.offset();
		me.left = toffset.left;
		me.top = toffset.top;
		// 表体高度
		me.fixbdivheight = 0;
		me.width = 0;
		me.height = 0;
		// 列宽度改变时用到的对象
		me.colresize = null;
		// 当前页
		me.currentPage = 1;
		me.dcoln = -1;// 主动交换列的index
		me.hdh = $(".hDiv", this.$grid).height() + 1;// 表头div的高度
		me.hDivTop = $(".hDiv", this.$grid).offset().top;// 表头div的顶部纵坐标
		// 隐藏和显示列时，装载所有表头的table及div，样式中设定它为隐藏
		var $nDiv = $("<DIV class=\"nDiv\"><TABLE cellSpacing=\"0\" cellPadding=\"0\"><TBODY></TBODY></TABLE></DIV>");
		me.$nDiv = $nDiv;
		// 排序的字段名和排序方式
		me.sort = me.p.sort;
		me.sortname = me.p.sortname;
		me.sortorder = "asc";
		// 点击该div后，显示上面的div，样式中设定它为隐藏
		var $nBtn = $("<DIV class=\"nBtn\" title=\"隐藏/显示\"><DIV></DIV></DIV>");
		me.$nBtn = $nBtn;
		// 允许动画操作
		if (me.p.animate) {
			$nBtn.click(function() {
				// 计算$nDiv的宽度
				var nDivWidth = me.$nDiv.width();
				// 计算容器的最右边值
				var grigth = me.left + me.width;
				// 如果$nDiv的显示不超过容器最右边值，则$nDiv的左边与$nBtn的左边对齐
				// 否则$nDiv左移
				if ((nDivWidth + $(this).offset().left) < (grigth))
					me.$nDiv.css({
						'top' : me.hDivTop + me.hdh - 1,
						'left' : $(this).offset().left
					}).show();
				else
					me.$nDiv.css({
						'top' : me.hDivTop + me.hdh - 1,
						'left' : (grigth - nDivWidth - 5)
					}).show();
			});
			// $nBtn顶部与表头div的顶部纵坐标一样
			me.$nBtn.css('top', this.hDivTop);
			$('body').append($nDiv).append($nBtn);
		}
		// 列交换时，mouseover事件被动交换列的左三角样式
		// me.$cdropleft = $("<DIV class=\"cdropleft\"></DIV>");
		// me.$cdropleft.css('top', this.hDivTop + 3);
		// 列交换时，mouseover事件被动交换列的右三角样式
		// me.$cdropright = $("<DIV class=\"cdropright\"></DIV>");
		// me.$cdropright.css('top', this.hDivTop + 3);
		// if (!$.browser.msie) {
		// me.$cdropleft.addClass("firefoxcdrop");
		// me.$cdropright.addClass("firefoxcdrop");
		//
		// }
		this.pdh = $(".pDiv", this.$grid).height() + 1; // 分页栏高度
		var tdh = $(".tDiv", this.$grid).height();// 按钮栏高度
		tdh = tdh > 0 ? tdh + 1 : 0;// 如果有按钮栏则将tdh加1
		this.tdh = tdh;
		// $(".tDiv ul li a").mousedown(function() {
		// // alert(1)
		// $(this).addClass("mousedown");
		// }).mouseup(function() {
		// // alert(2)
		// $(this).removeClass("mousedown");
		// // alert(3)
		// });
		// 将grid改变尺寸，自动适应grid父节点的大小
		me.resize();
		// 根据表头信息，设置列线及显示和隐藏列的div及table
		me.setHdiv();
		// 表体的scroll事件，移动时表头作相应改变
		$(".bDiv", me.$grid).scroll(
				function() {
					// 通过改变marginLeft，达到相应移动效果
					$(".hDiv", me.$grid).css("marginLeft",
							$(this).scrollLeft() * (-1));
					// 移动并根据列线位置判断其是否显示
					me.showhideCline();
				});
		// 当鼠标移动到body，或者按钮栏，表体上时，让隐藏显示列的相关div不可见
		$('body').add(".tDiv,.bDiv", me.$grid).hover(function() {
			me.hideColTip();
		});
		/***********************************************************************
		 * 这部分是可以灵活处理的，根据需要做好grid底部的翻页，然后修改此处代码*
		 **********************************************************************/
		// 刷新
		$('.pDiv .pReload', me.$grid).click(function() {
			me.load();
		});
		// 跳到第一页
		$('.pDiv .pFirst', me.$grid).click(function() {
			me.changePage('first');
		});
		// 跳到前一页
		$('.pDiv .pPrev', me.$grid).click(function() {
			me.changePage('prev');
		});
		// 跳到下一页
		$('.pDiv .pNext', me.$grid).click(function() {
			me.changePage('next');
		});
		// 跳到最后一页
		$('.pDiv .pLast', me.$grid).click(function() {
			me.changePage('last');
		});
		// 跳到指定的页
		$('.pDiv .pcontrol input', me.$grid).keydown(function(e) {
			if (e.keyCode == 13)
				me.changePage('input');
		});
		/***********************************************************************
		 * end *
		 **********************************************************************/
		// 载入数据
		if (me.p.autoload) {
			me.load();
		}
		// 自动调节大小，当设置为不能改变大小时，父节点变大则变大，否则不变
		// window.onresize = (function() {
		// var timeout=null;
		// return (function() {
		// window.clearTimeout(timeout);
		// timeout = window.setTimeout(function() {
		// me.resize(!me.p.resizeable);
		// }, 300);
		// });
		// })();
	},
	changePage : function(ctype) { // 翻页处理
		if (this.loading)
			return true;// 正在刷新则返回
		switch (ctype) {
		case 'first': // 翻到第一页
			this.newPage = 1;
			break;
		case 'prev': // 前一页
			if (this.currentPage > 1)
				this.newPage = parseInt(this.currentPage) - 1;
			break;
		case 'next': // 下一页
			if (this.currentPage < this.pageCount)
				this.newPage = parseInt(this.currentPage) + 1;
			break;
		case 'last': // 最后一页
			this.newPage = this.pageCount;
			break;
		case 'input': // 翻到指定的页
			var nv = parseInt($('.pDiv .pcontrol input', this.$grid).val());
			if (isNaN(nv))
				nv = 1;
			if (nv < 1)
				nv = 1;
			else if (nv > this.pageCount)
				nv = this.pageCount;
			$('.pDiv .pcontrol input', this.$grid).val(nv);
			this.newPage = nv;
			break;
		}
		if (this.newPage == this.currentPage)
			return false;// 如果新的页与当前页相同则返回
		this.load();// 刷新实现翻页
	},
	hideColTip : function() {// 隐藏$nBtn，$nDiv
		this.$nBtn.hide();
		this.$nDiv.hide();
	},
	reload : function(param) {// 刷新
		this.newPage = 1;
		if (this.param) {
			$.extend(this.param, param);
		} else {
			this.param = param;
		}
		// this.load(true);
		this.load();
	},
	load : function() {// 调用ajax装载数据到表体
		var me = this;
		this.loading = true;// loading状态为true
		$('.pDiv .pReload', this.$grid).addClass('loading');
		if (!this.newPage) {
			this.newPage = 1;// 所要跳到的新的页面
		}
		// 新的页面大于总页数时置为总页数
		if (this.newPage > this.pageCount) {
			this.newPage = this.pageCount;
		}
		// 计算起始条数和结束条数
		var startIndex = (this.newPage - 1) * this.p.rp;
		var param = {
			startIndex : startIndex,
			maxCount : this.p.rp,
			sortname : this.sortname,// 排序字段名称及排序方式
			sortorder : this.sortorder
		};
		if (this.param) {// 继承外来参数
			$.extend(param, this.param);
		}
		$.ajax({
			type : 'post',// ajax提交方式
			url : this.p.url,// 提交的url
			data : param,// 参数
			dataType : 'text',// 数据返回的形式，默认为text即文本
			cache : false,
			success : function(msg) {
				// 隐藏表体中的table，原因时在加载表体后，
				// 有一些移动和改变宽度，隐藏的动作，不需要在页面上表现出来
				$(".bDiv table", me.$grid).hide();
				// 加载表体数据
				$(".bDiv", me.$grid).empty().append(msg);
				me.adjustbody();// 调整表体
				me.showhideCline();// 显示和隐藏列线
				/*
				 * var gridjsondata = $( '.bDiv
				 * :input[type="hidden"][name="gridjsondata"]',
				 * me.$grid).val(); me.setGridJsondata(gridjsondata);
				 */

				me.setGridJsondata();
				if (me.p.selectType && me.p.selectType == 'multiple') {
					$(".hDiv tr th div input", me.$grid).first().prop(
							"checked", false);
					;// 表头的checkbox去掉选择状态
				}
				// 回调加载完成后事件
				var afterloaded = me.p.callback.afterloaded;
				if (afterloaded) {
					afterloaded(me);
				}
				me.buildStatus();// 设置翻页状态栏
				me.loading = false;// 取消loading状态
				$('.pDiv .pReload', this.$grid).removeClass('loading');
				$(".bDiv table", me.$grid).show();// 显示表体
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert('data error');
			}
		});
	},
	buildStatus : function() {// 设置状态
		// 根据隐藏对象total，得到数据总数量
		var hidtotal = $('.bDiv :input[type="hidden"][name="total"]',
				this.$grid).val();
		this.total = parseInt(hidtotal);
		if (this.total == 0) {
			this.pageCount = 1;
			this.currentPage = 1;
		} else {
			this.pageCount = Math.ceil(this.total / this.p.rp);// 根据总数和每页显示的数据量计算总页数
			this.currentPage = this.newPage;// 当前页数
		}
		$('.pDiv .pcontrol input', this.$grid).val(this.currentPage);// 当前页
		$('.pDiv .pcontrol span', this.$grid).html(this.pageCount);// 总页数
		if (this.total > 0) {
			var r1 = (this.currentPage - 1) * this.p.rp + 1; // 计算当前页起始数据index
			var r2 = r1 + this.p.rp - 1; // 计算当前页结束数据index
			if (this.total < r2) {
				r2 = this.total;
			}
			var stat = this.p.pagestat;
			stat = stat.replace(/{from}/, r1);
			stat = stat.replace(/{to}/, r2);
			stat = stat.replace(/{total}/, this.total);
			$('.pDiv .pPageStat', this.$grid).html(stat);// 状态显示区附文字
		} else {// 没有数据
			$('.pDiv .pPageStat', this.$grid).html(this.p.nomsg);// 状态显示区附文字
		}
	},
	adjustbody : function() {// 调整表体
		/***********************************************************************
		 * 当列的顺序改变后，reload进来，顺序要做相应调整 * 调整的算法为： *
		 * 找到$nDiv，按顺序取得相应tr，该顺序就是grid的列的顺序 * 取得其checkbox的val，该val为原来未改变顺序前的序号 *
		 * 先取出原来的列的位置，也就是val，然后看有没有在该位置前的列 * 被移动到后面去，如果被移动，则要把val减1，移动了几个就减几个
		 **********************************************************************/
		var oldindex = -1;// 新取到的列的原来的列的位置
		var newindex = -1;// 移动上一列后，新取到的列的绝对位置
		var me = this;//
		var pren = [];// 存储已经被取过的原来的列号
		var checked = false;// checkbox的值
		var colwidth = "";// 列的宽度
		var $input;
		var colcount = $('tr', this.$nDiv).size();// 列数
		$('tr', this.$nDiv).each(function(i) {
			$input = $('input', this);
			colwidth = $(this).attr("colwidth");
			oldindex = parseInt($input.val());
			// alert('oldindex'+oldindex)
			checked = $input.attr("checked");
			// 计算小于oldindex的列号被取出了几个
			var count = 0;
			for (var n = 0, l = pren.length; n < l; n++) {
				if (oldindex > pren[n]) {
					count++;
				}
			}
			// 将oldindex放入pren数组中
			pren.push(oldindex);
			// 计算新的index，将该index的列放在最后一个
			newindex = oldindex - count;
			// if(me.p.selectType){
			// newindex+=1;
			// }
			// alert(newindex);
			// 调整表体的列
			$('.bDiv tr', me.$grid).each(function() {
				// 取得新的列
				var $otd = $('td:eq(' + newindex + ')', this);
				// 如果隐藏
				if (!checked) {
					$otd.hide();
				}
				// 改变列宽
				if (colwidth && colwidth != "") {
					$("div", $otd).width(colwidth);
				}
				if (colcount != newindex) {// 新列恰好是最后一列就不移动，否则移动到最后一个
					$('td:last', this).after($otd);
				}
			});

		});
		// 行click事件
		$('.bDiv tr', me.$grid).each(function(i) {
			// 双行的有erow样式
			if (i % 2 == 1) {
				$(this).data("oldClass", "erow");
				$(this).addClass("erow");
			}
			$(this).click(function() {
				me.setRowToSelect($(this), !$(this).hasClass("trSelected"));
				// if (!$(this).hasClass(
				// "trSelected")) {
				// alert("//单选")
				// // 选择
				// if (me.p.selectType
				// && me.p.selectType == 'single') {
				// // 单选
				// $(this)
				// .siblings()
				// .removeClass(
				// "trSelected");
				// $(this).addClass(
				// "trSelected");
				// } else if (me.p.selectType) {
				// // 多选
				// $(this).addClass(
				// "trSelected");
				// if (me.getSelectedRow()
				// .size() == me
				// .getAllRow()
				// .size()) {
				// $(
				// '.hDiv table tr',
				// me.$grid)
				// .addClass(
				// "trSelected");
				// }
				// }
				// } else {
				// if (me.p.selectType) {
				// $(this).removeClass(
				// "trSelected");
				// if (me.p.selectType == 'multiple'
				// && me
				// .getSelectedRow()
				// .size() != me
				// .getAllRow()
				// .size()) {
				// $(
				// '.hDiv table tr',
				// me.$grid)
				// .removeClass(
				// "trSelected");
				// }
				// }
				// }
				// if (me.p.callback.rowclick) {
				// me.p.callback
				// .rowclick(
				// me,
				// this,
				// i,
				// $(this)
				// .hasClass(
				// "trSelected"));
				// }
			}).hover(function() {
				$(this).addClass("trOver");
			}, function() {
				$(this).removeClass("trOver");
			});
		});
	},
	setHdiv : function() {// 根据表头信息，设置列线及显示和隐藏列的div及table
		var me = this;
		var $hdiv = $('.hDiv table tr th', this.$grid);
		$hdiv
				.each(// 在表头的div中有了thead
				function(i) {
					// 添加表头的checkbox的click事件
					if (me.p.selectType && i == 0) {
						$('div input', this).click(function() {
							var checkflag = $(this).prop('checked');
							me.getAllRow().each(function() {
								me.setRowToSelect($(this), checkflag);
							});
						});
						return;
					}
					// 添加$nDiv的tr
					$('TABLE TBODY', me.$nDiv)
							.append(
									"<TR><TD class=\"ndcol1\"><INPUT class=\"togCol\" value=\""
											+ i
											+ "\" CHECKED type=\"checkbox\"></TD><TD class=\"ndcol2\">"
											+ $('div', this).text()
											+ "</TD></TR>");
					// 表头的div里嵌一个span，排序用
					if (me.sort) {
						var $thisdiv = $('div', this);
						var oldtext = $thisdiv.text();
						$thisdiv.empty().append("<span>" + oldtext + "</span>");
					}
					// 允许动画操作
					if (me.p.animate) {
						// 计算该列的最右边位置
						var thisleft = $(this).offset().left;
						var thiswidth = $(this).width();
						var ll = thisleft + thiswidth;

						// 创建列线
						me.colLineCreate(ll);
						// 该列的相关事件
						$(this)
								.mousedown(// mousedown事件
								function(e) {
									me.dragStart('colMove', e, this);
								})
								.hover(
										function() {// mouseover事件
											if (me.colCopy) {// 如果正在进行列交换
												// 找到该列的index
												var n = $('.hDiv table tr th',
														me.$grid).index(
														this);
												me.dcolt = n;// 设置被交换列的index
												// 该列的index小于主动交换列的index
												if (n < me.dcoln) {
													// 放左方向箭头在该表头上
													// $('div',
													// this).append(me.$cdropleft);
													$('div', this).addClass(
															"cdropleft");
												} else if (n > me.dcoln) {
													// 该列的index大于主动交换列的index
													// 放右方向箭头在该表头上
													$('div', this).addClass(
															"cdropright");
												} else {
													return;
												}
											} else if (!me.colresize) {// 如果不是正在进行列宽度的调整
												// 计算该列的最右边位置
												thisleft = $('div', this)
														.offset().left;
												thiswidth = $('div', this)
														.width();
												ll = thisleft + thiswidth;
												// 隐藏$nBtn，$nDiv
												me.hideColTip();
												// $nBtn能在可视范围内出现
												if (ll < (me.width + me.left - 15)
														&& ll - 15 > me.left)
													me.$nBtn.css('left',
															ll - 15).show();
												// if(p.showcheckbox)
												// nv-=1;
											}
										},
										function() {// mouseout事件
											// 正在列交换
											if (me.colCopy) {
												// 移除左右箭头
												$('div', this).removeClass(
														"cdropleft")
														.removeClass(
																"cdropright");
												// me.$cdropleft.remove();
												// me.$cdropright.remove();
												// 目标交换列index为空
												me.dcolt = null;
											}
										}).click(
										function() {
											if (!me.sort
													|| this.sort === 'false') {
												return;
											}
											var thisspan = $('div span', this);
											var hasdesc = thisspan
													.hasClass('sdesc');
											// 清除所有排序样式,实际上也只有一个
											$('.hDiv table tr th div span',
													this.$grid)
													.removeClass('sasc')
													.removeClass('sdesc');
											if (this.name == me.sortname) {// 点击了刚刚排序过的字段
												if (hasdesc) {
													me.sortorder = 'asc';
													$('div span', this)
															.addClass('sasc');
												} else {
													me.sortorder = 'desc';
													$('div span', this)
															.addClass('sdesc');
												}
											} else {// 顺排序
												$('div span', this).addClass(
														'sasc');
												me.sortname = this.name;
												me.sortorder = 'asc';
											}
											me.load();
										});
					}
				});
		$('td.ndcol2', me.$nDiv).click(// 名称的点击事件，显示或隐藏列
		function() {
			// 取得checkbox值
			var inputCheck = $(this).prev().find('input');
			var chkVal = inputCheck.attr("checked");
			// 可视列只有两个且再次要求隐藏列，则返回
			if ($('input:checked', me.$nDiv).length <= 2 && chkVal) {
				return false;
			}
			// 触发checkbox的click事件
			inputCheck.trigger('click', [ true ]);
		});
		$('input.togCol', me.$nDiv).click(
				// checkbox的点击事件，显示或隐藏列
				// tf为触发标示，如果为其他地方trigger方法调用，则为true
				function(e, tf) {
					// chkVal为该checkbox的值，若为触发过来的事件则直接用该值，
					// 若是点击触发的事件，则取反
					var chkVal = tf ? this.checked : !this.checked;
					// 可视列只有两个且再次要求隐藏列，则返回
					// length小小于1，因为点击触发的事件，执行到这里后，其值已经被改变了
					// 若返回false，则其值会恢复回去
					if ($('input:checked', me.$nDiv).length <= 1 && chkVal)
						return false;
					// $nBtn隐藏
					me.$nBtn.hide();
					// 找到该checkbox的所在的tr，然后找到该tr所在的index
					var itr = $(this).parent().parent().parent().find('tr')
							.index($(this).parent().parent()[0]);
					if (me.p.selectType)
						itr += 1;
					// 隐藏或显示列
					me.toggleCol(itr, !chkVal);
				});
		// $nDiv的tr的hover
		$('tr', this.$nDiv).hover(function() {
			$(this).addClass('ndcolover');
		}, function() {
			$(this).removeClass('ndcolover');
		});
		// var pdh = $(".pDiv", this.$grid).height() + 1;// 分页栏高度
		var bdh = $(".bDiv", this.$grid).height() + 1;// 表体高度
		if (me.$nDiv.height() > (this.pdh + bdh)) {
			me.$nDiv.height(this.pdh + bdh);
			var owidth = me.$nDiv.width();
			me.$nDiv.width(owidth + 35);
		}
		this.ndivHeight = 26 * $hdiv.size() + 4;
	},
	toggleCol : function(i, visible) {// 显示和隐藏列
		$(".hDiv tr", this.$grid).each(// 显示或隐藏表头列
		function() {
			if (visible)// 显示列
				$('th:eq(' + i + ')', this).show();
			else
				// 隐藏列
				$('th:eq(' + i + ')', this).hide();
		});
		$(".bDiv tr", this.$grid).each(// 显示或隐藏表体列
		function() {
			if (visible)
				$('td:eq(' + i + ')', this).show();
			else
				$('td:eq(' + i + ')', this).hide();
		});
		// 调整表体及表头位置
		$(".hDiv", this.$grid).css("marginLeft",
				$(".bDiv", this.$grid).attr("scrollLeft") * (-1));
		this.showhideCline();// 隐藏或显示列线
	},
	resize : function(biggerflag) {// 调整grid高度和宽度,biggerflag为true时,只变大，不变小
		var fixwidth, // 调整后的宽度
		fixbdivheight, // 表体div调整后的高度
		pw, // grid父节点的宽度
		ph, // grid父节点的高度
		mgleft = 0, // 父节点为body时，marginleft
		mgright = 0, // 父节点为body时，marginright
		mgtop = 0, // 父节点为body时，margintop
		mgbottom = 0; // 父节点为body时，marginbottom
		// ffajust = $.browser.mozilla ? 2 : 0; // 浏览器为ff时，调节值为2
		if (this.$grid.parent()[0].tagName == 'BODY') {
			pw = window.document.documentElement.clientWidth;// grid父节点的宽度
			ph = window.document.documentElement.clientHeight;// grid父节点的高度
			// cw: document.documentElement.clientWidth,
			// ch: document.documentElement.clientHeight
			mgleft = $('body').attr('leftMargin');// marginleft
			mgleft = !mgleft ? mgleft = 8 : mgleft == 'auto' ? 0 : mgleft;
			mgright = $('body').attr('rightMargin');// marginright
			mgright = !mgright ? mgright = 8 : mgright == 'auto' ? 0 : mgright;
			mgtop = $('body').attr('topMargin');// margintop
			mgtop = !mgtop ? mgtop = 9 : mgtop == 'auto' ? 0 : mgtop;
			mgbottom = $('body').attr('bottomMargin');// marginbottom
			mgbottom = !mgbottom ? mgbottom = 9 : mgbottom == 'auto' ? 0
					: mgbottom;
		} else {
			pw = this.$grid.parent().width();// grid父节点的宽度
			ph = this.$grid.parent().height();// grid父节点的高度
			mgleft = parseInt(this.$grid.parent().css('paddingLeft'));
			mgright = parseInt(this.$grid.parent().css('paddingRight'));
			mgtop = parseInt(this.$grid.parent().css('paddingTop'));
			mgbottom = parseInt(this.$grid.parent().css('paddingBottom'));
		}
		fixwidth = pw - mgleft - mgright + 2;// 调整后的宽度
		fixbdivheight = ph - mgtop - mgbottom - this.tdh - this.hdh - this.pdh
				- 2;// 表体div调整后的高度
		var oldwidth = this.$grid.width();
		var oldheight = $(".bDiv", this.$grid).height();
		// 当设置为不能改变大小时，父节点变大则变大，否则不变
		if (!biggerflag || (biggerflag && oldwidth < fixwidth)) {
			// alert("fixwidth"+fixwidth);
			this.$grid.width(fixwidth);// 设置grid宽度
			$(".bDiv", this.$grid).width(fixwidth);// 设置表体宽
			this.width = fixwidth;// 调整后的宽度
		}
		if (!biggerflag || (biggerflag && oldheight < fixbdivheight)) {
			this.$grid.height(ph - 2);
			$(".bDiv", this.$grid).height(fixbdivheight);// 设置表体高
			this.fixbdivheight = fixbdivheight;// 调节后的表体的高度
		}
		this.showhideCline();
		this.fixClHeight();
		this.fixnDiv();
		// 表头和表体保持一致
		$(".hDiv", this.$grid).css("marginLeft",
				$(".bDiv", this.$grid).scrollLeft() * (-1));
	},
	fixnDiv : function() {// 调整nDiv高度及宽度
		// var pdh = $(".pDiv", this.$grid).height() + 1;// 分页栏高度
		var bdh = $(".bDiv", this.$grid).height() + 1;// 表体高度
		if ((this.pdh + bdh) < this.ndivHeight) {// 高度超过表体和分页栏总和
			this.$nDiv.height(this.pdh + bdh);
			if (!this.nDivwFlag) {// 宽度被调整过了，就不用了，否则调整
				this.nDivwFlag = true;
				var owidth = this.$nDiv.width();
				this.$nDiv.width(owidth + 35);
			}
		} else {// 去掉高度宽度设置
			this.nDivwFlag = false;
			this.$nDiv.css('height', '');
			this.$nDiv.css('width', '');
		}
	},
	colLineCreate : function(ll) {// 创建列线，ll为left属性值
		var me = this;
		var dragDiv = $("<DIV class=\"cLine\">&nbsp;</DIV>").mousedown(
				function(e) {
					me.dragStart('colresize', e, this);
				});
		ll -= 1;
		dragDiv.css({
			'top' : me.hDivTop + 'px',
			'height' : (me.fixbdivheight + me.hdh) + 'px',
			'left' : (ll) + 'px'
		});
		// 如果ll大于grid的最右边值，则隐藏
		if (ll > (me.width + me.left)) {
			dragDiv.hide();
		}
		this.$grid.append(dragDiv);
	},
	fixClHeight : function() {// 调整grid列线高度
		var me = this;
		$('.cLine', this.$grid).each(function() {
			$(this).height(me.fixbdivheight + me.hdh - 4);
		});
	},
	showhideCline : function() {// 调整grid列线显示隐藏
		var me = this;
		var checkbox = 0;
		if (this.p.selectType) {
			checkbox = 1;
		}
		var $visTh = $(".hDiv table tr th:visible div", this.$grid);
		$visTh.each(function(i) {
			var n = 0;
			if (checkbox) {// 有checkbox
				if (i == 0) {
					return;
				} else {
					n = i - 1;
				}
			} else {
				n = i;
			}
			var thisleft = $(this).offset().left;
			var thiswidth = $(this).width();
			var $dragDiv = $('.cLine:eq(' + n + ')', me.$grid);
			var ll = thisleft + thiswidth - 3;// 计算表头中div的最右边
			// 列线不在可视范围内，则隐藏
			if (ll >= (me.width + me.left) || ll <= me.left) {
				$dragDiv.hide();
			} else {
				// 在可视范围内，显示
				$dragDiv.show();
				$dragDiv.css({
					'left' : (ll) + 'px'
				});
			}
		});
		// 多余的列线隐藏
		$('.cLine:gt(' + ($visTh.size() - 1 - checkbox) + ')', this.$grid)
				.hide();
	},
	dragStart : function(dragtype, e, obj) { // 开始拖动
		var me = this;
		this.hideColTip();// 隐藏表头上的显隐列的按钮和装载显隐列的div
		if (dragtype == 'colresize') {// 开始拖动列线
			var n = $('.cLine', this.$grid).index(obj);// 找到列的index
			$(obj).addClass('clDragging');// 线样式
			$(obj).prev('.cLine:visible').addClass('clDragging');// 显示其前一个兄弟列线
			this.colresize = {
				startX : e.clientX,
				ol : parseInt(obj.style.left),
				n : n
			};// 设置colresize
			$('body').css('cursor', 'col-resize');// 设置鼠标状态
		} else if (dragtype == 'colMove') {// 交换列
			this.dcol = obj;// 主动交换列的列头对象
			this.dcoln = $('.hDiv table tr th', this.$grid).index(obj);// 主动交换列的index
			this.colCopy = document.createElement("div");// 创建被拖动的列的div
			this.colCopy.className = "colCopy";// 样式与要移动的列样式一致
			this.colCopy.innerHTML = obj.innerHTML;// 内容与要移动的列内容一致
			$(this.colCopy).css({
				position : 'absolute',
				display : 'none',
				textAlign : 'center'
			});// 设置拖动的列的div的样式
			$('body').append(this.colCopy);
			$('.cLine', this.$grid).hide();// 隐藏列线的div
		}
		$(document).mousemove(function(e) {
			me.dragMove(e);
		}).mouseup(function(e) {
			me.dragEnd(e);
		});
		$('body').noSelect();// 拖动时，不让选择页面上的文本
	},
	dragMove : function(e) {
		if (this.colresize) {// 改变列宽度
			var n = this.colresize.n;// 被改变列的index
			var diff = e.clientX - this.colresize.startX;// 鼠标的位置与起始位置的横向距离
			var nleft = this.colresize.ol + diff;// 确定新的列线的left位置
			$('div.cLine:eq(' + n + ')', this.$grid).css('left', nleft);// 改变列线的left位置
		} else if (this.colCopy) {// 交换列
			$(this.colCopy).css({
				top : e.clientY + 10,
				left : e.clientX + 20,
				display : 'block'
			});// 让被移动的物体与鼠标保持一定距离，这样才会触发mouseover事件
		}
	},
	dragEnd : function(e) {
		if (this.colresize) {// 改变列宽度
			var n = this.colresize.n;// 被改变列的index
			if (this.p.selectType) {
				n += 1;
			}
			var $odiv = $('.hDiv th:visible div:eq(' + n + ')', this.$grid);
			var ow = $odiv.width();// 取得需要改变宽度的列的原始宽度
			// 取得该列的包括隐藏列在内的索引，真正索引
			var realn = $('.hDiv th', this.$grid).index($odiv.parent()[0]);
			if (this.p.selectType) {
				realn -= 1;
			}
			var diff = e.clientX - this.colresize.startX;// 鼠标的位置与起始位置的横向距离
			var nw = ow + diff;// 新宽度
			$('.hDiv th:visible div:eq(' + n + ')', this.$grid).width(nw);// 设置新的列的头的宽度
			$('.bDiv tr', this.$grid).each(function() {
				$('td:visible div:eq(' + n + ')', this).css('width', nw);// 设置新的列的body的宽度
			});
			// 表头表体一致
			$(".hDiv", this.$grid).css("marginLeft",
					$(".bDiv", this.$grid).attr("scrollLeft") * (-1));
			$('.clDragging', this.$grid).removeClass('clDragging');// 移除dragging样式
			// 设置$nDiv相应tr的colwidth，以备reload时，调整表体用到
			$('tr:eq(' + (realn) + ')', this.$nDiv).attr("colwidth", nw);
		//	$(".bDiv", this.$grid)[0].scrollLeft=$(".bDiv", this.$grid)[0].scrollLeft+1;
			$(".bDiv", this.$grid).scroll();
			this.colresize = null;
			//改变列宽后有可能表体滚动条消失，表头要矫正为正常位置
//			if($(".bDiv", this.$grid)[0].scrollLeft==0){
//				$(".hDiv", this.$grid).css("marginLeft",0);
//			}
		} else if (this.colCopy) {// 交换列
			$(this.colCopy).remove();// 移除移动的列的div
			if (this.dcolt != null && this.dcoln != this.dcolt) {// dcolt为被动交换列的index，在该列mouseover事件里被设置值的
				if (this.dcoln > this.dcolt) {// 前后顺序不同，放置方法不一样
					$('th:eq(' + this.dcolt + ') div', this.$grid)
							.removeClass("cdropleft");// 移除指向左边的三角形
					$('.hDiv th:eq(' + this.dcolt + ')', this.$grid)
							.before(this.dcol);
				} else {
					$('th:eq(' + this.dcolt + ') div', this.$grid)
							.removeClass("cdropright");// 移除指向右边的三角形
					$('.hDiv th:eq(' + this.dcolt + ')', this.$grid)
							.after(this.dcol);
				}
				this.switchCol(this.dcoln, this.dcolt);// gird表体交换列
			}
			this.dcol = null;// 交换动作完成，置空参数
			this.dcoln = null;
			this.dcolt = null;
			this.colCopy = null;
		}
		this.showhideCline();// 显示装载列线的div
		$(document).unbind("mousemove").unbind("mouseup");
		$('body').css('cursor', 'default');
		$('body').noSelect(false);
	},
	switchCol : function(cdrag, cdrop) {// gird表体交换列
		$('.bDiv tr', this.$grid).each(
				function() {
					if (cdrag > cdrop)
						$('td:eq(' + cdrop + ')', this).before(
								$('td:eq(' + cdrag + ')', this));
					else
						$('td:eq(' + cdrop + ')', this).after(
								$('td:eq(' + cdrag + ')', this));
				});
		if (cdrag > cdrop) {// 找到显隐列的div里交换相应列
			if (this.p.selectType)
				$('tr:eq(' + (cdrop - 1) + ')', this.$nDiv).before(
						$('tr:eq(' + (cdrag - 1) + ')', this.$nDiv));
			else
				$('tr:eq(' + cdrop + ')', this.$nDiv).before(
						$('tr:eq(' + cdrag + ')', this.$nDiv));
		} else {
			if (this.p.selectType)
				$('tr:eq(' + (cdrop - 1) + ')', this.$nDiv).after(
						$('tr:eq(' + (cdrag - 1) + ')', this.$nDiv));
			else
				$('tr:eq(' + cdrop + ')', this.$nDiv).after(
						$('tr:eq(' + cdrag + ')', this.$nDiv));
		}
		// 表头表体位置调整
		$(".hDiv", this.$grid).css("marginLeft",
				$(".bDiv", this.$grid).attr("scrollLeft") * (-1));
		// 显示隐藏列线
		this.showhideCline();
		/*
		 * if (cdrag>cdrop){//找到显隐列的div里交换相应列 if(p.showcheckbox)
		 * $('tr:eq('+(cdrop-1)+')',this.nDiv).before($('tr:eq('+(cdrag-1)+')',this.nDiv));
		 * else
		 * $('tr:eq('+cdrop+')',this.nDiv).before($('tr:eq('+cdrag+')',this.nDiv));
		 * }else{ if(p.showcheckbox)
		 * $('tr:eq('+(cdrop-1)+')',this.nDiv).after($('tr:eq('+(cdrag-1)+')',this.nDiv));
		 * else
		 * $('tr:eq('+cdrop+')',this.nDiv).before($('tr:eq('+cdrag+')',this.nDiv)); }
		 * this.hDiv.scrollLeft = this.bDiv.scrollLeft;
		 * //if(this.ti==cdrag)//如果交换列中有已排序列，交换已排序列的列号 // this.ti=cdrop; // else
		 * if(this.ti==cdrop) // this.ti=cdrag; }
		 */
	},
	getSelectedRow : function() {// 得到选择的行，返回一个tr数组的jquery对象
		return $(".bDiv tr.trSelected", this.$grid);
	},
	getAllRow : function() {
		return $(".bDiv tr", this.$grid);
	},
	getSelectedRowids : function() {// 得到选择的行id
		var me = this;
		var ids = '';
		var j = 0;
		$(".bDiv tr", this.$grid).each(function(i) {
			if ($(this).hasClass("trSelected")) {
				if (j > 0) {
					ids = ids + ',';
				}
				ids = ids + me.gridjsondata[i]['id'];
				j++;
			}
		});
		return ids;
	},
	getOneSelectedRowid : function() {// 得到选择的行id,一条数据
		var me = this;
		var id = '';
		var j = 0;
		$(".bDiv tr", this.$grid).each(function(i) {
			if ($(this).hasClass("trSelected")) {
				id = me.gridjsondata[i]['id'];
				j++;
			}
		});
		if (j > 1)
			return false;
		return id;
	},
	getSelectedRowdata : function() {// 得到选择的行数据
		var me = this;
		var data = [];
		$(".bDiv tr", this.$grid).each(function(i) {
			if ($(this).hasClass("trSelected")) {
				data.push(me.gridjsondata[i]);
			}
		});
		return data;
	},
	getRowdataByRowNumber : function(rownumber) {// 得到指定的行数据
		return this.gridjsondata[rownumber];
	},
	getRowColumnNameData : function(rownumber, columnName) {// 得到指定的行列名数据
		return this.gridjsondata[rownumber][columnName];
	},
	setGridJsondata : function() {// 设置所有的数据
		var me = this;
		var allrow = this.getAllRow();
		me.gridjsondata = [];
		allrow.each(function() {
			var rowdata = me.getRowdata($(this));
			me.gridjsondata.push(rowdata);
		});
	},
	getRowdata : function($row) {// 得到行的数据
		var dataVal=$('input[type=hidden]', $row).val();
		dataVal=dataVal.replace(new RegExp(/(\n)/g),'\\n');
		eval("var rowdata=" + dataVal);
		return rowdata;
	},
	getGridJsondata : function() {// 得到所有数据
		return this.gridjsondata;
	},
	getRowByRowNumber : function(rownumber) {// 得到指定的行tr，返回jquery对象
		return $(".bDiv tr:eq(" + rownumber + ")", this.$grid);
	},
	setAllRowToUnSelect : function() {
		$(".bDiv tr.trSelected", this.$grid).each(function(i) {
			var oldClass = $(this).data("oldClass");
			$(this).removeClass("trSelected").addClass(oldClass);
		});
		$('.hDiv table tr', this.$grid).removeClass("trSelected");
	},
	setRowToSelect : function($row, flag) {// 将指定的行设为选择状态,或者取消选择状态
		if (flag) {// 设定目标为选择状态
			if (this.p.selectType && this.p.selectType == 'single') {
				// 单选
				// 取消其他行的选择状态
				var oldSelected = $row.siblings(".trSelected");
				if (oldSelected.size() > 0) {
					var oldClass = oldSelected.data("oldClass");
					oldSelected.removeClass("trSelected").addClass(oldClass);
					// 取消其他行checkbox
					$("td", oldSelected).first().find("div input").prop(
							"checked", false);
				}
				// 选择当前行
				$row.removeClass("erow").addClass("trSelected");
				// 选择当前行的checkbox
				$("td", $row).first().find("div input").prop("checked", true);
			} else if (this.p.selectType) {
				$row.removeClass("erow").addClass("trSelected");
				// 选择当前行的checkbox
				$("td", $row).first().find("div input").prop("checked", true);
				// 如果全部被选择了，则表头的checkbox要被选择
				if (this.getSelectedRow().size() == this.getAllRow().size()) {
					$('.hDiv table tr', this.$grid).addClass("trSelected");
					// 选择表头的checkbox
					$('.hDiv table tr', this.$grid).find('th').first()
							.find("div input").prop("checked", true);
				}
			}
		} else {
			if (this.p.selectType) {
				var oldClass = $row.data("oldClass");
				$row.removeClass("trSelected").addClass(oldClass);
				// 取消当前上的checkbox的选择
				$("td", $row).first().find("div input").prop("checked", false);
				if (this.p.selectType == 'multiple') {
					$('.hDiv table tr', this.$grid).removeClass(
							"trSelected");
					// 取消表头上的checkbox的选择
					$('.hDiv table tr', this.$grid).find('th').first()
							.find("div input").prop("checked", false);
				}
			}
		}
		if (this.p.callback.rowselect) {
			this.p.callback.rowselect(this, $row, flag);
		}
	}
};