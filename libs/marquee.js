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
  const CONTAINER_WIDTH = width * len;

  init();

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
    $('.prev-nav').click(function() {
      onPrev();
    });

    $('.next-nav').click(function() {
      onNext();
    });

    $('img').fancybox({
      showCloseButton: true,
      openEffect: 'none',
      closeEffect: 'none',
    });
  }

  function onPrev() {
    curIndex--;
    showImg();
  }

  function onNext() {
    curIndex++;
    showImg();
  }

  function showImg() {
    container.animate({left: `${-CONTAINER_WIDTH-width*curIndex}px`}, duration, function() {
      if (curIndex === len) {
        curIndex = 0;
        container.css({'left': `${-CONTAINER_WIDTH}px`});
      } else if (curIndex === -1) {
        curIndex = len - 1;
        container.css({'left': `${-CONTAINER_WIDTH-width*(len-1)}px`});
      }
    });
  }
}
