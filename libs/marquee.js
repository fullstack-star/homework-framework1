$.fn.marquee = function(params) {
    var _params = params || {};
    var $marquee = $(this);
    var $inner = $marquee.find('.marquee-inner');
    var imgList = _params.imgList || [];
    var WIDTH = _params.width || 520;
    var HEIGHT = _params.height || 280;
    var $prev = $marquee.find(".prev");
    var $next = $marquee.find(".next");
    var target = 0;
    var _auto = _params.auto || false;
    var interval = _params.interval === void 0 ||  _params.interval< 1000 ? 3000 : _params.interval;
    var timer = null;

    function createImg(){
        let str = '';
        imgList.forEach((item)=>{
            str += `<a class="marquee-thumbnail" href=${item} data-fancybox>
                <img src=${item}>
             </a>`
        });
        $inner.html(str)
    }

    function initSize(){
        $marquee.css({
            width: WIDTH + 'px',
            height: HEIGHT + 'px'
        });

        $marquee.find(".marquee-thumbnail").css({
            width: WIDTH + 'px'
        });

        $inner.css({
            width: imgList.length * WIDTH + 'px'
        });
    }

    function move(){
        $inner.css({
            transform: `translate3d(${ -target*WIDTH }px, 0px, 0px)`
        })
    }

    function calculate(num){
        target += num ;
        target = target < 0 ? imgList.length-1 : target ;
        target = target > imgList.length-1 ? 0 : target ;
    }

    function automatic(){
        timer && clearTimeout(timer);
        timer = setTimeout(function(){
            next();
            automatic();
        },interval);
    }

    function next (){
        calculate(1);
        move();
    }

    function prev (){
        calculate(-1);
        move();
    }

    function stop(){
        timer && clearTimeout(timer);
    }

    function addClickEvent(){

        $prev.on("click",function () {
            prev();
        });

        $next.on("click",function () {
            next();
        });

        $marquee.on("mouseover",function () {
            stop();
        });

        $marquee.on("mouseout",function () {
            automatic();
        });
    }

    function initFancybox(){
        setTimeout(function () {
            $marquee.find('.marquee-thumbnail').fancybox();
        },0);
    }

    function render(){
        createImg();
        initSize();
        addClickEvent();
        if(_auto){
            automatic();
        }
        initFancybox();
    }

    render();
};
