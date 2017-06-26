(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

  $scope.checkButton = function () {
    var outputMessageText = getMessage($scope.inputList);
    $scope.outputMessage = outputMessageText;
  }

  function getMessage(string) {
    var length = 0;
    if(string) {var length = string.split(',').length;}
    var message = "";

    if(length < 4) {
      message = "Enjoy!";
    }
    else {
      message = "Too much!";
    }
    return message;
  }


};

})();
