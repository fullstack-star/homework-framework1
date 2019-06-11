$.fn.marquee = function () {
  // 可翻页
  // popup when click
  // 可以用 fancybox
  $(".fancybox").fancybox({
		openEffect	: 'none',
    closeEffect	: 'none',
    helpers:{
      buttons:{},
      thumbs:{ alwaysCenter:true},
      title:{}
    }
	});
}
$.fn.marquee();