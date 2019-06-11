$.fn.marquee = function() {
  //定义jQuery插件，其实就是向jQuery原型对象中添加一个自定义函数
  //侵入样式
  this.children().eq(0).addClass("picbox");
  this.children().eq(1).addClass("gallary");
  $(".gallary").children().eq(0).addClass("wrap");
  $(".gallary").children().eq(1).addClass("left");
  $(".gallary").children().eq(2).addClass("right");
  $(".wrap").children().eq(0).addClass("navs");
  //$(".wrap").children().eq(1).addClass("bots");

  // 绑定相关事件
  var idx = 0;
  $(".picbox > img").click(function(e){
    var target = $(this).attr("data-i");
    change(target);
    $(".gallary").show(500);
  })

  $(".gallary").click(function(){
      $(".gallary").hide(500);
  })
  //生成小圆点
  let ul = $('<ul></ul>')
  $(".wrap").append(ul);
  $(".wrap").children().eq(1).addClass("bots");
  var length = $(".navs li").length
  for (let i = 0; i < length; i++) {
    let li = $('<li></li>')
    $('.bots').append(li)
  }
  $('.bots li').first().addClass('active')

  //运动切换
  function change(idx){
    $(".bots>li").attr('class','');
    $(".bots>li").eq(idx).attr('class','active');
    $('.navs').stop().animate({left:-750*idx+'px'},500)
  };
  change(idx);

  $(".left").click(function(){
    if(window.event)//IE下阻止冒泡
        event.cancelBubble  = true;
    else
        event.stopPropagation();
    idx--;
    if(idx < 0){
        $('.navs').css('left', -2250)
        idx = 3
    }
    change(idx)
  })
  //阻止事件冒泡函数
  function stopPropagation(){
    if(window.event)//IE下阻止冒泡
        event.cancelBubble  = true;
    else
        event.stopPropagation();
  }
  $(".navs"||".navs li"||".navs li a"||".navs li a img").click(function(){
    stopPropagation()
  })
  $(".bots li"||".bots").click(function(){
    stopPropagation()
  })
  $(".right").click(function(){
    stopPropagation()
    idx++;
    if(idx > length-1){
        $('.navs').css('left',0)
        idx = 0
    }
    change(idx)
  })
}
