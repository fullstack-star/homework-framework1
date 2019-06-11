(function ($) {
  // todo 图片弹出，autoplay，保证零配置的时候能够运行，事件绑定的代码优化
  let $wrapper, $slides
  let position = 0
  let isMoving = false
  const defaultConfig = {
    loop: true,
    speed: 300,
    navigation: {
      nextEl: '.button-next',
      prevEl: '.button-prev',
    }
  }
  const currentConfig = {}
  const carouselPlugin = {
    initCarousel: function (config) {
      Object.assign(currentConfig, defaultConfig, config)
      $slides = $(this).find('.slide')
      $wrapper = $(this).find('.wrapper')
      initNavigation(currentConfig.navigation)
      currentConfig.loop && initLoop()
      //currentConfig.popupImage && initImage()
    }
  }

  function initNavigation() {
    const {
      loop,
      navigation
    } = currentConfig
    const wrapperWidth = $wrapper.width()
    $(navigation.nextEl).click(function () {
      if (isMoving) return
      if (loop) {
        if (position === -(wrapperWidth * ($slides.length))) {
          switchToPos(position - wrapperWidth)
          return
        }
        if (position === -(wrapperWidth * ($slides.length + 1))) {
          setWrapperPos(-wrapperWidth)
          setTimeout(function () {
            switchToPos(position - wrapperWidth)
          }, 0)
          return
        }
      }
      if (position > -(wrapperWidth * (loop ? $slides.length : $slides.length - 1))) {
        switchToPos(position - wrapperWidth)
        return
      }
    })
    $(navigation.prevEl).click(function () {
      if (isMoving) return
      if (loop) {
        if (position === -wrapperWidth) {
          switchToPos(position + wrapperWidth)
          return
        }
        if (position === 0) {
          setWrapperPos(-(wrapperWidth * $slides.length))
          setTimeout(function () {
            switchToPos(position + wrapperWidth)
          }, 0)
          return
        }
      }
      if (position < loop ? -wrapperWidth : 0) {
        switchToPos(position + wrapperWidth)
        return
      }
    })
  }

  function initLoop() {
    $slides.first().clone().insertAfter($slides.last())
    $slides.last().clone().insertBefore($slides.first())
    setWrapperPos(-$wrapper.width())
  }

  function initImage() {
    for (let i = 0; i < $slides.length;i++) {
      $($slides[i]).attr('data-fancybox', 'images')      
    }    
    $('[data-fancybox="images"]').fancybox({
      loop: true,
    })
  }

  function switchToPos(pos) {
    isMoving = true
    setWrapperPos(pos)
    setTrasitionTime(currentConfig.speed)
    setTimeout(function () {
      isMoving = false
      setTrasitionTime()
    }, currentConfig.speed)
  }

  function setWrapperPos(pos) {
    position = pos    
    $wrapper.css('transform', `translate3d(${position}px, 0px, 0px)`)
  }

  function setTrasitionTime(time) {
    $wrapper.css('transition-duration', `${time || 0}ms`)
  }
  $.fn.extend(carouselPlugin)
})(jQuery)
