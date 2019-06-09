$.fn.marquee = function () {
  // 可翻页
  // popup when click
  // 可以用 fancybox
  const styles = {
    wrapper: {
      width: '600px',
      height: '300px',
      border: '1px solid',
      position: 'relative',
      overflow: 'hidden',
      'font-size': 0,
    },
    item: {
      width: '100%',
      height: '100%',
    }
  }

  const $this = $(this)

  $this.css(styles.wrapper)
  $this.find('img').css(styles.item)

  let itemX = 0
  let x = 0
  let len = 0

  $this.find('img').each((index, ele) => {
    const e = $(ele)
    if (!index) {
      itemX = e.width()
    }
    x += itemX
    len++
    e.css('width', itemX)
  })

  const contentStyle = {
    width: x,
    height: '100%',
    position: 'absolute',
    transition: 'all .3s',
  }

  const $content = $(`<div class="content">${$this.html()}</div>`)
  $content.css(contentStyle)
  $this.html($content)

  let currentIndex = 0

  const time = setInterval(() => {
    currentIndex = currentIndex === len ? 0 : currentIndex + 1
    $this.find('.content').css('transform', `translate3d(${currentIndex * itemX}px, 0px, 0px)`
    )
  }, 1000 * 2);
}


