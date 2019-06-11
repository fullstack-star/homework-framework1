/**
 * 功能需求：
 * 可翻页、popup when click、可以用 fancybox
 * 输入：div包裹多个img标签
 * 输出：带左右bar的轮播图，点击可放大展示（使用fancybox插件）
 * 
 * 实现思路：提取输入元素，构造出新的DOM结构插入到页面中（单纯的div包裹img的结构很难实现上述需求，所以需要重新构造DOM结构）。
 */

$.fn.marquee = function () {
  var imgList = $(this).find('img'); //获取图片列表
  var index = 0; //图片下标
  // 格式化DOM结构
  var formattedDom = `
    <span class="arrow arrow_left">＜</span>
    <span class="arrow arrow_right">＞</span>
    <div class="content">`
  for (let i = 0, j = imgList.length; i < j; i++) {
    let src = $(imgList[i]).attr('src');
    let itemDom = `
      <a href="${src}" data-fancybox="images"><img src="${src}"></a>
    `
    formattedDom += itemDom;
  }
  formattedDom += `</div>`;
  $(this).html(formattedDom);

  // 绑定切换事件
  $('.arrow_left').on('click', function () {
    index > 0 &&
      $('.content').css({ 'transform': `translateX(${-600 * --index}px)` });
  })
  $('.arrow_right').on('click', function () {
    index < imgList.length - 1 &&
      $('.content').css({ 'transform': `translateX(${-600 * ++index}px)` });
  })

  // 设置fancybox相关属性
  $('[data-fancybox="images"]').fancybox({
    loop: true,
  })
}
