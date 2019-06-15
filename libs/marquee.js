$.fn.marquee = function() {
  // 运行速度
  var speed = 2000;
  // 定时器
  var timer = null;

  // 记录当前第几页
  var curIndex = 1;
  // 计算总共多少页
  var totalPage = $('#marquee .item').length;

  // 
  var marquee = $('#marquee');
  var container = $('#marquee .container');
  var prev = $('#marquee .prev');
  var next = $('#marquee .next');

  carouselBegin();
  /**
   * 轮播
   */
  function carouselBegin() {
      stopCarousel();
      timer = setInterval(function() {
          if(curIndex === totalPage) {
              curIndex = 1;
          } else {
              curIndex++;
          }
          container.css({transform: `translateX(${-(curIndex - 1) * 200}px)`});
          
      }, speed);
  }


  /**
   * 停止轮播
   */
  function stopCarousel() {
      clearInterval(timer);
  }
  
  prev.click(function() {
      if(curIndex === 1) {
          curIndex = totalPage; 
      } else {
          curIndex--;
      }
      container.css({transform: `translateX(${-(curIndex - 1) * 200}px)`});
  });

  next.click(function() {
      if(curIndex === totalPage) {
          curIndex = 1;
      } else {
          curIndex++;
      }
      container.css({transform: `translateX(${-(curIndex-1)*200}px)`});
  });

  marquee.mouseover(function() {
      stopCarousel();
  }).mouseout(function() {
      carouselBegin();
  });
}
