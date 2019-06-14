$.fn.marquee = function(config) {
  'use strict';
  // 可翻页
  // popup when click
  // 可以用 fancybox
  var $imgsWrap = this.find('.groupeds-wrap');
  var $imgs = this.find('.grouped_elements');
  var $nextBtn = this.find('.next-btn');
  var $prevBtn = this.find('.prev-btn');
  var imgWidth = this.width(); // 图片的宽度
  var imgIndex = 0;
  var imgsLength = $('.grouped_elements').length;
  $imgsWrap.css({width: imgWidth * imgsLength + 'px'});
  var autoTimer = null;

  $nextBtn.on('click', function(e) {
    nextPlay();
  });
  $prevBtn.on('click', function(e) {
    prevPlay();
  });

  var nextPlay = function() {
    imgIndex++
    if(imgIndex > imgsLength - 1) {
      imgIndex = 0
    }
    play(imgIndex);
  }
  var prevPlay = function() {
    imgIndex--
    if(imgIndex < 0) {
      imgIndex = imgsLength - 1
    }
    play(imgIndex);
  }

  var play = function(index) {
    $imgsWrap.stop().animate({
      marginLeft: -imgWidth * index + 'px',
    });
  }
}