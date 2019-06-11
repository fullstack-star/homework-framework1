$.fn.marquee = function () {
  // 可翻页
  // popup when click
  // 可以用 fancybox
  let prevBtn = `<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="prev">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z" />
              </svg>
            </div>
          </button>`
  let nextBtn = `<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="next">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z" />
              </svg>
            </div>
          </button>`;
  let currentIndex = 0;
  let items = $('[data-marquee]')
  let len = items.length;

  function createBtn() {
    $("#marquee").append(prevBtn).append(nextBtn)

    $("[data-fancybox-next]").click(function () {
      currentIndex = currentIndex + 1 >= len ? 0 : currentIndex + 1
      render();
    })
    $("[data-fancybox-prev]").click(function () {
      currentIndex = currentIndex - 1 < 0 ? len - 1 : currentIndex - 1
      render();
    })
  }

  function render() {
    items.hide()
    $(items[currentIndex]).show()
  }

  render()
  createBtn()

  $('[data-marquee]').fancybox({
    buttons: ['close'], // 设置当点击图片popup放大时，只显示关闭操作按钮
    clickContent: function (current, event) {
      return false; //禁用图片缩放
    }
  });

}
