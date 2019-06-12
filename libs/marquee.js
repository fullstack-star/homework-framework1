$.fn.marquee = function() {
  // 可翻页
  // popup when click
  var curIndex = 0;
  var interval = setInterval( function() {
    var $slides = $('.slide');
    for ( var i = 0; i < $slides.length; i++) {
      $('.slide').eq(i).addClass('hide');
    }
    curIndex++;
    curIndex = curIndex > $slides.length - 1 ? 0 : curIndex;
    $('.slide').eq(curIndex).removeClass('hide');
  }, 2500);

  $(this).on('click','img', function() {
    // clearInterval(interval);
    $(this).toggleClass('scale');
  });
}