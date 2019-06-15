/*
 * ModuleName: 业务代码
 * Author: qyingkou@163.com
 * Date: 20190613
 */

/* 实例化轮播组件1 */
var marquee = $("#marquee").marquee();
/* 实例化轮播组件2 */
var marquee2 = $("#marquee2").marquee({
	pointer: false, // 显示指示器
	autoplay: 3	// 自动播放，秒
});
/* 实例化modal组件 */
var modal = $("body").modal();

// 轮播实例绑定事件
marquee.$on("slideClick", function(file) {
	modal.open(file);
});
marquee2.$on("slideClick", function(file) {
	modal.open(file);
});

/*
 * =============================
 * 控制面板 - 测试用途
 * =============================
 */
$(".j-control-width").on("click", function(e) {
	var target = e.target;
	if (target.tagName !== "BUTTON") return false;
	var value = target.parentNode.dataset.value;

	$("#marquee").css({ width: value });
	console.log("布局宽度调整为：", value, "px");
});
$(".j-control-height").on("click", function(e) {
	var target = e.target;
	if (target.tagName !== "BUTTON") return false;
	var value = target.parentNode.dataset.value;

	$("#marquee").css({ height: value });
	console.log("布局高度调整为：", value, "px");
});
$(".j-control-operate").on("click", function(e) {
	var target = e.target;
	if (target.tagName !== "BUTTON") return false;
	var value = target.parentNode.dataset.value;

	switch (value) {
		case "next":
			marquee.setPage(1);
			break;
		case "prev":
			marquee.setPage(-1);
			break;
		case "click":
			marquee.$emit("slideClick", {
				path: marquee.data.list[marquee.data.index]
			});
			break;
	}
});
