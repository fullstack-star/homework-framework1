$.fn.marquee = function (options) {
  // 目标节点
  let el = $(this);
  // 是否显示左右切换按钮
  let show_toggle_btn = options.show_toggle_btn || false;
  // 图片列表 不传默认给三张图
  let imgList = options.imgList || ['./img/1.jpg', './img/2.jpg', './img/3.jpg'];
  // 轮播时间间隔
  let loopTime = options.loopTime || 3 * 1000;
  // 图片长度
  let imgLen = imgList.length;
  // 轮播定时器
  let timer = null;
  // 当前轮播图
  let curIndex = 0;
  // html模版
  let html = "";

  // 生成html 并挂载
  function generateHtml() {
    if (show_toggle_btn === true) {
      html += '<div id="prev-btn"> 上一张 </div><div id="next-btn"> 下一张 </div>';
    }
    html += '<ul>'
    for (let img of imgList) {
      html += `
        <li><a href="${img}"><img src="${img}" alt=""></a></li>
      `
    }
    html += "</ul>"
    $(el).html(html)
    $(el).find("ul").width(imgLen * 100 + '%');
    $(el).find("li").width(100 / imgLen + '%')
  }

  generateHtml();

  // 切换上一张方法
  function prevAction() {
    if (curIndex < 0) {
      curIndex = imgLen - 1;
    }
    $(el).find("ul").animate({
      left: -100 * curIndex + '%'
    }, 10)
  }

  // 切换下一张方法
  function nextAction() {
    if (curIndex > imgLen - 1) {
      curIndex = 0;
    }
    $(el).find("ul").animate({
      left: -100 * curIndex + '%'
    }, 10)
  }

  // 定时轮播方法
  function timerAction() {
    timer = setInterval(() => {
      curIndex++;
      nextAction();
    }, loopTime)
  }

  // 清除定时器
  function clearTimer() {
    clearInterval(timer)
  }

  // 自适应
  function resizeWindow() {
    $(el).height($(el).find("ul").height())
  }

  // hover时轮播静止
  $(el).hover(function () {
    clearInterval(timer)
  }, function () {
    timerAction();
  })

  // 切换上一张
  $("#prev-btn").click(function () {
    curIndex--;
    prevAction()
  })

  // 切换下一张
  $("#next-btn").click(function () {
    curIndex++;
    nextAction();
  })

  // 点击查看大图
  $(el).find('a').fancybox({
    'titlePosition': 'over',
    'cyclic': true,
    'titleFormat': function (title, currentArray, currentIndex, currentOpts) {
      return '<span id="fancybox-title-over">' + (currentIndex + 1) +
        ' / ' + currentArray.length + (title.length ? '   ' + title : '') +
        '</span>';
    },
    afterShow: function (instance, current) {
      clearTimer();
    },
    afterClose: function (instance, current) {
      timerAction();
    }
  });

  $(window).resize(function () {
    resizeWindow()
  })

  $(window).load(function () {
    resizeWindow();
    timerAction();
  })
}