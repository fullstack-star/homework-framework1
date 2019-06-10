/**
 * @param {number} options.width 宽度
 * @param {number} options.height 高度
 * @param {number} options.speed 轮播滑动速度
 * @param {boolean} isAuto 是否自动播放
 * @param {boolean} showArrow 是否显示切换箭头
 * @param {boolean} showDot 是否显示切换圆点
 */
$.fn.marquee = function(options) {
    var temp = {
        index: 0,
        timer: null,
        flag: true
    }
    options = typeof options === 'object' ? options : {}
    options.width = options.width ? options.width : 800
    options.height = options.height ? options.height : 500
    options.speed = options.speed ? options.speed : 1000
    options.size = $(this).find('img').length
    temp = Object.assign(temp, options)

    initStyle(this, options)

    if(options.showArrow) {
        $(this).append(renderArrow())
        arrowChange(temp)
    }

    if(options.showDot) {
        $(this).append(renderDot(options.size))
        dotChange(temp)
    }

    if(options.isAuto) {
        temp.timer = setInterval(() => {
            temp.index += 1
            playSlide(temp)
        }, 3000)
    }
}

// 初始化轮播样式
function initStyle(target, options) {
    var wrapper = $(target).css({'width': options.width, 'height': options.height})
    .find('.marquee-wrapper').css({'width': options.width * (options.size + 1), 'left': 0})
    
    wrapper.find('a').css('width', options.width)
}

// 渲染切换箭头
function renderArrow() {
    return $('<div class="marquee-arrow">'
    +'<a href="javascript:;" class="arrow-item prev" id="arrow-prev">&lt</a>'
    +'<a href="javascript:;" class="arrow-item next" id="arrow-next">&gt</a>'
    +'</div>')
}

// 箭头切换
function arrowChange(params) {
    $('#arrow-prev').click(function() {
        clearInterval(params.timer)
        params.flag && params.index--
        playSlide(params)
    })
    $('#arrow-next').click(function() {
        clearInterval(params.timer)
        params.flag && params.index++
        playSlide(params)
    })
}

// 渲染切换圆点
function renderDot(size) {
    var arr = new Array(size + 1).join(' ').split('')
    var dotNodes = arr.map((t, index) => index === 0 ? '<a href="javascript:;" class="dots-item dots-active"></a>' : '<a href="javascript:;" class="dots-item"></a>').join('')
    
    return $('<div class="marquee-dots">'
    + dotNodes
    +'</div>')
}

// 圆点切换
function dotChange(params) {
    $('.marquee-dots a').click(function(){
        clearInterval(params.timer)
        params.index = $(this).index()
        playSlide(params)
    })
}

// 轮播滑动
function playSlide(params) {
    if(!params.flag) return
    params.flag = false
    
    var picWrapper = $('.marquee-wrapper'),
        dots = $('.marquee-dots a'),
        picWidth = params.width,
        size = params.size,
        index = params.index;
        
    dots.removeClass('dots-active').eq(index%size).addClass('dots-active')
    picWrapper.stop().animate({
        left: - (index) * picWidth
    }, params.speed, function() {
        params.flag = true
        // 检测是否是最后一张
        if(index == size) {
            params.index = 0
            picWrapper.css('left', 0)
        }
        // 检测是否是第一张
        if(index == -1){
            params.index = size-1
            picWrapper.css('left', - (size-1) * picWidth+'px')
        }
    })
}
