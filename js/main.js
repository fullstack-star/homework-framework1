/**
 * TODO：刷新页面的时候，会闪一下（显示原始的dom结构）
 * 实践：调用document ready 事件依旧会闪，把script标签放到head部分可以避免这个问题。
 * script标签放在body底部，就算是使用ready事件，也会闪一下。
 * 猜测：本地src读取太快了？
 */
$(document).ready(
    function(){
        $('#marquee').marquee()
    }
);