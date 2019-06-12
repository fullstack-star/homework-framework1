$.fn.marquee = function(options) {
  var carousel = new Carousel(this, options)
  return carousel.init()
}
var Carousel = function(ele, options) {
  this.$element = ele
  this.imgs = options.imgs
  this.itemLength = options.imgs.length
  this.currentIndex = options.currentIndex || 0
  this.width = options.width || 500
  this.height = options.height || 'auto'
  this.autoplay = options.autoplay || true
  this.autoplaySpeed = options.autoplaySpeed || 3000
  this.trigger = this.oneOf(options.trigger, ['hover', 'click']) || 'hover' //指示器的触发方式，click（点击），hover（悬停）
  this.arrow = this.oneOf(options.arrow, ['hover', 'always', 'never'])|| 'hover' //切换箭头， hover（悬停），always（一直显示），never（不显示）
  this.easing = options.easing || 'ease'
}
Carousel.prototype.init = function() {
  this.domInit()
  this.setAutoplay()
  this.arrowInit()
  this.dotsInit()
  this.popInit()
}
Carousel.prototype.domInit = function() {
  const _this = this
  this.$element.css({'width': _this.width, 'height' : _this.height})
  let html = ''
  for (let i = 0; i < this.itemLength; i++) {
    html += '<div><img src="'+ this.imgs[i] +'" /></div>'
  }
  this.$element.html(`
    <div class="buttons">
      <div class="buttons-left">&lt;</div>
      <div class="buttons-right">&gt;</div>
    </div>
    <div class="list">
      ${html}
    </div>
    <ul class="dots">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  `)
  $('.list').css({'width': _this.width * _this.itemLength, 'height' : _this.height})
  $('.list>div').css({'width' : _this.width})
}
Carousel.prototype.popInit = function() {
  const _this = this
  $('.list>div').on('click', function () {
    _this.autoplay = false
    _this.setAutoplay()
    $('body').append(`<div class="popup">
      <div class="mask"></div>
      <img src="${_this.imgs[_this.currentIndex]}"/>
    </div>`)
  })
  $('body').on('click', '.mask', function() {
    $('div').remove('.popup')
    _this.autoplay = true
    _this.setAutoplay()
  })
}
Carousel.prototype.arrowInit = function() {
  let btns = $('.buttons')
  if (this.arrow === 'hover') {
    this.$element.hover(
      function() {
        btns.css({'display': 'block'})
      },
      function() {
        btns.css({'display': 'none'})
      }
    )
  }
  if (this.arrow === 'always') {
    btns.css({'display': 'block'})
  }
  if (this.arrow === 'never') {
    btns.css({'display': 'none'})
  }
  this.bindArrows()
}
Carousel.prototype.bindArrows = function() {
  const _this = this
  $('.buttons-left').on('click', function() {
    _this.addEvent(-1)
  })
  $('.buttons-right').on('click', function() {
    _this.addEvent(1)
  })
}
Carousel.prototype.addEvent = function(offset) {
  this.setAutoplay()
  this.add(offset)
}
Carousel.prototype.add = function(n) {
  this.currentIndex += n
  if (this.currentIndex >= this.itemLength) {
    this.currentIndex = 0
  }
  if (this.currentIndex < 0) {
    this.currentIndex = this.itemLength - 1
  }
  this.play()
  this.playDot()
}
Carousel.prototype.dotsInit = function() {
  const _this = this
  const lis = $('.dots>li')
  lis.on(this.trigger === 'hover' ? 'mouseover' : 'click', function() {
    _this.addEvent(lis.find('.dots>li').index(this))
  })
  this.playDot()
}
Carousel.prototype.playDot = function() {
  $('.dots>li').css({'width': '16px'}).eq(this.currentIndex).css({'width': '24px'})
}
Carousel.prototype.play = function() {
  $('.list').css({
    'transform': 'translateX(-' + this.currentIndex * this.width + 'px)',
    'transition-timing-function': this.easing
  })
}
Carousel.prototype.setAutoplay = function() {
  window.clearInterval(this.timer)
  if (this.autoplay) {
    this.timer = window.setInterval(() => {
      this.add(1)
    }, this.autoplaySpeed)
  }
}
Carousel.prototype.oneOf = function(value, arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (value === arr[i]) {
      return value
    }
  }
  return false
}
