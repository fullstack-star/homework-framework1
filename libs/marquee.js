$.fn.marquee = function(imgs, options) {
  // 可翻页
  // popup when click
  // 可以用 fancybox

  /****点击弹出放大图，翻页，翻页节流，动画效果，无缝轮播**************************** */
  //数据初始化
  const container = this;
  let opts = {
    zoom: options.zoom || 1.4, //点击弹出的放大倍数
    infinite: options.animateEffect || false, //有动画效果则无缝轮播
    auto: options.auto || false, //自动播放
    interval: options.interval || 2000, //自动播放时间间隔
    animateEffect: options.animateEffect || null //动画效果：速度和动作曲线
  };
  const $t = $(this);
  $t.css("overflow", "hidden");
  let curIndex = 0;
  let len = 0;
  let timer = null;
  let isZoom = false;
  //是否无缝
  if (opts.infinite) {
    len = imgs.length + 2;
    curIndex = 1;
  } else {
    len = imgs.length;
  }
  //是否自动切换
  if (opts.auto) {
    autoChange();
  }
  //样式初始化
  //横向容器样式
  var boxStyle = {
    width: $t.width() * len + "px",
    height: "100%",
    position: "relative",
    left: "-" + $(container).width() * curIndex + "px"
  };
  //每幅图样式
  var itemStyle = {
    display: "block",
    float: "left",
    width: $t.width() + "px",
    height: $t.height() + "px"
  };
  //每幅图文字说明样式
  var itemTxtStyle = {
    "text-decoration": "none",
    color: "#111",
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "10%",
    "line-height": $t.height() * 0.1 + "px",
    "background-color": "rgba(255,255,255,.2)"
  };
  //翻页按钮样式
  var btnStyle = {
    position: "absolute",
    top: "50%",
    transform: "translate(0,-50%)",
    color: "#fff",
    "font-size": "30px",
    "text-align": "center"
  };

  //创建和添加新节点
  //添加横向容器
  const box = appendFunc("div", boxStyle, $t);
  //添加每幅图和文字,绑定点击弹出事件
  appendItem();
  //添加翻页按钮
  const leftBtn = appendFunc("span", btnStyle, $(container));
  const rightBtn = appendFunc("span", btnStyle, $(container));
  $(leftBtn)
    .html("<")
    .css("left", 0)
    .click(throttle(leftClick, opts.animateEffect.speed * 1.2));
  $(rightBtn)
    .html(">")
    .css("right", 0)
    .click(throttle(rightClick, opts.animateEffect.speed * 1.2));

  $t.mouseenter(stopAutoChange).mouseleave(autoChange);
  //函数
  //添加节点，样式
  function appendFunc(tag, style, parent) {
    const temp = document.createElement(tag);
    $(temp)
      .css(style)
      .appendTo(parent);
    return temp;
  }
  //添加item时的无缝处理
  function itemInfinite(i) {
    let bgi = {};
    let data = {};
    if (opts.infinite) {
      if (i === 0) {
        bgi["background"] = `url(${imgs[len - 3].src}) no-repeat`;
        data["txt"] = imgs[len - 3].txt;
        data["url"] = imgs[len - 3].url;
      } else if (i === len - 1) {
        bgi["background"] = `url(${imgs[0].src}) no-repeat`;
        data["txt"] = imgs[0].txt;
        data["url"] = imgs[0].url;
      } else {
        bgi["background"] = `url(${imgs[i - 1].src}) no-repeat`;
        data["txt"] = imgs[i - 1].txt;
        data["url"] = imgs[i - 1].url;
      }
    } else {
      bgi["background"] = `url(${imgs[i].src}) no-repeat`;
      data["txt"] = imgs[i].txt;
      data["url"] = imgs[i].url;
    }
    return { bgi: bgi, data: data };
  }
  //添加图片
  function appendItem() {
    for (let i = 0; i < len; i++) {
      let { bgi, data } = itemInfinite(i);
      bgi["background-size"] = "100% 100%";
      const item = appendFunc("div", Object.assign(itemStyle, bgi), $(box));
      const txt = appendFunc("a", itemTxtStyle, $(item));
      $(txt)
        .html(data.txt)
        .attr("href", data.url);
      $(item).click(function(e) {
        zoomFunc(e, $(item));
      });
    }
  }
  //点击弹出
  function zoomFunc(e, parent) {
    clearInterval(timer);
    if (e.target.tagName != "A") {
      isZoom = true;
      //弹出框样式
      const zoomBoxBtnStyle = {
        width: "40px",
        height: "40px",
        position: "absolute",
        right: "-27px",
        top: "-28px",
        "font-size": "30px",
        "text-align": "center",
        "line-height": "40px",
        color: "#fff",
        "background-color": "#000",
        border: "2px solid #fff",
        "border-radius": "50%"
      };
      const zoomBoxStyle = {
        width: parent.width() * opts.zoom + "px",
        height: parent.height() * opts.zoom + "px",
        position: "absolute",
        "z-index": "2",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        border: "10px solid #fff",
        "background-image": parent.css("backgroundImage"),
        "background-repeat": "no-repeat",
        "background-position": "center",
        "background-size": "90% 90%"
      };
      const zoomBgStyle = {
        width: "100%",
        height: "100%",
        position: "fixed",
        "z-index": "99",
        "background-color": "rgba(0,0,0,.5)"
      };
      const zoomBg = appendFunc("div", zoomBgStyle, $("body"));
      const zoomBox = appendFunc("div", zoomBoxStyle, $(zoomBg));
      const zoomBoxBtn = appendFunc("div", zoomBoxBtnStyle, $(zoomBox));
      $(zoomBoxBtn).html("X");
      $(zoomBg).click(function() {
        isZoom = false;
        autoChange();
        $(this).remove();
      });
    }
  }
  //序号减小(点击向左按钮)，切换图片
  function leftClick() {
    curIndex--;
    switchImg();
  }
  //序号增大(点击向右按钮)，切换图片
  function rightClick() {
    curIndex++;
    switchImg();
  }
  //序号边界处理
  function indexCal() {
    if (opts.infinite) {
      if (curIndex > len - 2) {
        curIndex = 1;
        $(box).css("left", "-" + $(container).width() * curIndex + "px");
      } else if (curIndex < 1) {
        curIndex = len - 2;
        $(box).css("left", "-" + $(container).width() * curIndex + "px");
      }
    } else {
      if (curIndex > len - 1) {
        curIndex = 0;
      } else if (curIndex < 0) {
        curIndex = len - 1;
      }
    }
  }
  //根据序号切换图片
  function switchImg() {
    if (opts.animateEffect) {
      $(box).animate(
        { left: "-" + $(container).width() * curIndex + "px" },
        opts.animateEffect.speed,
        opts.animateEffect.easing,
        indexCal
      );
    } else {
      indexCal();
      $(box).css("left", "-" + $(container).width() * curIndex + "px");
    }
  }
  //自动运行
  function autoChange() {
    if (!isZoom) {
      timer = setInterval(() => {
        rightClick();
      }, opts.interval);
    }
  }
  //停止自动运行
  function stopAutoChange() {
    clearInterval(timer);
  }
  //节流
  function throttle(cb, t) {
    let prev = Date.now();
    return () => {
      let now = Date.now();
      if (now - prev >= t) {
        cb();
        prev = now;
      }
    };
  }
};
