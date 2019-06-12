/*
 * ModuleName: 轮播图组件
 * Author: qyingkou@163.com
 * Date: 20190612
 */

(function(_) {
	"use strick";
	var window = _,
		document = _.document,
		$ = _.jQuery;

	/*
	 * =============================
	 * 类
	 * =============================
	 */
	var Marquee = function(option) {
		if (typeof option !== "object") option = {};
		var _option = {
			autoplay: 0, // 自动播放时间（秒）
			pointer: true // 指示器
		};
		// 配置信息
		this.option = $.extend(true, {}, _option, option);
		// 数据信息
		this.data = {
			list: [], // 图片路径列表
			index: 0 // 指示器序号
		};
	};
	Marquee.prototype = {
		constructor: Marquee,
		/* 获取DOM中的原始数据 */
		getTplData: function(context) {
			var list = $(context).find("img"),
				that = this;
			list.each(function(i) {
				window.Array.prototype.push.call(
					that.data.list,
					$(list[i]).attr("data-src")
				);
			});
		},

		/* 构建界面 */
		buildUI: function(context) {
			var that = this;
			// 主结构
			var htmlstr_outline = [
				'<div class="arrow j-arrow">',
				'<div class="arrow_left" /></div>',
				'<div class="arrow_right" /></div>',
				"</div>",
				'<div class="pointer j-pointer">',
				'<ul class="pointer_list"></ul>',
				"</div>",
				'<div class="sliders j-sliders"></div>'
			];
			var node_slide = document.createElement("div");
			node_slide.className = "slide j-slide";
			node_slide.innerHTML = htmlstr_outline.join("");

			// 分支结构 - 指示器
			that.option.pointer &&
				(node_slide.getElementsByClassName(
					"j-pointer"
				)[0].innerHTML = (function() {
					var htmlstr_point_lis = [
						'<li class="pointer_li z-active"></li>',
						'<li class="pointer_li"></li>'
					];
					return that.data.list
						.map(function(path, index) {
							return index === 0 ? htmlstr_point_lis[0] : htmlstr_point_lis[1];
						})
						.join("");
				})());

			// 分支结构 - 幻灯片
			node_slide.getElementsByClassName(
				"j-sliders"
			)[0].innerHTML = (function() {
				return that.data.list
					.map(function(path, index) {
						var htmlstr_slider = [
							'<div class="slider">',
							'<img src="' + path + '">',
							"</div>"
						];
						return htmlstr_slider.join("");
					})
					.join("");
			})();
			$(node_slide.getElementsByClassName("j-sliders")[0]).css({
				width: that.data.list.length * 100 + "%",
				transform: "translateX(0%)"
			});
			$(node_slide.getElementsByClassName("j-sliders")[0])
				.find(".slider")
				.each(function(i) {
					$(this).css({
						width: (1 / that.data.list.length) * 100 + "%"
					});
				});
			// 渲染节点
			this.render(node_slide, context);
		},

		/* 渲染 */
		render: function(htmlNode, context) {
			var ctx = context || document.body;
			$(ctx)
				.empty()
				.append(htmlNode);
		},
		/* 图片翻页 */
		setPage: function(command) {
			var commands = ["next", "prev"],
				data = this.data;

			if (commands.indexOf(command) === -1) return;
			// 修改数据
			switch (command) {
				case "next":
					data.index = data.index === data.list.length - 1 ? 0 : ++data.index;
					break;
				case "prev":
					data.index = data.index === 0 ? data.list.length - 1 : --data.index;
					break;
			}
			// 更新dom-幻灯片槽移动
			$(".j-sliders").css({
				transform:
					"translateX(-" + (1 / data.list.length) * data.index * 100 + "%)"
			});
			// 更新dom-指示器变焦
			$(".j-pointer .pointer_li")
				.removeClass("z-active")
				.eq(data.index)
				.addClass("z-active");
		},
		/* 各种钩子 */
		componentDidMount: function() {
			var that = this;
			$(".j-arrow").click(function(e) {
				if (e.target.className === "arrow_left") that.setPage("prev");
				if (e.target.className === "arrow_right") that.setPage("next");
			});
		},
		onsliderClick: function(callback) {
			callback();
		}
	};

	/*
	 * =============================
	 * 接口
	 * =============================
	 */
	$.fn.extend({
		marquee: function(option) {
			var instance = new Marquee(option);

			instance.getTplData(this);
			instance.buildUI(this);
			instance.componentDidMount();

			return instance;
		}
	});
	// $.fn.marquee.constructor = Marquee;
})(window);
