/**
 * 1. 容器marquee 在网页中的位置应该由使用者设置好
 * 2. 规定放入容器内的为 img标签
 * 3. 插件负责生成所有其他必要的元素
 */

$.fn.marquee = function() {
    // 1. 设置容器基础样式 让子元素不换行
    $(this).css({overflow: 'hidden', whiteSpace: 'nowrap', position: 'reletive'});

    // 2. 避免图片失真 将图片变成背景图
    const urls = Array.from($(this).children('img').map((i, item) => {
        return `width: ${$(this).width()}px;
        height: ${$(this).height()}px;
        background-size: cover;
        background-position: center center;
        background-image: url(${$(item).attr('src')});`
    }));

    // 3. 清空容器
    $(this).empty();

    // 4. 将背景图添加到容器内
    const imgBgHtml = urls.reduce((sum, item) => sum += `<div class="my-img" style="${item}"></div>\n`, '');
    $(this).append(imgBgHtml);

    // 5. 添加左右按钮
    const leftBtnHtml = $('<img class="my-left-btn" src="./assets/images/left-white-64.png" alt="left" />')
        .css({width: '42px', height: '42px', position: 'absolute', left: '40px', top: 0, bottom: 0, margin: 'auto 0'});
    const rightBtnHtml = $('<img class="my-right-btn" src="./assets/images/right-white-64.png" alt="left" />')
        .css({width: '42px', height: '42px', position: 'absolute', right: '40px', top: 0, bottom: 0, margin: 'auto 0'});
    $(this).append(leftBtnHtml, rightBtnHtml);

    // 6. 翻页
    $(this).children('.my-right-btn').click(() => {
        $(this).append($(this).children('.my-img').eq(0));
    });
    $(this).children('.my-left-btn').click(() => {
        $(this).prepend($(this).children('.my-img').eq(-1));
    });

    // 7. 弹窗预览大图 待完成

    // 8. 关闭弹窗 待完成

  // 可翻页
  // popup when click
  // 可以用 fancybox
}
