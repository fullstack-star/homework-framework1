// 可翻页
// popup when click
// 可以用 fancybox
;(function ($) {
    $.fn.marquee = function (opt) {
        var opt = opt === void 0 ? {} : opt;
        var defaults = {
            'autoPlay': 3000,
        };
        return this.each(function () {
            if (opt.autoPlay !== false) {
                opt.autoPlay = $.isNumeric(opt.autoPlay) ? ~~opt.autoPlay : defaults.autoPlay;
            }
            var settings = $.extend({}, defaults, opt);
            var oContainer = $(this);
            var aWrap = oContainer.find('.wrap');
            var aImg = aWrap.find("img");
            var aChild = aWrap.find("li");
            var oPrev = oContainer.find(".btn-prev");
            var oNext = oContainer.find(".btn-next");
            var timer = play = null;
            var index = 0;
            // 自动播放函数
            function autoPlay() {
                play = setInterval(function () {
                    index++;
                    index >= aImg.length && (index = 0);
                    show(index)
                }, settings.autoPlay);
            }
            // 自动播放
            settings.autoPlay && autoPlay();
            // 图片切换
            function show(idx) {
                index = idx;
                index >= aImg.length && (index = 0);
                index < 0 && (index = aImg.length - 1);
                alpha = 0;
                aChild.hide().eq(index).show();
                clearInterval(timer);
            }
            oContainer.hover(function () {
                // 鼠标划过关闭定时器
                clearInterval(play);
            }, function () {
                // 鼠标离开启动自动播放
                autoPlay();
            });
            // 上一页
            oPrev.on('click', function () {
                index--;
                show(index);
            });
            // 下一页
            oNext.on('click', function () {
                index++;
                show(index);
            });
            aChild.fancybox({
                beforeShow: function () {
                    clearInterval(play);
                },
                afterClose: function () {
                    show(index);
                    settings.autoPlay && autoPlay();
                },
            });
        });
    }
})(jQuery);