$.fn.marquee = function(opt) {
  var me = this
  var canSwiper = true // 防止动画没有执行完毕就开始下一个动画
  var index = 0
  var options = Object.assign({auto: 500, speed}, opt)
  var childrens = me.find('.wrap').children()
  var itemWidth = me.width()
  var timer = null

  init()
  function autoPlay () {
    timer = setInterval(function() {
      handlerChange('next')
    }, options.auto)
  }
  function addPage () {
    me.append('<span class=prev><<</span class=next><span class=next>>></span>')
    me.find('span').click(function() {
      handlerChange($(this).attr('class'))
    })
  }
  function addDot () {
    var dots = `<span></span>`.repeat(childrens.length)
    me.find('.dots').append(dots)
    me.find('.dots').find('span:first-child').addClass('active')
  }
  function init () {
    // 添加元素:滚动看起来是连贯的
    let firstChild = $(childrens[0]).clone()
    let endChild = $(childrens[childrens.length-1]).clone()
    me.find('.wrap').append(firstChild).append(endChild)
    me.find('.wrap').css('width', itemWidth * (childrens.length+2) + 'px')
    opt.showPage && addPage()
    opt.showDot && showDot()
    opt.autoPlay && autoPlay()
  }
  function handlerChange (type) {
    clearInterval(timer)
    if (!canSwiper) return
    canSwiper = false
    if (type === 'next') {
      index++
    } else {
      index--
    }
    render()
  }
  function render () {
    if (index < 0) {
      me.find('.wrap').css('left', -itemWidth * childrens.length)
      index = childrens.length - 1
    } else if (index > childrens.length) {
      me.find('.wrap').css('left', 0)
      index = 1
    }
    var dots = me.find('.dots').find('span')
    dots.each(function(sub, dot) {      
      if (sub === index) {
        $(dot).addClass('active')
      } else {
        $(dot).removeClass('active')
      }
      if (index === childrens.length && sub === 0) {
        $(dot).addClass('active')
      }
    })
    me.find('.wrap').animate({left: -index*itemWidth + 'px'}, options.speed, function(){
      if (opt.auto) {
        autoPlay()
      }
      canSwiper = true
    })
  }
}
