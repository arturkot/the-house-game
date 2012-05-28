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
		
	},

	reset: function() {
		
		$('#settings_reset').click(function() {
		
		  dialogue_box.display({
			character:false,
			picture:false,
			text: 'The game will start from the beggining. Save data will be erased.',
			options: ['Ok', 'Cancel']
		  });

		  $('#options').delegate('#option_0', 'click', function() {
			
			$.jStorage.flush();
			window.location.reload();

		  });

		  $('#options').delegate('#option_1', 'click', function() {
			
			dialogue_box.destroy();

		  });
		
		});

	}

}