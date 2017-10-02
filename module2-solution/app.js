(function() {
'use strict';
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.itemList = ShoppingListCheckOffService.getBoughtItems();
  console.log(bought.itemList);
}


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var tobuy = this;

  tobuy.itemList = ShoppingListCheckOffService.getToBuyItems();
  tobuy.buyItem = function(itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }
}


function ShoppingListCheckOffService() {
  var service = this;
  var tobuy = [
    {
      name: 'cookie',
      quantity: 3
    }, {
      name: 'candy',
      quantity: 5
    }, {
      name: 'apple',
      quantity: 2
    }, {
      name: 'bread',
      quantity: 1
    }, {
      name: 'milk',
      quantity: 1
    }
  ];


  var bought = [];


  service.buyItem = function(itemIndex) {
    bought.push(tobuy[itemIndex]);
    tobuy.splice(itemIndex, 1);
  }

  service.getToBuyItems = function() {
    return tobuy;
  }
  service.getBoughtItems = function() {
    return bought;
  }
}


})();
