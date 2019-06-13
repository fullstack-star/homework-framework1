/*
 * ModuleName: 模态图片预览组件
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
	var Modal = function(option) {
		if (typeof option !== "object") option = {};
		var _option = {};
		this.option = $.extend(true, {}, _option, option);
		this.data = {
			status: 0 // 0关/1开
		};
		this.subscriber = {};
		this.node = null;
	};
	Modal.prototype = {
		constructor: Modal,
		/* 构建界面 */
		buildUI: function(context) {
			// 主结构
			var htmlstr_outline = [
				'<div class="modal_dialog">',
				'<i class="modal_close"></i>',
				"<img />",
				"</div>"
			];
			var node_modal = document.createElement("div");
			node_modal.className = "modal j-modal";
			node_modal.innerHTML = htmlstr_outline.join("");

			// 渲染节点
			this.render(node_modal, context);
		},
		/* 渲染 */
		render: function(htmlNode, context) {
			var ctx = context || document.body;
			$(ctx).append(htmlNode);
			this.node = htmlNode;
		},
		/* 各种钩子 */
		componentDidMount: function(context) {
			var that = this;

			$(this.node)
				.find(".modal_close")
				.click(function(e) {
					that.close();
				});
		},
		open: function(file) {
			$(this.node)
				.css({
					display: "block"
				})
				.find("img")
				.eq(0)
				.attr("src", file.path);
		},
		close: function() {
			$(this.node).css({
				display: "none"
			});
		}
	};

	/*
	 * =============================
	 * 接口
	 * =============================
	 */
	$.fn.extend({
		modal: function(option) {
			var instance = new Modal(option);

			instance.buildUI(this);
			instance.componentDidMount();

			return instance;
		}
	});
	// $.fn.modal.constructor = Modal;
})(window);
