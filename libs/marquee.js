const faceyboxType ="gallery"

$.fn.marquee = function(ops) {
  const { times = 5 } = ops || {}
  // 设置fancybox的点击效果
  const imgs = this.find("img")
  let childs = Array.from(imgs).map((d, i) => {
    const src = d.attributes["src"].value
    const aEl = document.createElement("a")
    aEl.setAttribute("href", src)
    aEl.setAttribute("data-fancybox", faceyboxType)
    aEl.setAttribute("data-caption", `gallery-${i}`)
    aEl.append(d) 
    return aEl
  })
  // 清空原有的图片，添加带有点击放大效果的图片
  this.empty()
  this.append(childs)

  let rightBtn = `<button class="fancybox-button fancybox-button--arrow_right" title="Next"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"></path></svg></div></button>`
  let leftBtn = `<button class="fancybox-button fancybox-button--arrow_left" title="Previous" disabled=""><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"></path></svg></div></button>`
  // 左右箭头
  debugger
  // 可翻页
  // popup when click
  // 可以用 fancybox
}
