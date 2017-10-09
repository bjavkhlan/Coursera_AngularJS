(function() {
'use strict'

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItem: '<',
      onRemove: '&'
    }
  }
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.searchTerm = '';

  menu.removeItem = function(itemIndex) {
    console.log("Here");
    menu.found.splice(itemIndex, 1);
  };

  menu.narrowItDownButton = function(searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    promise.then(function(response) {
      menu.found = [];
      var list = response.data.menu_items;
      for(var i = 0; i < list.length; i ++) {
        if(list[i].description.indexOf(searchTerm) !== -1) {
          menu.found.push(list[i]);
        }
      }
    })
    .catch(function(err) {
      console.log("Error! Promise", err);
    });
  };
}


MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
    });
  };
}

})();
