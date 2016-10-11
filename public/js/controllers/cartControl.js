angular.module('syrupApp').controller('cartControl', function($scope, rgsService) {

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    PRODUCTS
      Get all products
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  rgsService.getProducts().then(function(response) {
    $scope.products = response;
  });


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
      Place order
        - Creates order object; key is based on product id and value is price
      Runs confirmOrder fn in service
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.placeOrder = function() {
    var orderObject = {};
    orderObject.userId = rgsService.user.id;

    $('.i-want').each(function(index, val) {

      /*  Remove '$' and convert product price to number, then total  */
      var productPrice = Number(($(this).parent().find('.product-price').html()).replace('$', ''));
      var productTotal = 0;

      var numOfEachSizeOfJar = $(this).find('.num').html();
      for (var i = 0; i < numOfEachSizeOfJar; i++) {
        productTotal += productPrice;
      }

      var productId = $(this).parent().find('.product-id').html();
      orderObject['product' + productId] = productTotal;

      for (var key in orderObject) {
        if (orderObject[key] === 0) {
          // delete orderObject[key];
          orderObject[key] = null;
        }
      }

    });

    console.log(orderObject);
    rgsService.checkUserIsLoggedIn(orderObject);
    // rgsService.confirmOrder(orderObject);
  };










/*

var numJars = 0;
$scope.numJars = function(symbol) {
  if (symbol === '+') {
    numJars++;
    console.log(numJars);
  } else if (symbol === '-' && numJars > 0) {
    numJars--;
    console.log(numJars);
  }
  // var spanOfJars = document.getElementById('i-want');
  $(this).parent().parent().parent().find('.i-want').find('.num').html(numJars);
  // $(this).closest('.one-product').find('.i-want').html(numJars);
  // $('.num').html(numJars);
};
// $scope.numJars();


//
// $scope.theorder = {};
//
// $scope.placeorder = function() {
//
// };

*/



});










/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  †† CODE GRAVEYARD ††
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  PLACE ORDER
    Dynamically create object with keys based on product types ordered
    Set keys equal to empty array
    Push in price for each item of each product
    Dynamically create object property based on product key, set value to empty array
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



//
// for (var key in orderObject) {
//   if (orderObject[key].length < 1) {
//     delete orderObject[key];
//   }
// }
