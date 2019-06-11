$.fn.marquee = function() {
  // 可翻页
  // popup when click
  // 可以用 fancybox
    var imgCount = 5;
    var index = 1;
    var intervalId;
    var buttonSpan = $('.pointer')[0].children;//htmlCollection 集合
    //自动轮播功能 使用定时器
    autoNextPage();
    function autoNextPage(){
        intervalId = setInterval(function(){
            nextPage(true);
        },2000);
    }
    //当鼠标移入 停止轮播
    $('.container').mouseover(function(){
        console.log('hah');
        clearInterval(intervalId);
    });
    // 当鼠标移出，开始轮播
    $('.container').mouseout(function(){
        autoNextPage();
    });
    //点击下一页 上一页的功能
    $('.left').click(function(){
        nextPage(true);
    });
    $('.right').click(function(){
        nextPage(false);
    });
    //小圆点的相应功能  事件委托
    clickButtons();
    function clickButtons(){
        var length = buttonSpan.length;
        for(var i=0;i<length;i++){
            buttonSpan[i].onclick = function(){
                $(buttonSpan[index-1]).removeClass('on');
                if($(this).attr('index')==1){
                    index = 5;
                }else{
                    index = $(this).attr('index')-1;
                }
                nextPage(true);

            };
        }
    }
    function nextPage(next){
        var targetLeft = 0;
        //当前的圆点去掉on样式
        $(buttonSpan[index-1]).removeClass('on');
        if(next){//往后走
            if(index == 5){//到最后一张，直接跳到第一张
                targetLeft = 0;
                index = 1;
            }else{
                index++;
                targetLeft = -600*(index-1);
            }

        }else{//往前走
            if(index == 1){//在第一张，直接跳到第五张
                index = 5;
                targetLeft = -600*(imgCount-1);
            }else{
                index--;
                targetLeft = -600*(index-1);
            }

        }
        $('.list').animate({left:targetLeft+'px'});
        //更新后的圆点加上样式
        $(buttonSpan[index-1]).addClass('on');

    }
    $('.images').click(function(){
        debugger;
        clearInterval(intervalId);
        var _this = $(this);//将当前的元素作为_this传入函数
        imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
    });
    function imgShow(outerdiv, innerdiv, bigimg, _this){
        var src = _this.attr("src");//获取当前点击的pimg元素中的src属性
        $(bigimg).attr("src", src);//设置#bigimg元素的src属性
        /*获取当前点击图片的真实大小，并显示弹出层及大图*/
        $("<img/>").attr("src", src).load(function(){
            var windowW = $(window).width();//获取当前窗口宽度
            var windowH = $(window).height();//获取当前窗口高度
            var realWidth = this.width;//获取图片真实宽度
            var realHeight = this.height;//获取图片真实高度
            var imgWidth, imgHeight;
            var scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

            if(realHeight>windowH*scale) {//判断图片高度
                imgHeight = windowH*scale;//如大于窗口高度，图片高度进行缩放
                imgWidth = imgHeight/realHeight*realWidth;//等比例缩放宽度
                if(imgWidth>windowW*scale) {//如宽度扔大于窗口宽度
                    imgWidth = windowW*scale;//再对宽度进行缩放
                }
            } else if(realWidth>windowW*scale) {//如图片高度合适，判断图片宽度
                imgWidth = windowW*scale;//如大于窗口宽度，图片宽度进行缩放
                imgHeight = imgWidth/realWidth*realHeight;//等比例缩放高度
            } else {//如果图片真实高度和宽度都符合要求，高宽不变
                imgWidth = 900;
                imgHeight = 600;
            }
            $(bigimg).css("width",imgWidth);//以最终的宽度对图片缩放

            var w = (windowW-imgWidth)/2;//计算图片与窗口左边距
            var h = (windowH-imgHeight)/2;//计算图片与窗口上边距
            $(innerdiv).css({"top":h, "left":w});//设置#innerdiv的top和left属性
            $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg
        });

        $(outerdiv).click(function(){//再次点击淡出消失弹出层
            $(this).fadeOut("fast");
        });
    }
}
