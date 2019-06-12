$.fn.marquee = function() {
	// 可翻页
	var num = 0,
		len = $('#marquee a').length;
	var width = $('.mrquee-wrapper').width();
	$('#marquee').width(len * width + 'px');
	$('.previous').click(function() {
		num--
		if(num < 0) {
			num = len - 1;
		}
		switchPicture(num);
	})
	$('.next').click(function() {
		num++
		if(num >= len) {
			num = 0;
		}
		switchPicture(num);
	})

	function switchPicture(num) {
		$('#marquee').css("transform", "translate(-" + width * num + "px,0px)");
	}
	// popup when click
	// 可以用 fancybox
	$('.fancybox').fancybox();
}