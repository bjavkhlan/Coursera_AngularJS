(function(){
'use strict';
angular.module('LunchCheck',[])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.list='';
  $scope.items;
  $scope.message='';


  $scope.checkIfTooMuch = function() {
    $scope.items = $scope.list.split(",");
  //  console.log($scope.items);
    if($scope.items.length == 1 && $scope.list=='') $scope.message = "Please enter data first";
    else if($scope.items.length <= 3) $scope.message = "Enjoy!";
    else $scope.message = "Too much!";
  };
};

})();
