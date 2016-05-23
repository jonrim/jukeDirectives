'use strict';

juke.directive('songList', function(PlayerFactory) {
  return {
    restrict: 'E',
    templateUrl: '/js/song/songlist.html',
    scope: {
      songs: '=',
      title: '=',
    },
    link: function(scope) {
      angular.extend(scope, PlayerFactory);
      
      scope.toggle = function (song) {
        if (song !== PlayerFactory.getCurrentSong()) {
          PlayerFactory.start(song, scope.title.songs);
        } else if ( PlayerFactory.isPlaying() ) {
          PlayerFactory.pause();
        } else {
          PlayerFactory.resume();
        }
      };

      scope.getCurrentSong = function () {
        return PlayerFactory.getCurrentSong();
      };

      scope.isPlaying = function (song) {
        return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
      };
    }
  }
});

juke.directive('doubleClick', function(PlayerFactory) {
  return {
    restrict: 'A',
    scope: {
      doubleClick: '&',
    },
    link: function(scope, element, attrs) {
      element.on('dblclick', function() {
        scope.doubleClick();
      })
    }
  }
});