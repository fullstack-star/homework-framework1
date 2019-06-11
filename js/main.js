const imgs = [
  { src: "./images/1.jpg", txt: "1111", url: "https://www.baidu.com" },
  { src: "./images/2.jpg", txt: "2222", url: "https://www.baidu.com" },
  { src: "./images/3.jpg", txt: "3333", url: "https://www.baidu.com" }
];
const opts = {
  zoom: 1.5,
  auto:true,
  interval:1500,
  animateEffect:{
    speed:700,
    easing:'swing'
  }
};
$("#marquee").marquee(imgs, opts);
