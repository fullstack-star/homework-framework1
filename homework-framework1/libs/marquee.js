$.fn.marquee = function() {
  // 可翻页
  var _currentIndex = 0;
  var $imgWrapper = $(".img-wrapper");
  var $img = $(".img-wrapper img");
  var _imgNum = $img.length;
  var $dot = $(".dots>li");
  var _step = 500;
  var _distance = 0;
  var wrapper = this;
  console.log($dot);


  this.slider = function(direction,index){
    console.log(direction+" -- "+index);
    _distance = direction * _step * index;
    $imgWrapper.animate({"left":_distance+"px"});

  }
  this.dotChange = function(index){
    $dot.each(function(index,ele){
      $(ele).removeClass("current");
    });
    $dot.eq(index).addClass("current");
  }

  $dot.each(function(index,ele){
    $(ele).on("click",function(){
      wrapper.dotChange(index);
      wrapper.slider(-1,index);
    
    });
  });

  $("#next").on("click",function(){
    if(_currentIndex < _imgNum - 1){
      _currentIndex++;
    }else{
      _currentIndex = 0;
    }
    wrapper.slider(-1,_currentIndex);
    wrapper.dotChange(_currentIndex)
  });

  $('#prev').on('click',function(){
    if(_currentIndex > 0){
      _currentIndex--;
    }else{
      _currentIndex = _imgNum - 1;
    }
    wrapper.slider(-1,_currentIndex);
    wrapper.dotChange(_currentIndex)
  })



  // popup when click
  // 可以用 fancybox
}
