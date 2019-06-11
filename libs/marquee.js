$.fn.marquee = function (options = {}) {
  let delay = options.delay || 3000;
  let timer = null; // 定时器
  let $imgs = $(this).find('#marquee-wrapper img'); //获取图片
  let count = $imgs && $imgs.length ? $imgs.length : 0;// 图片个数
  let currentIndex = 0;
  function changeImg() {

  }

  // 开始轮播
  function beginSlide() {
    var lastTime = (new Date()).valueOf()
    timer = setInterval(function () {
      var now = (new Date()).valueOf()
      if (now - lastTime >= delay) {
        lastTime = now;
        nextClick();
        changeImg(currentIndex)
      }
    }, 10)

  }

  function changeImg(imgIndex) {
    $imgs.removeClass('active');
    $($imgs[imgIndex]).addClass('active');
  }
  
  // 前一箭头点击事件
  function prevClick() {
    if(currentIndex === 0) {
      currentIndex = count - 1;
    } else {
      currentIndex--;
    }
    changeImg(currentIndex);
  }

  // 后一个箭头点击事件
  function nextClick() {
    if(currentIndex === count - 1) {
      currentIndex = 0
    } else {
      currentIndex++;
    }
    changeImg(currentIndex);
  }
  popup()
  beginSlide();
  function popup () {
    // 添加点击放大图片效果
    $imgs.fancybox({
      beforeShow: function () {
        clearInterval(timer)
      },
    })
  }
}