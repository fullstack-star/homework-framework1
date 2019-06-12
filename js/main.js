/* 实例化轮播组件 */
var marquee = $("#marquee").marquee({
	pointer: true // 显示指示器
});
/* 实例化modal组件 */
var modal = $("body").modal();

// 点击回调
marquee.onsliderClick(function(n) {
	modal.open;
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
			marquee.setPage("next");
			break;
		case "prev":
			marquee.setPage("prev");
			break;
		case "click":
			marquee.onsliderClick(function() {
				modal.open();
			});
			break;
	}
	console.log("执行了", value, "操作");
});
