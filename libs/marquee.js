/**
 * 1. 容器marquee 在网页中的位置应该由使用者设置好
 * 2. 规定放入容器内的为 img标签
 * 3. 插件负责生成所有其他必要的元素
 */

$.fn.marquee = function() {
    // 保存上下文环境
    const that = this;

    // 1. 设置容器基础样式 让子元素不换行
    $(this).css({overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative'});

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
        .css({width: '42px', height: '42px', position: 'absolute', left: '30px', top: 0, bottom: 0, margin: 'auto 0'});
    const rightBtnHtml = $('<img class="my-right-btn" src="./assets/images/right-white-64.png" alt="left" />')
        .css({width: '42px', height: '42px', position: 'absolute', right: '30px', top: 0, bottom: 0, margin: 'auto 0'});
    $(this).append(leftBtnHtml, rightBtnHtml);

    // 6. 翻页
    $(this).on('click','.my-right-btn', () => {
        $(this).append($(this).children('.my-img').eq(0));
    });
    $(this).on('click','.my-left-btn', () => {
        $(this).prepend($(this).children('.my-img').eq(-1));
    });

    // 7. 弹窗预览大图
    $(this).on('click', '.my-img', function () {
        // 设置模态框背景css
        const myPopup = `position: fixed;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;`;

        // 设置图片 这里要判断下 宽高比是否合适
        let myPopupImg = '';
        const w = $(window).width(); // 屏幕宽
        const h = $(window).height(); // 屏幕高
        const rat = $(that).height()/$(that).width();
        if (w * 0.9 * rat > h) {
            myPopupImg += `width: ${h*0.9/rat}px; height: ${h*0.9}px;`;
        } else {
            myPopupImg += `width: ${w*0.9}px; height: ${w*0.9*rat}px;`;
        }
        myPopupImg += `background-size: cover;
            background-position: center center;
            position: relative;
            background-image: ${$(this).css('backgroundImage').replace('"', '')};`;

        // 设置关闭按钮
        const myClose = `width: 42px;
            position: absolute;
            top: -21px;
            right: -21px;`;

        const popupHtml = `<div class="my-popup" style="${myPopup}">
            <div class="my-popup-img" style="${myPopupImg}">
                <img class="my-close" style="${myClose}" src="./assets/images/close-white-64.png" alt="关闭">
            </div>
        </div>`;
        $('body').append(popupHtml);
    });

    // 8. 关闭弹窗
    $('body').on('click', '.my-popup .my-popup-img .my-close', function () {
        $(this).parent('.my-popup-img').parent('.my-popup').remove();
    })
};
