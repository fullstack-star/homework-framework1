/**
 * <a href="./img/pluck.png" data-fancybox="images">
    <img src="./img/pluck.png">
  </a>
 */

$.fn.marquee = function(src = []) {
  const ul = `<ul></ul>`
  const li = `<li></li>`
  const img = `<img />`

  if(src.length===0) return

  
  const subs = src.map(link => {
    const $li = $(li)
    $li.css({
      width: '400px',
      // flex: '0 0 400px',
      height: '200px',
      float:'left'
    })
    const $img = $(img)
    $img.css({
      width: '400px',
      height: '200px'
    })
    $img.attr('src', link)
    $li.append($img)

    return $li
  })

  const $ul = $(ul)
  $ul.append(...subs)
  $ul.css({
    // display: 'flex',
    // overflow: 'hidden'
  })

  $('#marquee').append($ul)
}
