	if (!Modernizr) {
		Modernizr = false;
	}


	//Compatibility test
	var sound_ext =	Modernizr.audio.mp3 ? '.mp3' : '.ogg';

		soundManager.onready(function() {
		
			sound = {};

			sound_absorbing = soundManager.createSound({id: 'sound_absorbing', url:'/the-house-game/sound/absorbing' + sound_ext, autoLoad: true});
			sound_beep = soundManager.createSound({id: 'sound_beep', url:'/the-house-game/sound/beep' + sound_ext, autoLoad: true});
			sound_button = soundManager.createSound({id: 'sound_button', url:'/the-house-game/sound/button' + sound_ext, autoLoad: true});
			sound_buzz = soundManager.createSound({id: 'sound_buzz', url:'/the-house-game/sound/buzz' + sound_ext, autoLoad: true});
			sound_cling = soundManager.createSound({id: 'sound_cling', url:'/the-house-game/sound/cling' + sound_ext, autoLoad: true});
			sound_clang = soundManager.createSound({id: 'sound_clang', url:'/the-house-game/sound/clang' + sound_ext, autoLoad: true});
			sound_clong = soundManager.createSound({id: 'sound_clong', url:'/the-house-game/sound/clong' + sound_ext, autoLoad: true});
			sound_creak = soundManager.createSound({id: 'sound_creak', url:'/the-house-game/sound/creak' + sound_ext, autoLoad: true}); 
			sound_darkness = soundManager.createSound({id: 'darkness', url:'/the-house-game/sound/darkness' + sound_ext, autoLoad: true}); 
			sound_darkness_retract = soundManager.createSound({id: 'darkness_retract', url:'/the-house-game/sound/darkness_retract' + sound_ext, autoLoad: true}); 
			sound_door = soundManager.createSound({id: 'sound_door', url:'/the-house-game/sound/door' + sound_ext, autoLoad: true}); 
			sound_door_locked = soundManager.createSound({id: 'sound_door_locked', url:'/the-house-game/sound/door_locked' + sound_ext, autoLoad: true}); 
			sound_ekg = soundManager.createSound({id: 'sound_ekg', url:'/the-house-game/sound/ekg' + sound_ext, autoLoad: true}); 
			sound_explosion = soundManager.createSound({id: 'sound_explosion', url:'/the-house-game/sound/explosion' + sound_ext, autoLoad: true}); 
			sound_footstep = soundManager.createSound({id: 'footstep', url:'/the-house-game/sound/footstep' + sound_ext, autoLoad: true});
			sound_sliding_door = soundManager.createSound({id: 'sliding_door', url:'/the-house-game/sound/sliding_door' + sound_ext, autoLoad: true}); 
			sound_scary = soundManager.createSound({id: 'sound_scary', url:'/the-house-game/sound/scary' + sound_ext, autoLoad: true});
			sound_scene_corridor = soundManager.createSound({id: 'sound_corridor', url:'/the-house-game/sound/scene_corridor' + sound_ext, autoLoad: true});
			sound_scene_corridor_phone = soundManager.createSound({id: 'sound_corridor_phone', url:'/the-house-game/sound/scene_corridor_phone' + sound_ext, autoLoad: true});
			sound_screech = soundManager.createSound({id: 'sound_screech', url:'/the-house-game/sound/screech' + sound_ext, autoLoad: true});
			sound_screech2 = soundManager.createSound({id: 'sound_screech2', url:'/the-house-game/sound/screech2' + sound_ext, autoLoad: true});
			sound_shower_curtain = soundManager.createSound({id: 'sound_shower_curtain', url:'/the-house-game/sound/shower_curtain' + sound_ext, autoLoad: true});
			sound_switch = soundManager.createSound({id: 'sound_switch', url:'/the-house-game/sound/switch' + sound_ext, autoLoad: true}); 
			sound_teleport = soundManager.createSound({id: 'sound_teleport', url:'/the-house-game/sound/teleport' + sound_ext, autoLoad: true});
			sound_train = soundManager.createSound({id: 'train-ambient', url:'/the-house-game/sound/train_ambient' + sound_ext, autoLoad: true});
			sound_train_start = soundManager.createSound({id: 'train_start', url:'/the-house-game/sound/train_start' + sound_ext, autoLoad: true});
			sound_woosh = soundManager.createSound({id: 'sound_woosh', url:'/the-house-game/sound/woosh' + sound_ext, autoLoad: true}); 
			sound_wrong = soundManager.createSound({id: 'sound_wrong', url:'/the-house-game/sound/wrong' + sound_ext, autoLoad: true});

			//rooms backgrounds
			sound.room = soundManager.createSound({id: 'room', url:'/the-house-game/sound/room' + sound_ext, autoLoad: true});
			sound.corridor = soundManager.createSound({id: 'corridor', url:'/the-house-game/sound/corridor' + sound_ext, autoLoad: true}); 
			sound.hidden_corridor = soundManager.createSound({id: 'last_corridor', url:'/the-house-game/sound/corridor' + sound_ext, autoLoad: true}); 
			sound.last_corridor = soundManager.createSound({id: 'last_corridor', url:'/the-house-game/sound/corridor' + sound_ext, autoLoad: true}); 
			sound.aquarium = soundManager.createSound({id: 'aquarium', url:'/the-house-game/sound/aquarium' + sound_ext, autoLoad: true}); 
			sound.picture = soundManager.createSound({id: 'picture', url:'/the-house-game/sound/picture_snow' + sound_ext, autoLoad: true});
			sound.picture_snow = soundManager.createSound({id: 'picture_snow', url:'/the-house-game/sound/picture_snow' + sound_ext, autoLoad: true});
			sound.kitchen = soundManager.createSound({id: 'kitchen', url:'/the-house-game/sound/room' + sound_ext, autoLoad: true}); 
			sound.kitchen_true = soundManager.createSound({id: 'kitchen_true', url:'/the-house-game/sound/room' + sound_ext, autoLoad: true}); 
			sound.toilet = soundManager.createSound({id: 'toilet', url:'/the-house-game/sound/corridor' + sound_ext, autoLoad: true});
			sound.bathroom = soundManager.createSound({id: 'bathroom', url:'/the-house-game/sound/room' + sound_ext, autoLoad: true});
			sound.void_bathroom = soundManager.createSound({id: 'void_bathroom', url:'/the-house-game/sound/room' + sound_ext, autoLoad: true});
			sound.big_room = soundManager.createSound({id: 'big_room', url:'/the-house-game/sound/room' + sound_ext, autoLoad: true});
			sound.boiler_room = soundManager.createSound({id: 'boiler_room', url:'/the-house-game/sound/boiler_room' + sound_ext, autoLoad: true});
			sound.fridge = soundManager.createSound({id: 'fridge', url:'/the-house-game/sound/picture_snow' + sound_ext, autoLoad: true});
			sound.train = soundManager.createSound({id: 'train', url:'/the-house-game/sound/train' + sound_ext, autoLoad: true});
			sound.void = soundManager.createSound({id: 'void', url:'/the-house-game/sound/void' + sound_ext, autoLoad: true});
			sound.exit = soundManager.createSound({id: 'exit', url:'/the-house-game/sound/room' + sound_ext, autoLoad: true});

		}); 
		
//muting sound

soundManager.onready(function() {
	if ( $.jStorage.get('mute') ) {
		soundManager.mute();  
		$('#switch_sound').removeClass('on').addClass('off');
	}
	$(document).on('click', '#switch_sound.on', function () {
		$(this).removeClass('on').addClass('off');
		soundManager.mute();
		$.jStorage.set('mute', true);
	});
	$(document).on('click', '#switch_sound.off', function () {
		$(this).removeClass('off').addClass('on');
		soundManager.unmute();
		$.jStorage.set('mute', false);
	});  
});