$.fn.marquee = function(options) {
  // 可翻页
  // popup when click
  // 可以用 fancybox
  let imgList = options.imgList;
  let count = options.imgList.length - 1;
  let index = 0;
  let imgNode;
  let prev;
  let next;
  let link;
  function indexChange(direction) {
    if (direction === "prev") {
      if (index) {
        index--;
      } else {
        index = count;
      }
    } else {
      if (index == count) {
        index = 0;
      } else {
        index++;
      }
    }
    renderImg();
  }
  function renderImg() {
    imgNode.attr("src", imgList[index]);
    link.attr("href", imgList[index]);
  }
  function init(node) {
    node.html(`<div class='arrow-box'>
    <span class='prev' />
    <a data-fancybox class="fancybox"><img id='img-show' /></a>
    <span class='next' />
  </div>`);
    imgNode = $("#img-show");
    prev = $(".prev");
    next = $(".next");
    link = $(".fancybox");
    renderImg();
    prev.on("click", () => indexChange("prev"));
    next.on("click", () => indexChange("next"));
    link.fancybox({
      hideOnContentClick: true,
      hideOnOverlayClick: false
    });
  }
  init($(this));
};
