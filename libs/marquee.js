$.fn.marquee = function(options){
  var t = $(this);
  var activeIndex = 0;
  var imgCount = t.find('img').length;
  var methods = {
    init: function() {
      this.createAllow();
      
      t.find('a').hide();
      t.find('a').eq(activeIndex).show();

      t.find('.prev').on('click', function() {
        methods.prev();
      })
      t.find('.next').on('click', function() {
        methods.next();
      })

      this.auto();
    },
    prev: function() {
      t.find('a').eq(activeIndex).hide();
      if (activeIndex < 1) {
        activeIndex = imgCount - 1;
      } else {
        activeIndex--;
      }
      t.find('a').eq(activeIndex).show();
    },
    next: function() {
      t.find('a').eq(activeIndex).hide();
      if (activeIndex >  imgCount - 2) {
        activeIndex = 0;
      } else {
        activeIndex++;
      }
      t.find('a').eq(activeIndex).show();
    },
    createAllow: function() {
      t.append('<div class="prev"><i class="left-arrow"></i></div><div class="next"><i class="right-arrow"></i></div>');
    },
    auto: function() {
      setInterval(() => {
        methods.next();
      }, 2000);
    }
  };
  methods.init();
  $("a.fancybox").each(function(i, item) {
    var imgSrc = $(item).find('img')[0].src
    $(item).attr('href', imgSrc)
  })
  $("a.fancybox").fancybox()
}
