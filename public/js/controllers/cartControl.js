angular.module('syrupApp').controller('cartControl', function($scope, rgsService, stripe, $http) {



  $scope.charge = function () {
    return stripe.card.createToken($scope.payment.card)
      .then(function (response) {
        console.log('token created for card ending in ', response.card.last4);
        var payment = angular.copy($scope.payment);
        payment.card = void 0;
        payment.token = response.id;
        return $http.post('/api/payment', payment);
      })
      .then(function (payment) {
        console.log('successfully submitted payment for $', payment.amount);
      })
      .catch(function (err) {
        if (err.type && /^Stripe/.test(err.type)) {
          console.log('Stripe error: ', err.message);
        }
        else {
          console.log('Other error occurred, possibly with your API', err.message);
        }
      });
  };





  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    PRODUCTS
      Get all products
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  rgsService.getProducts().then(function(response) {
    $scope.products = response;
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

    });
    orderObject.total = orderObject.quart.price + orderObject.pint.price + orderObject.half_pint.price;
    rgsService.checkUserIsLoggedIn(orderObject);
    // rgsService.confirmOrder(orderObject);
  };

  // Stripe.setPublishableKey('pk_test_hnF7JyUZM8nhb8nk1YSaJpuQ');



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
