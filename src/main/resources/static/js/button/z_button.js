/*******************************************************************************
* button
******************************************************************************/
;(function($) {

  // ui对象
  $.ui = $.ui || {};
  
  $.ui.button = function(config) {
    this.init(config);
  };
  
  $.ui.button.prototype = {
  		/*
  	var config = {
	    containerDiv:containerDiv,//创建button容器
	  	buttons:buttons
	  	[
	  	{
	  		title:"",//button显示文字
	  		iconClass:"",//左边图标
	  		disabled:false,//是否为不可点击状态
	  		clickFun:clickFun//点击后事件
	  	}
	  	]
	  	
  	};*/
    // 默认设置
  defaults :
    {
   	position:"center"//button显示位置，left center right
    },
    // 初始化
  init :
    function(config) {
      // 继承初始参数
      config = $.extend({}, $.ui.button.prototype.defaults, config);
      this.config = config;

      var me = this;
	   	me.$button = typeof me.config.containerDiv == "string" ? $("#"
			+ me.config.containerDiv) : me.config.containerDiv;
			var $panel= me.config.position == "center" ? $("<table cellspacing=\"0\"  style=\"width:100%\" class=\"x-panel-btns\"></table>")
			: $("<table cellspacing=\"0\"  class=\"x-panel-btns\"></table>");
			var $paneltr=$("<tr></tr>");
			var $btnTdLeft1=$("<td class=\"x-toolbar-left\" align=\"center\"></td>");
			var $btnTtLeft1=$("	<table cellspacing=\"0\"></table>");
			var $btnTrLeft1=$("	<tr class=\"x-toolbar-left-row\"></tr>");
		
			
			/*$paneltr.append("<td class=\"x-toolbar-left\" align=\"left\">"+
     									"	<table cellspacing=\"0\">"+
     										"	<tbody>"+
     											"	<tr class=\"x-toolbar-left-row\"></tr>"+
     											"</tbody>"+
     										"</table>"+
     									"</td>");*/
			var $btnTdRight=$("<td class=\"x-toolbar-right\" align=\"right\"></td>");
			var $btnTb1=$("<table cellspacing=\"0\" class=\"x-toolbar-right-ct\"></table>");
					
			var $btnTr1=$("<tr></tr>");
     	var $btnTd1=$("<td></td>");
     	var $btnTb2=$("<table cellspacing=\"0\"></table>");
     	var $btnTr2=$("<tr class=\"x-toolbar-right-row\"></tr>");
     	var bl=me.config.buttons.length;
     	var $finalbtnTd;
     	for(var i=0;i<bl;i++){
     		(function(i){
	     		$finalbtnTd=$("<td class=\"x-toolbar-cell\">"+
												"<table  cellspacing=\"0\" class=\"x-btn   x-btn-noicon \" style=\"width: 75px;\">"+
													"<tbody class=\"x-btn-small x-btn-icon-small-left\">"+
														"<tr>"+
															"<td class=\"x-btn-tl\"><i>&nbsp;</i></td>"+
															"<td class=\"x-btn-tc\"></td>"+
															"<td class=\"x-btn-tr\"><i>&nbsp;</i></td>"+
														"</tr>"+
														"<tr>"+
															"<td class=\"x-btn-ml\"><i>&nbsp;</i></td>"+
															"<td class=\"x-btn-mc\"><em class=\"\" unselectable=\"on\"><button type=\"button\"   class=\" x-btn-text\">"+me.config.buttons[i].title+"</button></em></td>"+
															"<td class=\"x-btn-mr\"><i>&nbsp;</i></td>"+
														"</tr>"+
														"<tr>"+
															"<td class=\"x-btn-bl\"><i>&nbsp;</i></td>"+
															"<td class=\"x-btn-bc\"></td><td class=\"x-btn-br\"><i>&nbsp;</i></td>"+
														"</tr>"+
													"</tbody>"+
												"</table>"+
											"</td>");
					$finalbtnTd.mouseover(function(e){
						$(this).addClass("x-btn-over");
					}).mouseout(function(e){
						$(this).removeClass("x-btn-over");
						$(this).removeClass("x-btn-click");
					}).mousedown(function(e){
						$(this).addClass("x-btn-click");
					}).click(function(e){
						me.config.buttons[i].clickFun();
						$(this).removeClass("x-btn-click");
					});
					if(me.config.position == "right"){
						$btnTr2.append($finalbtnTd);
					}else{
						$btnTrLeft1.append($finalbtnTd);
					}
				})(i);
     	}

     	
			$btnTtLeft1.append($btnTrLeft1);
			$btnTdLeft1.append($btnTtLeft1);
			$btnTb2.append($btnTr2);
			$btnTd1.append($btnTb2);
			$btnTr1.append($btnTd1);
			$btnTb1.append($btnTr1);
			$btnTdRight.append($btnTb1);
			$paneltr.append($btnTdLeft1);
			$paneltr.append($btnTdRight);
	  	$panel.append($paneltr);
	  	me.$button.append($panel);
	  	
		}
	}

})(jQuery);
