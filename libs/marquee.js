$.fn.marquee = function (data) {
  // 可翻页
  // popup when click
  // 可以用 fancybox
  var $box = $(this);
  var timer;
  var app = {
    data:{
      length:0,
      currentIndex:0,
      width:$box.find(".slider_item").eq(0).width(),
      isEnlarged:false
      // width:$box.width(),
    },
    el:{
      $ul:$box.find(".slider_wrapper"),
      $imgs_lk:$box.find(".focus_item_lk"),
    },
    init:function () {
      app.setData();
      app.bind_event();
      app.showtime();
      app.fancybox();
    },
    fancybox:function () {
      app.el.$imgs_lk.fancybox(
        {
          beforeShow: function () {
            app.data.isEnlarged=true
          },
          afterClose: function () {
            app.data.isEnlarged=false;
            app.showtime();
          },
        }
      );
    },
    setData:function () {
      console.log("data",data)
      $box.find(".focus_item_lk").each(function (index,item) {
        item.href=data['imgSrc'][index];
        $(item).find("img")[0].src=data['imgSrc'][index];
      })
      app.data.length=$box.find(".focus_item_img").length;
      $box.find(".slider_wrapper").width(app.data.length*app.data.width+10);
    },
    bind_event:function () {
      $box
        .delegate('.slider_control', 'click', function (e) {
          e.preventDefault();
          var _this = e.currentTarget;
          if ($(_this).hasClass("slider_control_next")) {
            app.data.currentIndex+=1;
          } else if ($(_this).hasClass("slider_control_prev")) {
            app.data.currentIndex-=1;
          }else{
            return;
          }
          app.jump();
        })
  /*      .delegate('.focus_item_lk','click',function (e) {
          console.log("点击focus_item_lk")
          e.preventDefault();
          clearTimeout(timer);
          app.data.isEnlarged=true;
        })*/
        .delegate('.slider_item',{
          "mouseenter": function(e){
            e.preventDefault();
            console.log("移入")
            clearTimeout(timer)
          },
          "mouseleave": function(e){
            e.preventDefault();
            console.log("移出")
            if(!app.data.isEnlarged)app.showtime();
          }
        })
    },
    showtime: function () {
      timer = setTimeout(function () {
        app.data.currentIndex+=1;
        app.jump();
        app.showtime();
      }, 2000) //每1.5秒
    },
    getIndex:function () {
      if (app.data.currentIndex==-1) {app.data.currentIndex=app.data.length-1;}
      if (app.data.currentIndex==app.data.length) {app.data.currentIndex=0;}
    },
    jump:function () {
      app.getIndex();
      console.log("jump",app.data.currentIndex)
      app.el.$ul.animate({left:-app.data.currentIndex*app.data.width},400);
    },
  }
  app.init();
}