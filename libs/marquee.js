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
		// 实例的配置信息
		this.option = $.extend(true, {}, _option, option);
		// 实例的数据信息
		this.data = {
			list: [], // 图片路径列表
			index: 0 // 指示器序号
		};
		// 实例的订阅列表
		this.subscriber = {};
		// 实例的dom节点
		this.node = null;
		// 实例的计数器
		this.timer = {};
	};
	Marquee.prototype = {
		constructor: Marquee,
		/* 获取DOM模板中的原始数据 */
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
							return index === 0
								? '<li data-value=0 class="pointer_li z-active"></li>'
								: "<li data-value=" + index + ' class="pointer_li"></li>';
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
			this.node = htmlNode;
		},
		/* 图片翻页 */
		setPage: function(offset) {
			var data = this.data;
			if (typeof offset !== "number") return;

			// 修改数据
			if (data.index + offset < 0) {
				data.index = data.list.length - 1;
			} else if (data.index + offset > data.list.length - 1) {
				data.index = 0;
			} else {
				data.index = data.index + offset;
			}
			// 更新dom-幻灯片槽移动
			$(this.node)
				.find(".j-sliders")
				.css({
					transform:
						"translateX(-" + (1 / data.list.length) * data.index * 100 + "%)"
				});
			// 更新dom-指示器变焦
			$(this.node)
				.find(".j-pointer .pointer_li")
				.removeClass("z-active")
				.eq(data.index)
				.addClass("z-active");
		},
		/* 各种钩子 */
		componentDidMount: function(context) {
			var that = this,
			data = that.data;

			$(this.node)
				.find(".j-arrow")
				.click(function(e) {
					if (e.target.className === "arrow_left") that.setPage(-1);
					if (e.target.className === "arrow_right") that.setPage(1);
				});
			that.option.pointer &&
				$(this.node)
					.find(".j-pointer")
					.click(function(e) {
						if (!$(e.target).hasClass("pointer_li")) return;
						var value = $(e.target).attr("data-value");
						that.setPage(value - data.index);
					});
			data.list.length > 0 &&
				$(this.node)
					.find(".j-sliders")
					.click(function(e) {
						if (e.target.tagName !== "IMG") return;
						var value = $(e.target).attr("src");
						marquee.$emit("slideClick", { path: value });
					});
			this.option.autoplay > 0 &&
				(that.timer.autoplay = window.setInterval(function() {
					that.setPage(1);
				}, that.option.autoplay * 1000));
		},
		$on: function(name, fn) {
			// 去重
			function unique(arr) {
				if (!Array.isArray(arr)) return;
				const finalArr = Array.prototype.filter.call(arr, function(
					item,
					index
				) {
					return arr.indexOf(item) === index;
				});
				return finalArr;
			}

			if (!(this.subscriber[name] instanceof Array)) this.subscriber[name] = [];
			if (typeof fn !== "function") return;
			this.subscriber[name].push(fn);
			this.subscriber[name] = unique(this.subscriber[name]);
		},
		$emit: function(name, args) {
			if (!(this.subscriber[name] instanceof Array)) return;
			var args = args || {};
			this.subscriber[name].forEach(function(item) {
				item.call(this, args);
			});
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
			instance.componentDidMount(this);

			return instance;
		}
	});
	// $.fn.marquee.constructor = Marquee;
})(window);
