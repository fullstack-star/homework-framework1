/**
 * marquee 基于jquery的轮播图
 * @param {Number} width 宽度
 * @param {Number} height 高度
 * @param {Boolean} [options.showArrow] 是否显示切换箭头
 * @param {Boolean} [options.showDot] 是否显示圆点
 * @param {Boolean} [options.autoLoop] 是否自动播放
*/
$.fn.marquee = function(width = 800, height = 600, options ={
  showArrow: true,
  showDot: true,
  autoLoop: true
}) {
  // 可翻页
  // popup when click
  // 可以用 fancybox
  var status = {
    current: 0,
    timmer: null,
    flag: true,
  }
  options = typeof options === 'object' ? options : {}
  options.width = isNaN(width) ? 800 : width
  options.height = isNaN(height) ? 800 : height 
  options.size = $(this).find('img').length
  status = Object.assign(status, options)

  // 初始化样式
  initStyle(this, options)

  if (options.showArrow) {
    $(this).append(renderArrow())
    arrowHanddle(status)
  }

  if (options.showDot) {
    $(this).append(renderDot(options.size))
    dotHanddle(status)
  }
  
  if (options.autoLoop) {
    status.timmer = setTimeout(() => {
      status.current += 1
      doSlider(status)
    }, 3000)
  }

  $(this).hover(function(){
    clearTimeout(status.timmer)
  },function(){
    status.timmer=setTimeout(() =>doSlider(status),3000)
  })
}

function initStyle(target, options) {
  var wrapper = $(target).css({'width': options.width, 'height': options.height})
  .find('.marquee-wrapper').css({'width': options.width * (options.size + 2), 'left': -options.width})
  
  wrapper.find('a').css('width', options.width)
  // 创建fancybox
  var docFrag = $('<div id="fancy" style="display: none;"></div>')
  wrapper.find('img').clone().each((index, ele) => {
    docFrag.append($('<div id="' + index +'"></div>').append(ele))
  })

  $('body').append(docFrag)

  var firstNode = wrapper.children(":first").clone()
  wrapper.children(":last").clone().prependTo('.marquee-wrapper')
  firstNode.appendTo('.marquee-wrapper')
}

function doSlider(status) {
  if (!status.flag) return
  status.flag = false

  var pics=$('.marquee-wrapper'),
  dots=$('.marquee-dots a'),
  picWidth=status.width,
  size = status.size,
  current=status.current

  // 圆点按钮轮播
  dots.removeClass('dots-active').eq(current%size).addClass('dots-active')
  // 图片轮播
  pics.stop().animate({
    left:-(current+1)*picWidth
  },1000,function () {
    status.flag = true
    if(current===size){
      status.current= 0
      pics.css('left',-picWidth+'px')
    }else if(current===-1){			
      status.current=size-1
      pics.css('left',-(size)*picWidth+'px')
    }

    if (!status.autoLoop) return
    clearTimeout(status.timmer)
    status.timmer = setTimeout(() => {
      status.current += 1
      doSlider(status)
    }, 3000)
  })
}

function renderArrow() {
  return $('<div class="marquee-arrow">'
  +'<a href="#5" class="arrow-item prev" id="arrow-prev">&lt</a>'
  +'<a href="#6" class="arrow-item next" id="arrow-next">&gt</a>'
  +'</div>')
}

function arrowHanddle(status) {
  // 点击上一张按钮切换图片
  $('#arrow-prev').click(function(){
    status.flag && status.current--
    doSlider(status)
  })
  // 点击下一张按钮切换图片	
  $('#arrow-next').click(function(){
    status.flag && status.current++
    doSlider(status)
  })
}

function renderDot(size) {
  var arr = new Array(size + 1).join(' ').split('')
  var dotNodes = arr.map((t, index) => index === 0 ? '<a rel="group1" class="dots-item dots-active"></a>' 
  : '<a rel="group1" class="dots-item"></a>').join('')
  
  return $('<div class="marquee-dots">'
  + dotNodes
  +'</div>')
}

function dotHanddle(status) {
  // 点击圆点切换图片
  $('.marquee-dots a').click(function(){
    status.current=$(this).index()
    doSlider(status)
  })
}

