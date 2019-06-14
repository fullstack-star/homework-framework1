$(document).ready(function(){
  function init() {
    getHost();
    /*$(".focus_item_lk").fancybox({
     'transitionIn': 'none',
     'transitionOut': 'none',
     'titlePosition': 'over',
     'titleFormat': function (title, currentArray, currentIndex, currentOpts) {
     return '<span class="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
     }
     });*/
    // $(".focus_item_lk").fancybox({
    //   prevEffect: 'elastic',
    //   nextEffect: 'elastic',
    //   hideOnOverlayClick:false,
    //   helpers: {
    //     title: {
    //       type: 'inside'
    //     },
    //     thumbs: {
    //       width: 50,
    //       height: 50
    //     }
    //   }
    // });
  }
  function getHost(){
    // var deferred = $.Deferred();
    $.ajax({
      url:"./config/index.json",
      dataType:'json',
      type:"GET",
      success:function (data) {
        var host=data.host.static;
        setPicUrl(host)
        // deferred.resolve(host);
        }
    })
    // return deferred.promise()
  }
  function setPicUrl(host) {
    $.ajax({
      url:"./mock/getPicUrl.json",
      dataType:'json',
      type:"GET",
      success:function (data) {
        if(data.data.returnCode%1000===0){
          var list=data.data&&data.data.list||[];
          // var data=
          var imgSrc=[];
          list.forEach(function (item,index) {
            if(index<=2){
              imgSrc.push(host+item['url']);
            }
          })
          $('#marquee').marquee({
            imgSrc:imgSrc
          })
        }
      }
    })
  }
  $("body").delegate(".focus_item_img","click",function(e){
    e.preventDefault();
  });
  init();
});



