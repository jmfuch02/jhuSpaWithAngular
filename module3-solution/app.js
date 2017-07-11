(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItem.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'nid',
    bindtoController: true,
    restrict: 'E'
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;
  ctrl.found = [];

  ctrl.narrow = function (searchTerm) {
    // ctrl.found = MenuSearchService.getMatchedMenuItems(searchTerm);
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    promise.then(function (result) {
      ctrl.found = result;
    });

    console.log("I am in the 'narrow' function in NarrowItDownController!");
    console.log(ctrl.found);
  };

  ctrl.removeItem = function (index) {
    ctrl.found.splice(index, 1);
    return found;
  };

}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    }).then(
      function (result) {
        // process result and only keep items that match
        var resultItems = result.data.menu_items;
        console.log(resultItems);

        var foundItems = [];

        for (var i = 0; i < resultItems.length; i++) {
          if (resultItems[i].description.indexOf(searchTerm) !== -1) {
            foundItems.push(resultItems[i]);
          }
        }

        // return processed items
        console.log(foundItems);
        return foundItems;
      });
  };

}

})();
