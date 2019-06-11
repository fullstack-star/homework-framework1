let t = null;
$.fn.marquee = function(opt) {
  // 配置默认值
	let elewidth = opt ? opt.width : document.body.clientWidth;
	let eleheight = opt ? opt.height : document.body.clientHeight;
	let lazytime = opt ? opt.lazytime : 1000;
	let autoplay = opt ? opt.autoplay : true;
	let pageshow = opt ? opt.pageshow : 'dot';  // none ? dot ? number
	let direction = opt ? opt.direction : 'normal'; // normal 横向 ？ horizon 纵向
	let oft = 0;

	let ele = $(this);  // 获取的元素
	if (ele.length > 0) {
		let eleChildren = ele.children();
		ele.append('<div class="inner"></div>');  // 增加一个元素包裹
		let inner = $('.inner');
		inner.append(eleChildren);
		inner.css({
			display: 'flex',
			position: 'relative',  // page
			flexDirection: direction == 'normal' ? 'row' : 'column'
		})
		inner.children('img').on('click', function() {   // img 绑定popup方法
			$(this).popup();
		});
		// 设置基础样式
		let horizontalHeight = inner.children('img').height()
		ele.css({
			width: elewidth,
			height: direction == 'normal' ? eleheight : horizontalHeight,
			overflow: 'hidden',
		})

		// 添加左右两边的方向键
		ele.append('<div class="arrow leftArrow"> < </div>'); // 左边的方向键
		ele.append('<div class="arrow rightArrow"> > </div>'); // 右边的方向键
		$('.arrow').css('top', inner.children('img').height() / 2);
    // 方向键触发
		$('.leftArrow').on('click', function() {  // 只针对direction为normal的情况
			console.log(t);
			clearInterval(t);
			if(oft <= 0 - elewidth ) {
				oft += elewidth; // 跳转到对应的图片
				moveRow(inner,oft,lazytime);
				pageChange(oft/elewidth, pageshow);
				if(autoplay) {
					t = setInterval(function() {
						oft -= elewidth;
						move(inner,oft,lazytime,eleLen,elewidth,pageshow);
					}, 2*lazytime);
				}
			}
		})
		$('.rightArrow').on('click', function() {  // 只针对direction为normal的情况
			clearInterval(t);
			if(oft >= 0 - (eleLen-2) * elewidth ) {
				oft -=  elewidth; // 跳转到对应的图片
				moveRow(inner,oft,lazytime);
				pageChange(oft/elewidth, pageshow);
				if(autoplay) {
					t = setInterval(function() {
						oft -= elewidth;
						move(inner,oft,lazytime,eleLen,elewidth,pageshow);
					}, 2*lazytime);
				}
			}

		})
		// 动起来
    let eleLen = inner.children().length;
		if(autoplay) {  // 加入是否自动播放，如果false则是通过交互的方式
			t = setInterval(function() {
				if(direction == 'normal') {
					oft -= elewidth;
					move(inner,oft,lazytime,eleLen,elewidth,pageshow);  // 横向滚动
				}else {
					oft -= inner.children('img').height();
					moveHorizon(inner,oft,lazytime,eleLen,horizontalHeight,pageshow);  // 垂直滚动
				}
			}, 2*lazytime);
		}

		// pageshow 为图片页码显示
		if(pageshow != 'none') {
			// 增加元素显示page
			ele.append('<div class="pageshow"></div>');
			// 取到元素，遍历子元素
			let page = $('.pageshow');
			for(let i = 0; i < eleLen; i++) {
				page.append('<span class="page">'+(i+1)+'</span>');
			}
			// 设置page的样式
			page.css({
				position: 'absolute',
				display: 'flex',
				flexDirection: direction=='normal' ? 'row' : 'column',
				width: elewidth,
				justifyContent: 'center',
				top: direction=='normal' ? inner.children().height() *0.8 : '10%',
				fontSize: '0.8rem'
			})
			// page 子元素的样式(初始化)
			pageChange(0, pageshow);

			// page 触发事件
			page.children().click(function() {
				clearInterval(t);
				page.children().css(createCssObj('ccc', pageshow)); // 好懒，不想写css 就这么配置样式了
				$(this).css(createCssObj('fff', pageshow));
				if(direction == 'normal') {
					oft = 0 - $(this).index() * elewidth; // 跳转到对应的图片
					moveRow(inner,oft,lazytime);
				}else {
					oft = 0 - $(this).index() * inner.children().height(); // 跳转到对应的图片
					moveColumn(inner,oft,lazytime);
				}
				if(autoplay) {
					t = setInterval(function() {
						if(direction == 'normal') {
							oft -= elewidth;
							move(inner,oft,lazytime,eleLen,elewidth,pageshow);
						}else {
							oft -= inner.children('img').height();
							moveHorizon(inner,oft,lazytime,eleLen,horizontalHeight,pageshow);
						}
					}, 2*lazytime);
				}
			})
		}
  }
}

// 横向滚动 + 加页码效果
function move(ele, offset, time, length, width, pageshow) {
	let mv_idx = 0 - offset / width;
	if(mv_idx < length) {
		moveRow(ele, offset, time);  // 调用
		pageChange(offset/width, pageshow); // page的显示变化
	}else {
		clearInterval(t);
	}
}
// 垂直滚动 + 加页码效果
function moveHorizon(ele, offset, time, length, height, pageshow) {
	let mv_idx = 0 - offset / height;
	if(mv_idx < length) {
		moveColumn(ele, offset, time);  // 调用
		pageChange(offset/height, pageshow); // page的显示变化
	}else {
		clearInterval(t);
	}
}

// 根据偏移量计算page，并显示样式
function pageChange(index, pageshow) {
	// 默认第一张on
	let idx = parseInt(0 - index);  // 表示第几张
	$('.pageshow').children().css(createCssObj('ccc', pageshow));
	$('.pageshow').children().eq(idx).css(createCssObj('fff', pageshow));
}

// 左右平移
function moveRow(ele, offset, time) {
	ele.css({
		transform: 'translateX('+offset+'px)',
		transitionDuration: time + 'ms'
	})
}

// 上下平移
function moveColumn(ele, offset, time) {
	ele.css({
		transform: 'translateY('+offset+'px)',
		transitionDuration: time + 'ms'
	})
}

// 生成page的样式
function createCssObj(opt, dot) {
	let colour = '#' + opt;
	if(dot == 'dot') {
		return {
			display: 'inline-flex',
			margin: '0 0.1rem',
			color: colour,
			width: '0.8rem',
			height: '0.8rem',
			justifyContent: 'center',
			alignItems: 'center',
			cursor: 'pointer',
			borderRadius: '100%',
			backgroundColor: colour
		}
	}else {
		return {
			display: 'inline-flex',
			margin: '0 0.1rem',
			color: colour,
			border: '1px solid ' + colour,
			width: '1.2rem',
			height: '1.2rem',
			justifyContent: 'center',
			alignItems: 'center',
			cursor: 'pointer'
		}
	}
}

