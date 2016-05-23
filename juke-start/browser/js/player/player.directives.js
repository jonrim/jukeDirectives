juke.directive('player', function(PlayerFactory) {
	return {
		restrict: 'E',
		templateUrl: '/js/player/player.html',
		link: function(scope, element, attrs) {
			angular.extend(scope, PlayerFactory); // copy props from param2 to param1
		  scope.toggle = function () {
		    if ( PlayerFactory.isPlaying() ) PlayerFactory.pause();
		    else PlayerFactory.resume();
		  };

		  scope.getPercent = function () {
		    return PlayerFactory.getProgress() * 100;
		  };
		}
	}
})

juke.directive('currentSong', function() {
	return {
		restrict: 'E',
		template: '<h5> {{ getCurrentSong().name }} </h5>',
	}
})

juke.directive('progressBar', function(PlayerFactory) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.on('click', function(event) {
		    var percentDone = event.offsetX/event.target.offsetWidth;
		    angular.extend(scope, PlayerFactory);
		    scope.getAudio().currentTime = scope.getAudio().duration * percentDone;
		  })
		}
	}
})