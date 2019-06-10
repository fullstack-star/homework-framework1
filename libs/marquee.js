$.fn.marquee = function() {
  let $this = $(this)
  $('.content a').first().clone().appendTo($('.content'))
  let $sContent = $('.content')
  let $prev = $this.children('.prev')
  let $next = $(this).children('.next')
  let nums = $sContent.children().length
  let index = 0
  let distance = 520
  let timer = null
  let againTimer = null
  function scroll() {
    $sContent.animate({'left':`-${distance *(index%nums)}`})
    if (index % nums == nums - 1) {
      $sContent.animate({'left':0}, 0)
      index++
    }
  }

  function stopScroll() {
    clearInterval(timer)
  }

  function auto() {
    stopScroll()
    timer = setInterval(function() {
      index++
      scroll()
    }, 2000)
  }

  function again() {
    clearTimeout(againTimer)
    againTimer = setTimeout(function() {
      auto()
    }, 6000)
  }

  auto()
  $sContent.bind('click', function() {
    stopScroll()
  })

  $prev.bind('click' , function(e) {
    stopScroll()
    index--
    index = index > 0 ? index : 0
    if (index % nums == nums - 1) {
      $sContent.animate({'left':0}, 0)
      index++
    } else {
      scroll()
    }
    
    again()
  })

  $next.bind('click', function(e) {
    stopScroll()
    index++
    scroll()
    again()
  })

  $('[data-fancybox]').fancybox({
    afterClose: function() {
      again()
    }
	})
}
