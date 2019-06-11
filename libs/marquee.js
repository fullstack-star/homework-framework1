$.fn.marquee = function() {
	var marquee = $(this)
	var i = 0, len;
	len = marquee.find('ul>li').length;
	marquee.find('ul>li').first().addClass('active');
	marquee.find('.left.arrow').on('click', function() {
		i = i - 1 < 0 ? len - 1 : i - 1;
		toggle(marquee, i);
	});
	marquee.find('.right.arrow').on('click', function() {
		i = i === len - 1 ? 0 : i + 1;
		toggle(marquee, i);
	});
	function toggle(mar, i) {
		mar.find('ul>li').removeClass('active');
		mar.find('ul>li').eq(i).addClass('active');
	}
  // 可翻页
  // popup when click
  // 可以用 fancybox
}
