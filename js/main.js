$('#marquee').marquee({
    interval: 1000,
});

$('#marquee').on('beforeShow.marquee', function() {
    console.log('播放器即将显示');
});
$('#marquee').on('afterShow.marquee', function() {
    console.log('播放器已显示');
});
