/****
 * opt可提供参数
 * @type {boolean} fancybox  是否开启点击查看大图
 * ****/
(function($) {
  ///默认参数
  var defaults = {
    fancybox: true,
  };
  $.fn.marquee = function(opt) {
    this.extend(defaults);
    this.extend(opt);

    /////////////////////////////////////////////////////////////////////
    ///////////////////////建立相关变量
    var $containerBox = $('<div class="marquee-box"></div>'),
      $imgs = this.find('img'),
      len = $imgs.length,
      curIndex = 0,
      $child = this.children(),
      width = this.width();

    /////////////////////////////////////////////////////////////////////
    ///////////////////////引入box以及相关样式
    this.empty();
    this.append($containerBox.append($child));
    $imgs.css({
      width,
      float: 'left',
    });
    $containerBox.css({
      width: width * len + 'px',
      position: 'relative',
      left: '-' + width * curIndex + 'px',
    });
    /////////////////////////////////////////////////////////////////////
    ///////////////////////引入翻页按钮
    var prevBtn = $(
      '<button class="slider-btn slider-btn--prev">&lt;</button>'
    );
    var nextBtn = $(
      '<button class="slider-btn slider-btn--next">&gt;</button>'
    );
    prevBtn.on('click', function() {
      update(-1);
    });
    nextBtn.on('click', function() {
      update(1);
    });
    this.prepend(prevBtn);
    this.append(nextBtn);
    /////////////////////////////////////////////////////////////////////
    ///////////////////////更新函数
    function update(changeNum) {
      curIndex = curIndex + changeNum;
      curIndex = Math.max(Math.min(curIndex, len - 1), 0);
      $containerBox.css({
        left: '-' + width * curIndex + 'px',
      });
    }
    /////////////////////////////////////////////////////////////////////
    ///////////////////////是否使用fancybox插件
    if (this.fancybox) {
      if (typeof $().fancybox === 'function') {
        $imgs.fancybox();
      } else {
        throw '请引入fancybox相关文件';
      }
    }
    /////////////////////////////////////////////////////////////////////
  };
})(jQuery);
