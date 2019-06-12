$.fn.marquee = function() {
  // 可翻页
  var clientWidth = parseFloat(document.documentElement.clientWidth);
  var btnPre = $("<button class='btn-pre'><</button>");
  var btnNext = $("<button class='btn-next'>></button>");
  var self = this;
  var moveLock = false;
  var moveImg = function(dir){
    
    if(moveLock){
      return;
    }
    moveLock = true;
    var waitSec = 1000;
    setTimeout(function(){
      moveLock = false;
    },waitSec);
    //dir 1 向后 0向前
    var img0 = $("img").eq(0);
    var flag = dir == 1?-1:1;
    var marginLeftNew = parseFloat(img0.css("marginLeft")) + clientWidth*flag;
    
    if(marginLeftNew >= -clientWidth*($(self).find("img").length-1) && marginLeftNew<=0){
      img0.css({
        marginLeft:marginLeftNew
      });  
    }
  }

  btnPre.on("click",function(){
    moveImg(-1);
  });
  btnNext.on("click",function(){
    moveImg(1);
  });

  self.find("img").on("click",function(){
    $("#mask img").attr("src",$(this).attr("src"));
    $("#mask").removeClass("hide");
  });
  $("#mask .close").on("click",function(){
    $("#mask").addClass("hide");
  });
  $(this).append(btnPre);
  $(this).append(btnNext);
  $(this).css({
    // whiteSpace:'nowrap',
    // width:clientWidth,
    // overflow:'hidden'
  });
  $(this).find("img").css({
    // width:clientWidth,
  });
  // popup when click
  // 可以用 fancybox
}
