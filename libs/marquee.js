$.fn.marquee = function() {
  var canSwiper = true
  var me = this
  var index = 1
  var childrens = this.find('.wrap').children()
  let firstChild = $(childrens[0]).clone()
  let endChild = $(childrens[childrens.length-1]).clone()
  $(childrens[0]).before(endChild)
  this.find('.wrap').append(firstChild)
  this.find('.wrap').css('width', this.width() * (childrens.length+2) + 'px')
  var pageEl = '<span class=prev><</span class=next><span class=next>></span>'
  this.append(pageEl)
  this.children('span').click(function() {
    if (!canSwiper) return
    canSwiper = false
    var cssName = $(this).attr('class')
    if (cssName === 'next') {
      index++
      me.find('.wrap').animate({left: -index*me.width() + 'px'}, 300, function(){
        if (index > childrens.length) {
          me.find('.wrap').css('left', -me.width()+'px')
          index = 1
        }
        canSwiper = true
      })
    } else {
      index--
      console.log(index)
      me.find('.wrap').animate({left: -index*me.width() + 'px'}, 300, function(){
        if (index <= 0) {
          me.find('.wrap').css('left', -(childrens.length)*me.width() + 'px')
          index = childrens.length
        }
        canSwiper = true
      })
    }
  })
  // 可翻页
  // popup when click
  // 可以用 fancybox
}
