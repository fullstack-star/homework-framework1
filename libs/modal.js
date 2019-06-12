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
	var Modal = function() {
		// 数据信息
		this.data = {
			status: 0 // 0关/1开
		};
	};
	Modal.prototype = {
		constructor: Modal,
		/* 构建界面 */
		buildUI: function(context) {
			// 主结构
			var htmlstr_outline = [
				'<div class="modal_dialog">',
				'<i class="modal_close"></i>',
				"</div>"
			];
			var node_modal = document.createElement("div");
			node_modal.className = "modal j-modal";
			node_modal.innerHTML = htmlstr_outline.join("");
			node_modal.getElementsByClassName(
				"modal_dialog"
			)[0].appendChild = (function() {
				return "<p>hahahhahahahahahah!</p>";
			})();

			// 渲染节点
			this.render(node_modal, context);
		},
		/* 渲染 */
		render: function(htmlNode, context) {
			var ctx = context || document.body;
			$(ctx).append(htmlNode);
		},
		/* 各种钩子 */
		componentDidMount: function() {
			var that = this;

			$(".j-sliders").click(function(e) {
				that.open();
			});
			$(".j-modal .modal_close").click(function(e) {
				that.close();
			});
		},
		open: function() {
			$(".j-modal").css({
				display: "block"
			});
		},
		close: function() {
			$(".j-modal").css({
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
