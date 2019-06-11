$.fn.popup = function() {
	let clk_src = $(this).attr('src');
	// 创造一个浮层
	$('body').append('<div class="mark"></div>');
	let mark = $('.mark');

	// 把获取的src添加到mark中
	mark.append('<img class="showimg">');
	$('.showimg').attr('src', clk_src);

	// 一个关闭按钮
	mark.append('<div class="close">X</div>');
	let close = $('.close');
	// close 绑定事件
	close.on('click', function() {
		mark.remove(); // 移除dom
	})


	$('.showimg').css({
		width: '90%'
	})
	close.css({
		position: 'absolute',
		top: '1rem',
		right: '1rem',
		color: '#fff',
		fontWeight: '500',
	})
	mark.css({
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.8)'
	})


}