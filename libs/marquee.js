/**
 * 思路解释：
 * 所谓幻灯片控件，本质上就是处理以下问题：
 * 1. 图片的隐藏与显示
 * 2. 添加翻页按钮及相应点击事件
 * 3. 手动切换与定时自动切换
 */
$.fn.marquee = function(params) {
    let interval = params&&params.interval?params.interval:5000;    //自动切换时间，默认5秒
    let prevBtn = $('<button class="slider_control slider_control_prev">&lt;</button>')
    let nextBtn = $('<button class="slider_control slider_control_next">&gt;</button>')
    $(this).css({position: "relative", float: "left"}).append(prevBtn).append(nextBtn)

    let imgs = $(this).find("img")
    let wrappers = $(this).find("a").fancybox()
    let numOfImg = imgs.length
    let curIndex = 0
    //页面渲染
    const render = () => {
        imgs.hide()
        $(imgs[curIndex]).show()
    }
    //下一页
    const nextPage = () => {
        curIndex = curIndex+1<numOfImg?curIndex+1:0
        render()
    }
    //上一页
    const prevPage = () => {
        curIndex = curIndex-1>-1?curIndex-1:numOfImg - 1
        render()
    }

    //初始化
    render()

    //定义翻页事件
    prevBtn.click(prevPage)
    nextBtn.click(nextPage)

    //定时切换
    const autoChange = () => {
        setTimeout(()=>{
            nextPage()
            autoChange()
        }, interval)
    }
    autoChange()

    //方便链式调用
    return $(this)
}
