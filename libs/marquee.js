$.fn.marquee = function(setting) {
  // 可翻页
  // popup when click
  // 可以用 fancybox
  let marquee = $(this);
  let container = marquee.find('.marquee-container');
  let imgList = marquee.find('img');
  let len = imgList.length;
  let curIndex = 0;
  let width = setting && setting.width ? setting.width : 400;
  let height = setting && setting.height ? setting.height : 256;
  let duration = setting && setting.duration ? setting.duration : 500;
  let interval = setting && setting.interval ? setting.interval : 2000;
  const CONTAINER_WIDTH = width * len;
  let stopped = false;
  let timer = null;
  let transitionEnd = true;

  init();
  startPlay();

  // 初始化
  function init() {
    let containerHtml = container.html();
    // 在container前后各复制一份以实现平滑过渡
    container.append(containerHtml);
    container.prepend(containerHtml) ;
    // 初始化container宽度
    $('img').css({'width': `${width}px`});
    marquee.css({'width': `${width}px`});
    marquee.css({'height': `${height}px`});
    container.css({'width': `${CONTAINER_WIDTH*3}px`});
    container.css({'left': `${-CONTAINER_WIDTH}px`});
    // hover时停止自动播放
    $('img').hover(function() {
      stopPlay();
    }, function() {
      startPlay();
    });

    $('.prev-nav').click(function() {
      stopPlay();
      throttle(onPrev, 300);
    });

    $('.next-nav').click(function() {
      stopPlay();
      throttle(onNext, 300);
    });

    $('img').fancybox({
      showCloseButton: true,
      openEffect: 'none',
      closeEffect: 'none',
    });
  }

  function onPrev() {
    if (transitionEnd) showImg('prev');
  }

  function onNext() {
    if (transitionEnd) showImg('next');
  }

  function showImg(flag) {
    switch (flag) {
      case 'prev':
        curIndex--;
        break;
      case 'next':
        curIndex++;
        break;
      case 'auto':
        curIndex++;
        break;
      default:
        break;
    }
    transitionEnd = false;
    container.animate({left: `${-CONTAINER_WIDTH-width*curIndex}px`}, duration, function() {
      transitionEnd = true;
      if (curIndex === len) {
        curIndex = 0;
        container.css({'left': `${-CONTAINER_WIDTH}px`});
      } else if (curIndex === -1) {
        curIndex = len - 1;
        container.css({'left': `${-CONTAINER_WIDTH-width*(len-1)}px`});
      }
    });
  }

  function autoPlay() {
    if (stopped) {
      clearInterval(timer);
      return;
    }
    timer = setInterval(function() {
      showImg('auto');
    }, interval);
  }

  function startPlay() {
    stopped = false;
    autoPlay();
  }

  function stopPlay() {
    stopped = true;
    clearInterval(timer);
  }

  // 节流
  function throttle(fn, t) {
    clearTimeout(fn.tId);
    fn.tId = setTimeout(function() {
      fn();
    }, t);
  }
}
