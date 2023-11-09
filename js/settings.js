var settings = {
	
	init: function() {

		var list = $('#settings').find('ul'); 

		list.hide();

		$('#settings').toggle(function() {

			$(this).addClass('on');
			
			list.fadeIn();

		}, function() {

			$(this).removeClass('on');
			
			list.fadeOut();

		});
	
		settings.reset();
		settings.fullScreen();
		
	},

	reset: function() {
		
		$('#settings_reset').click(function() {
		
		  dialogue_box.display({
			character:false,
			picture:false,
			text: '游戏将回到最开始，一切记录点都会被擦除。',
			options: ['好的', '取消']
		  });

		  $('#options').delegate('#option_0', 'click', function() {
			
			$.jStorage.flush();
			window.location.reload();

		  });

		  $('#options').delegate('#option_1', 'click', function() {
			
			dialogue_box.destroy();

		  });
		
		});

	},

	fullScreen: function() {

		var docElm = document.documentElement;
		if (docElm.requestFullscreen || docElm.mozRequestFullScreen || docElm.webkitRequestFullScreen) {

			$('<li id="settings_full-screen">全  屏</li>')
				.prependTo($('#settings').find('ul'))
				.click(function() {

					var $that = $(this);
					var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) || (document.mozFullScreen || document.webkitIsFullScreen);

					
					if (!isInFullScreen) {
						if (docElm.requestFullscreen) { docElm.requestFullscreen(); }
						else if (docElm.mozRequestFullScreen) { docElm.mozRequestFullScreen(); }
						else if (docElm.webkitRequestFullScreen) { docElm.webkitRequestFullScreen(); }
					}

				});

		}

	}

}