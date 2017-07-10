(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective)

function foundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'nid',
    bindtoController: true
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;

  ctrl.narrow = function (searchTerm) {
    MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
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
        var foundItems = [];
        var resultItems = result.data.menu_items;

        for (var i = 0; i < resultItems.length; i++) {
          if (resultItems[i].description.indexOf(searchTerm) !== -1) {
            foundItems.push(resultItems[i]);
          }
        }

        // return processed items
        return foundItems;
      });
  };

}

})();
