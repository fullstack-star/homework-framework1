const dataList = CAROUSEL_DATA
const config = {
  interval: 2000,
  direction: 1,
  staticPath: './images/',
  data: dataList
}

$(function () {
  $('#marquee').marquee(config)
})