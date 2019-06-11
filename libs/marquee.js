(function($) {
  var defaults = {
    fancybox: true,
  };
  $.fn.marquee = function(opt) {
    this.extend(defaults);
    this.extend(opt);

    var $containerBox = $('<div class="marquee-box"></div>'),
      $imgs = this.find('img'),
      len = $imgs.length,
      curIndex = 0,
      $child = this.children(),
      width = this.width();

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

    function update(changeNum) {
      curIndex = curIndex + changeNum;
      curIndex = Math.max(Math.min(curIndex, len - 1), 0);
      $containerBox.css({
        left: '-' + width * curIndex + 'px',
      });
    }

    if (this.fancybox) {
      if (typeof $().fancybox === 'function') {
        $imgs.fancybox();
      } else {
        throw '请引入fancybox相关文件';
      }
    }
  };
})(jQuery);
