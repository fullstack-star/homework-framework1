const faceyboxType = "gallery"
// 右箭头的dom字符串
const rightBtnStr = `<button class="fancybox-button fancybox-button--arrow_right" title="Next">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"></path>
    </svg>
  </div>
</button>`
// 左箭头的dom字符串
const leftBtnStr = `<button class="fancybox-button fancybox-button--arrow_left" title="Previous" disable="">
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"></path>
    </svg>
  </div>
</button>`
// 方向值的枚举
const directionType = {
  left: 0,
  right: 1,
}

// 轮播插件的实现
$.fn.marquee = function (ops) {
  const { times = 1000, width } = ops || {} // 用户传入参数
  if (!width) {
    return
  }
  let currentTranslateX = 0 // 当前轮播的滚动
  const imgs = this.find("img")
  const imgsLen = imgs.length // 总共有多少个图片

  // 设置fancybox的点击效果
  let childs = setFancyBox(Array.from(imgs))
  // 清空原有的图片，添加带有点击放大效果的图片
  this.empty()
  this.append(childs)
  // 创建左右箭头的dom
  let rightBtn = $(rightBtnStr)
  let leftBtn = $(leftBtnStr)
  // 设置左右箭头的样式
  rightBtn = setBtnCss(rightBtn, directionType.right, 22)
  leftBtn = setBtnCss(leftBtn, directionType.left, 22)

  // 添加左右按钮
  this.parent().append(rightBtn)
  this.parent().append(leftBtn)

  // 添加按钮的点击事件
  leftBtn.on('click', () => {
    let p
    if (currentTranslateX === 0) {
      p = currentTranslateX = -(imgsLen - 1) * width
    } else {
      p = currentTranslateX += width
    }
    $(this).css({
      transform: 'translateX(' + p + 'px)'      // 通过index换算出我们需要的位移，动态传入
    })
  })
  rightBtn.on('click', () => {
    let p
    if (currentTranslateX <= -(imgsLen - 1) * width) {
      p = currentTranslateX = 0
    } else {
      p = currentTranslateX -= width
    }
    $(this).css({
      transform: 'translateX(' + p + 'px)'      // 通过index换算出我们需要的位移，动态传入
    })
  })
}

function setFancyBox(imgs) {
  return imgs.map((d, i) => {
    const src = d.attributes["src"].value
    const aEl = document.createElement("a")
    aEl.setAttribute("href", src)
    aEl.setAttribute("data-fancybox", faceyboxType)
    aEl.setAttribute("data-caption", `gallery-${i}`)
    aEl.append(d)
    return aEl
  })
}

function setBtnCss(btnDOM, direction, width) {
  if (!btnDOM || !width) {
    return
  }
  btnDOM.css("position", "absolute")
  if (direction === directionType.left) {
    btnDOM.css("left", "0")
  } else {
    btnDOM.css("right", "0")
  }
  btnDOM.css("top", `calc(50% - ${width}px)`)
  return btnDOM
}
