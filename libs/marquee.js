/**
 * <a href="./img/pluck.png" data-fancybox="images">
    <img src="./img/pluck.png">
  </a>
 */

$.fn.marquee = function(src = []) {
  const $mq=$('#marquee')
  const ul = `<ul></ul>`
  const li = `<li></li>`
  const img = `<img />`
  const wapperWidth = $mq.width()
  const wapperHeight = $mq.height()

  if(src.length===0) return

  
  const subs = src.map(link => {
    const $li = $(li)
    $li.css({
      width: `${wapperWidth}px`,
      height: `${wapperHeight}px`,
      float:'left'
    })
    const $img = $(img)
    $img.css({
      width: `${wapperWidth}px`,
      height:`${wapperHeight}px`
    })
    $img.attr('src', link)
    $li.append($img)

    return $li
  })

  const $ul = $(ul)
  $ul.append(...subs)
  $ul.css({
    display: 'flex',
    // overflow: 'hidden'
    position: 'absolute',
    top:0,
    left:0,
    transform: 'translateX(0px)',
    transition: 'transform 0.3s ease'
  })

  $('#marquee').append($ul)

  let index = 0
  
  function setOffset(index){
    $ul.css({
      transform: `translateX(-${index*wapperWidth}px)`,
    })
  }

  const btn = `<button></button>`
  const $left = $(btn)
  const $right = $(btn)

  $left.html('left')
  $right.html('right')

  $left.on('click', function(e){
    if(index===0){
      index = src.length -1
    }else if(index === src.length -1){
      index = 0
    }else {
      index -= 1
    }

    setOffset(index)
  })

  $right.on('click', function(e){
    if(index===0){
      index = src.length -1
    }else if(index === src.length -1){
      index = 0
    }else {
      index += 1
    }

    setOffset(index)
  })

  $(document.body).append($left, $right)
}
