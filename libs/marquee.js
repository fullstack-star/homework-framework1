$.fn.marquee = function () {
  // 可翻页
  var container = $('#marquee');
  var ul = container.children('ul');
  var index = 0; //初始显示图片的索引值
  var imgCounts = ul.find('img').length;
  // 获取单张图片的长 宽属性
  var imgObj = $('#marquee img').eq(0);
  if (!imgObj.length) throw new Error('html结构不对')

  // 给容器赋值，长，宽
  var imgW = imgObj.width();
  var imgH = imgObj.height();
  container.width(imgW);
  container.height(imgH);

  //  添加指示器
  container.append('<i class="indicator arrow-next">&gt;</i>');
  container.children(':first-child').before('<i class="indicator arrow-prev">&lt;</i>');

  // 添加一张假图，过渡使用
  ul.children('li').eq(0).clone().appendTo(ul);

  //  指示器点击事件，切换图片
  container.children('.indicator').click(function (e) {
    if ($(this).hasClass('arrow-next')) {
      //点击的下一张
      if (index == imgCounts) {
        index = 0;
        ul.css('left', -index * imgW)
      }
      index++;

    } else {
      if (index == 0) {
        index = imgCounts;
        ul.css('left', -index * imgW)
      }
      index--;
    }
    ul.animate({ left: -index * imgW + 'px' })
  })

  //图片放大事件
  $('body').append('<div class="modal"><img></div>');
  var modal = $('body .modal');

  $('#marquee img').click(function () {
    modal.children('img').get(0).src = this.src;
    modal.show()
  })

  modal.click(function (e) {
    if (e.target == modal[0]) {
      modal.hide();
    }
  })
}
