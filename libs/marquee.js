$.fn.marquee = function (options) {
  var $rootEle = $(this)
  var $imgs = $rootEle.children('img') // 获得所有图片节点
  var $currentImg
  var currentIndex
  var maxIndex = $imgs.length
  var timer

  // 初始化
  $rootEle.addClass('marquee')

  if ($imgs.length) {
    changeImg(1)
    // 创建控制器DOM片段
    var controlDOMFragment = '<ul class="control">'
    for (var i = 0; i < $imgs.length; i++) {
      controlDOMFragment = controlDOMFragment + '<li class="control-item ' + (i === 0 ? 'active' : '') +
        '" data-index="' + i + '">' +
        (i + 1) +
        '</li>'
    }
    controlDOMFragment = controlDOMFragment + '</ul>'

    // 添加控制器
    $rootEle.append(controlDOMFragment)

    // 自动切换功能
    autoRunChangeImg()

    // 添加点击切换图片功能
    $rootEle.find('.control-item').click(function (e) {
      var controlItemEle = $(e.currentTarget)
      if (currentIndex !== controlItemEle.text()) {
        clearInterval(timer)
        $rootEle.find('.control-item').removeClass('active')
        currentIndex = controlItemEle.text()
        changeImg(currentIndex)
        controlItemEle.addClass('active')
        autoRunChangeImg()
      }
    })

    // 添加图片放大功能
    popup()
  }

  /**
   * 切换图片
   * @param index
   */
  function changeImg (index) {
    $currentImg = $($rootEle.children('img').get(index - 1)) // 获得第一张图片节点
    currentIndex = index
    $rootEle.find('.control-item').removeClass('active')
    $imgs.hide()
    $($rootEle.find('.control-item').get(index - 1)).addClass('active')
    $currentImg.show()
  }

  /**
   * 自动切换图片
   */
  function autoRunChangeImg () {
    var delay = options.delay || 1000
    var lastTime = (new Date()).valueOf()
    timer = setInterval(function () {
      var now = (new Date()).valueOf()
      if (now - lastTime >= delay) {
        lastTime = lastTime + delay
        if (currentIndex >= maxIndex) {
          currentIndex = 1
        } else {
          currentIndex++
        }
        changeImg(currentIndex)
      }
    }, 10)

  }

  /**
   * 放大图片功能
   */
  function popup () {
    // 添加点击放大图片效果
    $imgs.fancybox({
      beforeShow: function () {
        clearInterval(timer)
      },
      afterClose: function () {
        changeImg(currentIndex)
      },
    })
  }

  // popup when click
}
