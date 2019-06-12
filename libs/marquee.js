$.fn.marquee = function (config) {
  // 可翻页
  // popup when click
  // 可以用 fancybox

  const {
    interval = 2000,
      direction = 1,
      staticPath,
      data = []
  } = config

  const length = data.length;
  const container = $(this)
  const marqueeWidth = 800;
  let offsetLeft = 0;
  let timer = 0;

  init()

  function handleClick() {
    $('.prev').on('click', function () {
      change(-1);
    });
    $('.next').on('click', function () {
      change(1);
    });
  }

  function change(direction) {
    offsetLeft -= direction

    if (offsetLeft >= 1) {
      offsetLeft = -2
    }

    if (offsetLeft <= -length) {
      offsetLeft = 0
    }

    $('.next').removeClass('no-data');
    $('.prev').removeClass('no-data');
    $('.jq-carousel_content').css({
      'left': offsetLeft * marqueeWidth + 'px',
    });
  }

  // 鼠标移入暂停
  $('.jq-carousel_wrap').mouseover(function () {
    $('.jq-carousel_btn').addClass('show');
    clearInterval(timer)
  });
  // 鼠标移除开始
  $('.jq-carousel_wrap').mouseleave(function () {
    $('.jq-carousel_btn').removeClass('show');
    autoPlay()
  });

  function init() {
    render()
    handleClick()
    autoPlay()
  }

  function autoPlay() {
    timer = setInterval(() => {
      change(direction)
    }, interval);
  }

  function render() {
    let template = `<div class="jq-carousel_wrap">
    <button class="jq-carousel_btn prev">Prev</button>
    <button class="jq-carousel_btn next">Next</button>
    <div class="jq-carousel_content" style="width: ${data.length * 800}px;">
  `
    data.map(item => {
      template += `
      <a class="jq-carousel_item-link" href=${item.href} target="_blank">
      <div
      class="jq-carousel_item"
      style="background-image: url(${staticPath + item.img})"
      >
      <h3 class="jq-carousel_item-title">${item.title}</h3>
      <p class="jq-carousel_item-desc">${item.desc}</p>
      </div>
      </a>
      `
    })

    template += '</div></div>'

    $(container).html(template)
  }
}