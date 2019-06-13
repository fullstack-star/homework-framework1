const arrowLeft =
  `<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left left-btn" title="PREV">
    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z" /></svg></div>
  </button>`
const arrowRight =
  `<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right rgt-btn" title="NEXT">
    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z" /></svg></div>
  </button>`
// 可翻页
// popup when click
// 可以用 fancybox
$.fn.marquee = function (options = {}) {
  const { time = 1000 } = options
  const _this = $(this)
  let index = 0
  let length = _this.find('img').length
  let timer = null
  // 初始化dom
  init()
  // 轮播
  start()
  // 右箭头事件
  $('.left-btn').on('click', (e) => {
    left()
  })
  // 左箭头事件
  $('.rgt-btn').on('click', (e) => {
    right()
  })
  // hover
  _this.on('mouseenter', (e) => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    _this.find('button').show()
  })
  // hover
  _this.on('mouseleave', (e) => {
    _this.find('button').hide()
    start()
  })
  
  function init() {
    // 处理图片结构
    const $imgs = _this.find('img')
    _this.empty()
    const doms = Array.from($imgs).map((item, index) => {
      const tag = document.createElement('a')
      $(tag)
        .attr({
          'src': $(item).attr('src'),
          'data-fancybox': 'images',
          'data-caption': 'img'
        })
        .append(item)
      return tag
    })
    _this.append($('<div class="img-wrapper"></div>').append(doms))
    const wrapper = $('.img-wrapper')
    wrapper.find('a:eq(0)').clone().appendTo(wrapper)
    // 添加箭头
    _this.append(arrowLeft)
    _this.append(arrowRight)
  }
  function right () {
    const wrapper = $('.img-wrapper')
    const width = _this.width()
    index++
    wrapper.stop(true, true).animate({left: -(width * index)}, 300, '', function() {
      if (index > length - 1) {
        index = 0
        $(this).css("left", 0);
      }
    })
  }
  function left () {
    const wrapper = $('.img-wrapper')
    const width = _this.width()
    if (wrapper.is(":animated")) {
      return;
    }
    index--
    if (index < 0) {
      index = length - 1
      wrapper.css("left", -(width * length));
    }
    wrapper.stop(true, true).animate({left: -(width * index)}, 300)
  }
  function start () {
    timer = setInterval(() => {
      right()
    }, time)
  }
}
