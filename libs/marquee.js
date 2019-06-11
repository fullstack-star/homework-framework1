$.fn.marquee = function(data) {
  // 可翻页
  // popup when click
  // 可以用 fancybox

  // 向body添加预览图片及遮罩层
  $('body').append(`<div id="mask">
  <a class="previous" href="###">&lt;</a>
  <img id="preview-image" src="">
  <a class="next" href="###">&gt;</a>
</div>`)
  // 渲染图片列表
  function render(images) {
    let imgs = images.map(image => `
      <li>
        <img src="${image}"/>
      </li>    
    `.trim());
    return `<ul id='list'>${imgs.join('')}</ul>`
  }
  $(this).html(render(data))

  var $imgList = $("#list"),
      $mask = $('#mask')
      $previewImage = $mask.find('img'),
      $previewPrevious = $mask.find('.previous'),
      $previewNext = $mask.find('.next');

  // 点击遮罩层隐藏
  $mask.on('click', function(evt){
    if(evt.target === this){
      $mask.css("display" , 'none');
    }
  })

  $imgList.on('click', function(evt){
    if(evt.target.src) {
      var src = evt.target.src,
        idx = data.indexOf(src);
      $mask.css("display" ,'block');
      $previewImage.attr("src" ,src);
      // 更新前后按钮状态
      function updateButton(idx){
        $previewPrevious.css("display" , idx ? 'block' : 'none');
        $previewNext.css("display" , idx < data.length - 1 ? 'block' : 'none');
      }
      updateButton(idx);
      // 前一个图片
      $previewPrevious.on('click',function(){
        $previewImage.attr("src" ,data[--idx]);
        updateButton(idx);
      })
      // 下一张图片
      $previewNext.on('click', function(){
        $previewImage.attr("src" ,data[++idx]);
        updateButton(idx);
      })
    }
    
  });
}







