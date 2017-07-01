(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.items = ShoppingListCheckOffService.getToBuyItems();

  buyList.buyThisItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getBoughtItems();

}

function ShoppingListCheckOffService() {
  var service = this;

  // Lists of items
  var toBuyItems = [
    { name: "boxes of cookies", quantity: 10 },
    { name: "bags of chips", quantity: 3 },
    { name: "bunches of carrots", quantity: 7 },
    { name: "cartons of milk", quantity: 6 },
    { name: "loaves of bread", quantity: 4 },
  ];
  var boughtItems = [];

  service.buyItem = function (itemIndex) {
    var itemToMove = toBuyItems[itemIndex];

    toBuyItems.splice(itemIndex, 1);
    boughtItems.push(itemToMove);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

}

})();
