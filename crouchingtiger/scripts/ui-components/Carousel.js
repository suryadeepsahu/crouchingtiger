angular
.module('theme.ui-carousel', [])
.controller('CarouselDemoController', ['$scope', function ($scope) {
  'use strict';
  $scope.myInterval = 6000;
  var slides = $scope.slides = [];
  var images = ['lmc-app1.jpg', 'lmc-app1-2.jpg', 'lmc-app2.jpg', 'lmc-app2-2.jpg', 'lmc-app3.jpg'];
  $scope.addSlide = function() {
    slides.push({
      image: 'assets/demo/images/'+images[slides.length],
      text: images[slides.length]
    });
  };
  for (var i=0; i<5; i++) {
    $scope.addSlide();
  }
}]);