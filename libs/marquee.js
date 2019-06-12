(function ($) {
  var initSwiper = function (setting) {
    new Swiper(setting.eleName, setting)
  }
  var methods = {
    init: function (options) {
      var $this = $(this)
      var defaultOpt = {
        eleName: '',
        clickFn: null,
      }

      var setting = $.extend(defaultOpt, options)
      initSwiper(setting)
    }
  }

  // $('xx').('方法名')
  $.fn.marquee = function () {
    // 幻灯片
    // 可翻页
    // 可以用 fancybox
    var method = arguments[0]
    if (methods[method]) {
      method = methods[method]
      arguments = Array.prototype.slice.call(arguments, 1)
    } else if (typeof (method) == 'object' || !method) {
      method = methods.init // 默认init
    } else {
      $.error('Method' + method + 'does not exist')
      return this
    }
    return method.apply(this, arguments)
  }

})(jQuery)