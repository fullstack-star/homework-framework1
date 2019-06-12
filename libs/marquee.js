$.fn.marquee = function() {
  // 可翻页
  // popup when click
  // 可以用 fancybox

  var timer = null;
  
  $(function(){
    // 自动翻页
    auto();
  });

  function auto() {
    timer = setInterval(() => {
      pageDown(); 
    }, 2000);
  }

  $('.arrow_left').click(function() {
    // 左翻页
    pageUp();
  });

  function pageUp() {
    if ($('.container .imgs').position().left === 0) {
      $('.container .imgs').css('left', -2560);
    }
    $('.container .imgs').animate({left:"+=640px"}, 1000);
  }

  $('.arrow_right').click(function() {
    // 右翻页
    pageDown();
  });

  function pageDown() {
    if ($('.container .imgs').position().left === -2560) {
      $('.container .imgs').css('left', 0);
    }
    $('.container .imgs').animate({left:"-=640px"}, 1000);
  }

  // 鼠标移入移出
  $('.container').hover(function() {
    clearInterval(timer);
  },function() {
    auto();
  });
}
