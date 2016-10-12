angular.module('syrupApp').controller('cartControl', function($scope, rgsService) {

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    PRODUCTS
      Get all products
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  rgsService.getProducts().then(function(response) {
    $scope.products = response;
    console.log('$prod:', $scope.products);
  });


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
      Places order
        - Creates order object; key is based on product id and value is price
      Runs checkUserIsLoggedIn fn in service
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  $scope.placeOrder = function() {
    var orderObject = {};
    var user = rgsService.getCurrentUser();
    // console.log('THE USER', user);
    orderObject.userId = user.id;
    // console.log(orderObject.userId);

    $('.i-want').each(function(index, val) {

      /*  Remove '$' and convert product price to number, then total  */
      var productPrice = Number(($(this).parent().find('.product-price').html()).replace('$', ''));
      var productTotal = 0;

      var numOfEachSizeOfJar = Number($(this).find('.num').html());
      for (var i = 0; i < numOfEachSizeOfJar; i++) {
        productTotal += productPrice;
      }

      var productId = $(this).parent().find('.product-id').html();
      orderObject[$scope.products[productId - 1].short_name] = {};
      orderObject[$scope.products[productId - 1].short_name].productId = Number(productId);
      orderObject[$scope.products[productId - 1].short_name].qty = numOfEachSizeOfJar;
      orderObject[$scope.products[productId - 1].short_name].price = productTotal;

      // for (var key in orderObject[$scope.products[productId - 1].short_name]) {
        // if (orderObject[$scope.products[productId - 1].short_name].qty === 0) {
          // delete orderObject[key];
          // orderObject[$scope.products[productId - 1].short_name].qty = null;
        // }
      // }
    });
    // console.log(orderObject);
    console.log('Here is your order:', orderObject);
    rgsService.checkUserIsLoggedIn(orderObject);
    // rgsService.confirmOrder(orderObject);
  };




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



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
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
