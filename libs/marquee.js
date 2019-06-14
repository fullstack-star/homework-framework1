$.fn.marquee = function(opt) {
  console.log(opt)
  var me = this
  var canSwiper = true // 防止动画没有执行完毕就开始下一个动画
  var index = 0
  var defaultPlayTime = opt.auto || 500
  var speed = opt.speed || 300
  var childrens = me.find('.wrap').children()
  var itemWidth = me.width()
  var timer = null

  init()
  if (opt.showPage) {
    addPage()
  }
  if (opt.showDot) {
    addDot()
  }
  if (opt.auto) {
    autoPlay()
  }
  function autoPlay () {
    timer = setInterval(function() {
      index++
      clearInterval(timer)
      render()
    }, defaultPlayTime)
  }
  function addPage () {
    var pageEl = '<span class=prev><<</span class=next><span class=next>>></span>'
    me.append(pageEl)
    me.find('span').click(function() {
      var cssName = $(this).attr('class')
      handlerChange(cssName)
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
    // console.log(dots)
    // $(dots[index]).addClass('active')
    // me.find('.dots').find('span')[index].addClass('active')
    me.find('.wrap').animate({left: -index*itemWidth + 'px'}, speed, function(){
      if (opt.auto) {
        autoPlay()
      }
      canSwiper = true
    })
  }
}
