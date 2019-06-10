function getPagenation (pageNums) {
  var $pagenation = '<div class="marquee-pagenation">';
  for (var i = 0; i < pageNums; i++) {
    $pagenation += `<i data-key="${i}"></i>`;
  }
  $pagenation += '</div>';
  return $pagenation;
}

$.fn.marquee = function () {
  var $marquee = $ (this);
  $marquee.addClass ('marquee-container');
  var pageNums = $marquee.find ('a').length;
  let width = $ ($marquee.find ('a')[0]).outerWidth ();
  $marquee.append (getPagenation (pageNums));

  $marquee.find ('.marquee-pagenation i').bind ('click', function () {
    $ ('.marquee-content').animate ({
      left: `-${Number ($ (this).data ('key')) * width}px`,
    });
  });
};
