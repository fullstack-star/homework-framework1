$.fn.marquee = function () {
  // 可翻页
  // popup when click
  // 可以用 fancybox
  let imgList = ['./img/1.jpg', './img/2.jpg', './img/3.jpg'];
  let imgLen = imgList.length;
  let timer = null;
  let curIndex = 0;
  let html = "";
  for (let img of imgList) {
    html += `
      <li><a href="${img}"><img src="${img}" alt=""></a></li>
    `
  }
  $('#marquee ul').html(html).width(imgLen * 100 + '%');
  $('#marquee li').width(100 / imgLen + '%')
  // 固定按钮位置
  setTimeout(() => {
    resizeWindow();
  }, 100)

  $("#marquee").hover(function () {
    clearInterval(timer)
  }, function () {
    timerAction();
  })

  $("#prev-btn").click(function () {
    curIndex--;
    prevAction()
  })

  $("#next-btn").click(function () {
    curIndex++;
    nextAction();
  })

  function prevAction() {
    if (curIndex < 0) {
      curIndex = imgLen - 1;
    }
    $("#marquee ul").animate({
      left: -100 * curIndex + '%'
    }, 10)
  }

  function nextAction() {
    if (curIndex > imgLen - 1) {
      curIndex = 0;
    }
    $("#marquee ul").animate({
      left: -100 * curIndex + '%'
    }, 10)
  }

  function timerAction() {
    timer = setInterval(() => {
      curIndex++;
      nextAction();
    }, 3000)
  }


  $("#marquee a").fancybox({
    'titlePosition': 'over',
    'cyclic': true,
    'titleFormat': function (title, currentArray, currentIndex, currentOpts) {
      return '<span id="fancybox-title-over">' + (currentIndex + 1) +
        ' / ' + currentArray.length + (title.length ? '   ' + title : '') +
        '</span>';
    },
    afterShow: function (instance, current) {
      clearInterval(timer)
    },
    afterClose: function (instance, current) {
      timerAction();
    }
  });


  $(window).load(function () {
    timerAction();
  })

  function resizeWindow() {
    $("#marquee").height($("#marquee ul").height())
  }

  $(window).resize(function () {
    resizeWindow()
  })
}