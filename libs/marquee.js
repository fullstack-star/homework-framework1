$.fn.marquee = function (options = {}) {
  let delay = options.delay || 3000;
  let timer = null; // 定时器
  let $imgs = $(this).find('#marquee-wrapper img'); //获取图片
  let count = $imgs && $imgs.length ? $imgs.length : 0;// 图片个数
  let currentIndex = 0;
  const prevArrow = `<span class="slide-arrow slide-left">&lt;</span>`;
  const nextArrow = `<span class="slide-arrow slide-right">&gt;</span>`;
  $(this).append(prevArrow).append(nextArrow)
  // 开始轮播
  function beginSlide() {
    let lastTime = (new Date()).valueOf();
    timer = setInterval(function () {
      const now = (new Date()).valueOf();
      if (now - lastTime >= delay) {
        lastTime = now;
        nextClick();
        changeImg(currentIndex)
      }
    }, 10)

  }

  function changeImg(imgIndex) {
    $imgs.hide();
    $imgs.removeClass('active');
    $($imgs[imgIndex]).show();
    $($imgs[imgIndex]).addClass('active');
  }
  
  // 前一箭头点击事件
  function prevClick() {
    clearInterval(timer)
    if(currentIndex === 0) {
      currentIndex = count - 1;
    } else {
      currentIndex--;
    }
    changeImg(currentIndex);
    beginSlide();
  }

  // 后一个箭头点击事件
  function nextClick() {
    clearInterval(timer)
    if(currentIndex === count - 1) {
      currentIndex = 0
    } else {
      currentIndex++;
    }
    changeImg(currentIndex);
    beginSlide();
  }
  $('.slide-left').on('click', prevClick);
  $('.slide-right').on('click', nextClick);
  popup()
  beginSlide();
  function popup () {
    // 添加点击放大图片效果
    $imgs.fancybox({
      beforeShow: function () {
        clearInterval(timer)
      },
      afterClose: function() {
        changeImg(currentIndex);
        beginSlide();
      }
    })
  }
}