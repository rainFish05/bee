define(['jquery'], function($) {
	//工具函数
	function resetImageZindex(imgTarget) {
		for (var i = imgTarget.length; i--;) {
			$(imgTarget[i]).css('z-index', 0);
		}
	}
	//轮播控制
	var sliding = function() {
		var slidingContainer = $('.performance-sliding-enviroment');
		var images = slidingContainer.children('img');
		var zIndex = 0;
		var timer = setInterval(function() {
			$(images[zIndex++]).css('z-index',zIndex);
			if (zIndex == images.length) {
				zIndex = 0;
				resetImageZindex(images);
			}
		}, 2000);
	}
	//视频控制
	var videoPlay = function() {
		var videoLogos = $('.performance-video');
		videoLogos.bind('click', function() {
			$('.mask').css('display', 'block');
			$('.close-mask').css('display', 'block');
			if (this.className.indexOf('video-bee') !== -1){
				$('#video-bee').css('display', 'block');
			} else if (this.className.indexOf('video-process') !== -1) {
				$('#video-process').css('display', 'block');
			}
		});

		var closeMask = $('.close-mask');
		closeMask.bind('click', function() {
			$('.mask').css('display', 'none');
			$('.close-mask').css('display', 'none');
			$('#video-bee').css('display', 'none');
			$('#video-process').css('display', 'none');
		});
	}

	return {
		sliding:    sliding,
		videoPlay:  videoPlay
	};
});