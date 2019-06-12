const Marquee = function (element, options) {
	this.$element = $(element);
	this.$imgs = this.$element.find('img');
	this.$container = $('body').find('.marquee-container');
	this.$close = null;
	this.$play = null;
	this.$slides = null;
	this.options = options;
	this.currentIndex = 0;
	this.tpl = '';
	this.timer = null;
	
	this.init();
}

Marquee.DEFAULTS = {
	interval: 5000,
	showArrow: true,
	loop: false,
    operateList: ['play', 'close'],
}

/**
 * @description 初始化入口
 */
Marquee.prototype.init = function() {
	this.initDOM();
	this.initImgsEvent();
	this.initCloseEvent();
	this.initPlayEvent();
	this.initNextEvent();
	this.initPrevEvent();
}

/**
 * @description 初始化播放器DOM
 */
Marquee.prototype.initDOM = function() {
	if (this.$container && this.$container.length) return;

	this.initContainerDOM();
	this.initOperateDOM();
	this.initArrowDOM();
	this.initSlideDOM();

	$('body').append(this.tpl);

	this.$container = $('body').find('.marquee-container');
	this.$slides = this.$container.find('.marquee-slide-item');
	this.$close = this.$container.find('[data-operate=close]');
	this.$play = this.$container.find('[data-operate=play]');
	this.$prev = this.$container.find('[data-arrow=prev]');
	this.$next = this.$container.find('[data-arrow=next]');
}

Marquee.prototype.initContainerDOM = function() {
	const tpl = `
		<div class="marquee-container">
			<div class="marquee-bg"></div>
			{{operateDOM}}
			{{arrowDOM}}
			<div class="marquee-body">
				{{slideDOM}}
			</div>
		</div>
	`;

	this.tpl += tpl;
}

Marquee.prototype.initOperateDOM = function() {
	const { operateList } = this.options;

	let tpl = '<div class="marquee-operate">';
	let baseTpl = `
		<span data-operate="{{operateName}}" class="marquee-operate-item">
			<i class="marquee-icon marquee-icon-{{operateName}}"></i>
		</span>
	`;

	for (let i = 0; i < operateList.length; i++) {
		tpl += baseTpl.replace(/{{operateName}}/g, operateList[i]);
	}

	tpl += '</div>';

	this.tpl = this.tpl.replace(/{{operateDOM}}/g, tpl);
}

Marquee.prototype.initArrowDOM = function() {
	const { showArrow } = this.options;

	if (!showArrow) return;

	let tpl = `
		<div class="marquee-arrow">
			<span data-arrow="prev" class="marquee-arrow-item marquee-arrow-left">prev</span>
			<span data-arrow="next" class="marquee-arrow-item marquee-arrow-right">next</span>
		</div>
	`;

	this.tpl = this.tpl.replace(/{{arrowDOM}}/g, tpl);
}

Marquee.prototype.initSlideDOM = function() {
	const $imgs = this.$imgs;

	let tpl = '<div class="marquee-slide">';
	let baseTpl = `
		<div class="marquee-slide-item">
			<img src="{{src}}"/>
		</div>
	`;

	for (let i = 0; i < $imgs.length; i++) {
		const src = $imgs[i].getAttribute('src');
		if (!src) continue;
		tpl += baseTpl.replace(/{{src}}/g, src);
	}

	tpl += '</div>';

	this.tpl = this.tpl.replace(/{{slideDOM}}/g, tpl);
}

/**
 * @description 点击图片显示
 */
Marquee.prototype.initImgsEvent = function() {
	const self = this;
	this.$imgs.each(function(i, $img) {
		$($img).click(function() {
			self.currentIndex = i;
			self.show();
		});
	});
}

/**
 * @description 点击关闭
 */
Marquee.prototype.initCloseEvent = function() {
	const self = this;
	if (!this.$close) return;
	this.$close.click(function() {
		self.hide();
	});
}

/**
 * @description 播放
 */
Marquee.prototype.initPlayEvent = function() {
	const self = this;
	if (!this.$play) return;
	this.$play.click(function() {
		if (self.timer) {
			self.stopPlay();
		} else {
			self.play();
		}
	});
}

/**
 * @description 上一个
 */
Marquee.prototype.initPrevEvent = function() {
	const self = this;
	if (!this.$prev) return;
	this.$prev.click(function() {
		self.stopPlay(self.timer);
		self.currentIndex = self.currentIndex <= 0 ? 0 : self.currentIndex - 1;
		self.changeImg('prev', this.loop);
	});
}

/**
 * @description 下一个
 */
Marquee.prototype.initNextEvent = function() {
	const self = this;
	if (!this.$next) return;
	this.$next.click(function() {
		self.stopPlay(this.timer);
		self.changeImg('next', this.loop);
	});
}

/**
 * @description 显示
 */
Marquee.prototype.show = function() {
	const self = this;

	const beforeE = $.Event('beforeShow.marquee');
	this.$element.trigger(beforeE);

	this.showImg();

	const afterE = $.Event('afterShow.marquee');
	this.$container.fadeIn(function() {
		self.$element.trigger(afterE);
	});
}

/**
 * @description 隐藏
 */
Marquee.prototype.hide = function() {
	const self = this;

	const beforeE = $.Event('beforeHide.marquee');
	this.$element.trigger(beforeE);

	const afterE = $.Event('afterHide.marquee');
	this.$container.fadeOut(function() {
		self.$element.trigger(afterE);
	});

	this.stopPlay();
}

/**
 * @description 图片切换
 */
Marquee.prototype.showImg = function() {
	const self = this;
	$(this.$slides).hide();
	$(this.$slides[this.currentIndex]).show();
}

/**
 * @description 上一张
 */
Marquee.prototype.changeImg = function(type = 'next', loop = false) {
	let index;

	const beforeE = $.Event('beforeHide.marquee');
	this.$element.trigger(beforeE);

	if (type === 'next') {
		this.currentIndex = (
			this.currentIndex >= this.$imgs.length - 1 ? 
			(loop ? 0 : this.$imgs.length - 1) : 
			this.currentIndex + 1
		);
	} else {
		this.currentIndex = (
			this.currentIndex <= 0 ? 
			(loop ? this.$imgs.length - 1 : 0) :
			this.currentIndex - 1
		);
	}

	this.showImg();
	
	const afterE = $.Event('afterHide.marquee');
	self.$element.trigger(afterE);
}

/**
 * @description 播放
 */
Marquee.prototype.play = function() {
	const { interval } = this.options;
	const self = this;
	$(self.$play).addClass('active');
	this.timer = setInterval(function() {
		self.changeImg('next', true);
	}, interval);
}

/**
 * @description 停止播放
 */
Marquee.prototype.stopPlay = function() {
	if (!this.timer) return;
	clearInterval(this.timer);
	this.timer = null;
	$(self.$play).removeClass('active');
}

$.fn.marquee = function (option) {
	return this.each(function () {
		const options = $.extend({}, Marquee.DEFAULTS, typeof option == 'object' && option)
		new Marquee(this, options);
	});
}
