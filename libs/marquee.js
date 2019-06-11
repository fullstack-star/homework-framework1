/*
 * options 可配置化 TODO
 * duration 翻页间隔，默认2000ms
 * animateTime 翻页时间，默认600ms
 * 
 */
$.fn.marquee = function(options) {
  var target = this;
  var options = $.extend({
    // TODO
    duration: 2500,
    animateTime: 600,
  }, options);
  if (target.find("img").length <= 1) {
    // 图片小于2张直接返回
    return;
  }
  // 初始化样式
  var timeFlag = null;
  var resetTimeFlag = null;
  var currentIndex = 0;
  var duration = options.duration;
  var animateTime = options.animateTime < options.duration ? options.animateTime : options.duration;
  var imgNums = target.find("img").length;
  target.css({
    width: '100%',
    overflow: 'hidden',
    position: 'relative'
  });
  target.append(this.children(":first-child").clone());
  target.html(`<div class="marquee-box" style="display: flex;width:${(imgNums+1)*100}%">
  	${target.html()}
  	</div>`);
  target.find("img").css({
    flex: 1,
    width: `${100/(imgNums+1)}%`,
    height: '100%'
  })
  // 添加轮播动画
  var list = target.find(".marquee-box");
  var rolling = function(isLeft) {
    clearTimeout(timeFlag);
    clearTimeout(resetTimeFlag);
    currentIndex++;
    list.css({
      transform: `translateX(-${100*currentIndex/(imgNums+1)}%)`,
      transition: `all ${animateTime}ms`
    });
    if (currentIndex >= imgNums) {
      currentIndex = 0;
      resetTimeFlag = setTimeout(() => {
        list.css({
          transform: 'translateX(0)',
          transition: 'all 0s'
        });
      }, animateTime)
    }
    timeFlag = setTimeout(rolling.bind(this), duration)
  }
  setTimeout(rolling.bind(this), duration)
  // 增加翻页按钮
  target.prepend("<span class='marquee-left' style='position:absolute;z-index: 5;font-size:30px;background: rgba(255,255,255,.5);left:0;top:50%;transform:translateY(-50%);padding: 20px;'><</span>");
  target.append("<span class='marquee-right' style='position:absolute;z-index: 5;font-size:30px;background: rgba(255,255,255,.5);right:0;top:50%;transform:translateY(-50%);padding: 20px;'>></span>")
  $(".marquee-left").on("click", function() {
    if (currentIndex == 0) {
      currentIndex = imgNums
      list.css({
        transform: `translateX(-${100*currentIndex/(imgNums+1)}%)`,
        transition: 'all 0s',
      });
    }
    currentIndex = currentIndex - 2;
    setTimeout(()=>{ //等效nextTick
    	rolling();
    },0);
  });
  $(".marquee-right").on("click", function() {
    rolling();
  });
  // 添加click事件
  target.on("click", function(ev) {
    if (ev.target && ev.target.src && ev.target.tagName === "IMG") {
      var imgUrl = ev.target.src;
      $("body").append(`<div class='mask' style='position:fixed;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,.5)'>
    	<img src="${imgUrl}" style="width:90%;display: block;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">
  		</div>`)
      $(".mask").click(function() { this.remove() })
    }
  })
}
