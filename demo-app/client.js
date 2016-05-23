var app = angular.module('kittygogo', []);

app.controller('MainController', function ($scope, $http) {
  /* inputs on template: amount */
  $http.get('/kittens')
  .then(function (response) {
    $scope.kittenProjects = response.data;
  });
  $scope.addToAmount = function (kittenProject) {
    $http.put('/kittens/' + kittenProject.id, {
      amountToAdd: Number($scope.user.info.amount)
    })
    .then(function () {
      kittenProject.raised += Number($scope.user.info.amount);
    });
  };

  $scope.user = {info: {amount: 5}};


});

app.controller('NavbarController', function ($scope, $timeout) {
  $scope.username = 'Omri Bernstien';
  $scope.logScope = function () {
    console.log($scope);
  };
});

// the meow directive will be active
// for any elements whose actual tag
// is "meow"
app.directive('meow', function () {
  return {
    restrict: 'EA', // element
    templateUrl: '/kitten.html',
    scope: {
      akitten: '=',
      feed: '&'
    }
  };
});

app.directive('randomImage', function () {
  return {
    restrict: 'E',
    template: '<h3>{{ title }}</h3><img ng-src="http://placekitten.com/g/{{ height }}/{{ width }}">',
    scope: {
      height: '@',
      width: '@',
      title: '@'
    }
  };
});

app.run(function ($rootScope) {
  $rootScope.example = 'something';
});

// = means data
// @ means literal value
// & means code / expresssion to run later

// meow directive
// has .feed on scope
// .feed is a function
// that does addToAmount(kitten)

// in index.html
// <meow feed="addToAmount(kitten)"></meow>