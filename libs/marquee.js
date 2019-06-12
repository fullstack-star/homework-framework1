$.fn.marquee = function() {
	let marqueeDom = $(this);
	//设置样式
	marqueeDom.css({'overflowX':'hidden'});
	let mqWidth = marqueeDom.css('width');
	marqueeDom.children('.mq-item').css({'position':'absolute','top':0,"width":mqWidth,'display':'inline-block','transition':'transform .4s ease-in-out'});
	marqueeDom.find('img').css({'width':'100%'});
	marqueeDom.find('p').css({'position':'absolute','top':'30%','width':'100%','font-size':'32px','text-align':'center','color':'white','z-index':'2'});
	
	//添加切换按钮
	marqueeDom.append('<div style="position:absolute;top:50%;transform:translateY(-50%);width:100%;z-index:3"><span id="last"></span><span id="next"></span></div>');
	$('#last').css({'display':'inline-block','margin-left':'20px','width':'28px','height':'28px','border-style':'solid','border-color':'white white transparent transparent','transform':'rotate(-135deg)','cursor':'pointer'});
	$('#next').css({'display':'inline-block','margin-right':'20px','float':'right','width':'28px','height':'28px','border-style':'solid','border-color':'white white transparent transparent','transform':'rotate(45deg)','cursor':'pointer'});
	
	//定义变量 常量
	var now = 0;
	const itemLength = marqueeDom.children('.mq-item').length;

    //添加切换列表
    marqueeDom.append('<ul id="indicators" style="position:absolute;bottom:0;width:100%;padding-left:0;text-align:center;list-style-type:none;z-index:3"></ul>');
    for(let i=0,l=itemLength;i<l;i++){
		$('#indicators').append('<li class="indicator"></li>');
	}
    $('.indicator').css({'display':'inline-block','width':'30px','height': '4px','margin':'10px 4px','border-radius': '2px','background':'rgba(255,255,255,.4)','cursor':'pointer'});

	//幻灯片移动
	function move(index){
		marqueeDom.children('.mq-item').css('z-index','1');
		marqueeDom.children('.mq-item').eq(index).css('z-index','2');
		for(let i=0,l=itemLength;i<l;i++){
			marqueeDom.children('.mq-item').eq(i).css('transform','translateX('+ (i-index)*parseInt(mqWidth) +'px)');
			/* 想做最后一张到第一张从右边出 第一张到最后一张从左边出，有bug未解决
			if(index == itemLength-1 && i==0){
				marqueeDom.children('.mq-item').eq(0).css('transform','translateX('+ parseInt(mqWidth) +'px)');
			}else if(index == 0 && i==itemLength-1){
				marqueeDom.children('.mq-item').eq(itemLength-1).css('transform','translateX('+ -parseInt(mqWidth) +'px)');
			}else{
				marqueeDom.children('.mq-item').eq(i).css('transform','translateX('+ (i-index)*parseInt(mqWidth) +'px)');
			}*/
		}
		
		//更新切换列表
		$('.indicator').css('background','rgba(255,255,255,.4)');
		$('.indicator').eq(index).css('background','rgb(255,255,255)');
	}

	move(0);

	//上一张 下一张
	$('#last').click(function(){
		now--;
		if(now==-1){
			now = itemLength-1;
		}
		move(now);
	});
	$('#next').click(function(){
		now++;
		if(now==itemLength){
			now = 0;
		}
		move(now);
	});
	$('.indicator').click(function(){
		now = $('.indicator').index(this);
		move(now);
	});

	//定时器
	var timer = setInterval(function(){$('#next').click()},3000);

	//鼠标进出幻灯片定时器设置
	marqueeDom.mouseenter(function(){
		clearInterval(timer);
	});
	marqueeDom.mouseleave(function(){
		timer = setInterval(function(){$('#next').click()},3000);
	})
	/**/
  // 可翻页
  // popup when click
  // 可以用 fancybox
}
