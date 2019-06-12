$.fn.marquee = function(options) {
  const opts = Object.assign({
    selector: ".img",
    pageChange: noop,
    onOpen: noop,
    onClose: noop
  }, options)

  let currentIndex;
  let currentSrc;
  const displayImg = $("#display-img");
  const imgList = $(opts.selector);
  const imgCount = imgList.length;
  const prev = $("#prev");
  const next = $("#next");
  const modal = $("#modal");
  const modalCloseButton = $("#close");

  const urlCache = imgList.map((index, element) => {
    return $(element).attr("src")
  });

  imgList.on("click", function() {
    currentIndex = imgList.index($(this));
    modal.show();
    opts.onOpen()
    setSrc()
  })


  prev.on("click", function() {
    if (currentIndex) { // currentIndex大于0，也就是说当前为第一个
      currentIndex--
      setSrc()
      opts.pageChange(currentIndex, currentSrc)
    }
  })

  next.on("click", function() {
    if (currentIndex < imgCount-1) {
      currentIndex++
      setSrc()
      opts.pageChange(currentIndex, currentSrc)
    }
  })

  modalCloseButton.on("click", function() {
    modal.hide();
    opts.onClose()
  })

  function setSrc() {
    let src = getSrc()
    currentSrc = src
    displayImg.attr("src", src)
  }

  function getSrc() {
    return urlCache[currentIndex];
  }

  // 可翻页
  // popup when click
  // 可以用 fancybox
}

const noop = function() {}
