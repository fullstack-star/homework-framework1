/**
 * @param {Array} 轮播图片数据
 * @param {Object} 配置参数
 */
$.fn.marquee = function (data, options) {
  if (!data instanceof Array) return
  if (typeof options !== 'object') return
  var count = 0
  var timer
  var config = {
      interval: options.interval || 2000
  }
  var methods = {
      // 自动轮播初始化
      init: function () {
          timer = setInterval(function () {
              count++
              methods.render()
          }, config.interval)
      },
      // 更新数据
      render: function () {
          console.log(count)
          count = count % data.length
          $('#marquee a').attr('href', data[count]);
          $('#marquee a img').attr('src', data[count]);
      },
      next: function () {
          count += 1
          this.render()
      },
      prev: function () {
          count = count ? count - 1 : data.length - 1
          this.render()
      }
  }
  //  点击下一张
  $(".control-btn.next").on('click', function () {
      console.log('next')
      clearInterval(timer)
      methods.next()
  })
  // 点击上一张
  $(".control-btn.prev").on('click', function () {
      console.log('prev')
      clearInterval(timer)
      methods.prev()
  })
  // 绑定fancybox
  $.each($("#marquee a"), function (indexInArray, valueOfElement) {
      $(valueOfElement).fancybox()
  });
  // 鼠标移入暂停
  $('#marquee').mouseover(function () {
      console.log('鼠标移入暂停播放')
      clearInterval(timer)
  });
  // 鼠标移除开始
  $('#marquee').mouseleave(function () {
      console.log('鼠标移除开始播放')
      methods.init()
  });
  methods.init()
}