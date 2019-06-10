$.fn.marquee = function(params) {
  var params = params || {};
  var marquee = $(this);
  var items = $(marquee).find('.marquee-thumbnail');
  var total = items.length;
  var idx = 0;
  var prevBtn = $('<button class="marquee-btn marquee-btn__prev">&lt;</button>');
  var nextBtn = $('<button class="marquee-btn marquee-btn__next">&gt;</button>');

  // 图片展示
  function showImg() {
    items.hide();
    $(items[idx]).show();
  }

  // 按钮状态
  function btnState() {
    if (idx === 0) {
      $(prevBtn).attr("disabled", true);
      $(prevBtn).css('cursor', 'not-allowed');
    } else {
      $(prevBtn).removeAttr("disabled");
      $(prevBtn).css('cursor', 'pointer');
    }

    if (idx + 1 === total) {
      $(nextBtn).attr("disabled", true);
      $(nextBtn).css('cursor', 'not-allowed');
    } else {
      $(nextBtn).removeAttr("disabled");
      $(nextBtn).css('cursor', 'pointer');
    }
  }

  // 切换事件
  function change(num) {
    idx = (idx + num >= 0) && (idx + num < total) ? (idx + num) : idx;
    showImg();
    btnState();
  }

  // 按钮添加
  function createBtn() {
    $(marquee).prepend(prevBtn);
    $(marquee).append(nextBtn);

    btnState();

    $(prevBtn).on('click', function() {
      change(-1);
    });
    $(nextBtn).on('click', function() {
      change(1);
    });
  }

  // 初始化函数
  function render() {
    var marqueeWidth = params.width || '100%';
    var marqueeHeight = params.height || (marqueeWidth / 2);
    $(marquee).css({
      'width': marqueeWidth + 'px',
      'height': marqueeHeight + 'px'
    });

    var fancyboxOptions = params.fancybox || {}
    items.fancybox(fancyboxOptions);

    showImg();
    createBtn();
  }
  
  // 插件初始化
  render();
}
