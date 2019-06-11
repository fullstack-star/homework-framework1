$.fn.marquee = function() {
  // 初始化swiper
  // TODO: 轮播逻辑看了一下同学写的，大概清楚，等有能力的时候再改为手写的逻辑。
  new Swiper('.swiper-container', {
    loop: true,
    lazy: {
      loadPrevNext: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
    }
  });
}
