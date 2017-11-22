// var app = require('./server.js');
// var db = app.get('db');


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  EXPORTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
module.exports = {

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    USERS
      Get all users (admin)
      Get this user
      Update user
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  
  getUsers: function(req, res) {
    req.app.get('db').get_users(function(err, users) {
      res.status(200).json(users);
    });
  },

  getThisUser: function(req, res) {
    // console.log('req.user', req.user);
    req.app.get('db').get_this_user([req.params.id], function(err, user) {
      res.status(200).json(user);
    });
  },
  postUser: function(req, res) {
    req.app.get('db').post_user([req.body.firstname, req.body.lastname, req.body.address, req.body.zip, req.body.username, req.body.password], function(err, user) {
      res.status(200).json(user);
    });
  },
  updateUserInfo: function(req, res) {
    req.app.get('db').update_user_info([req.body.firstname, req.body.lastname, req.body.username, req.body.address, req.body.zip, req.body.id], function(err, user) {
      res.status(200).json(user);
    });
  },
  updatePassword: function(req, res) {
    console.log(req.body.newPassword);
    console.log(req.body.id);
    req.app.get('db').update_password([req.body.newPassword, req.body.id], function(err, user) {
      res.status(200).json(user);
    });
  },

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    PRODUCTS
      Get all products
      Update products (admin)
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  getProducts: function(req, res) {
    req.app.get('db').get_products(function(products) {
      // console.log('ERR', err);
      console.log('PRODUCTS', products);
      res.status(200).json(products);
    });
  },
  updateProducts: function(req, res) {
    req.app.get('db').update_products([req.params.id, req.body.price_per], function(err, product) {
      res.status(200).json(product);
    });
  },

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
      Get all orders (admin)
      Get this user's orders
      Post order to db
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  getUnfilledOrders: function(req, res) {
    req.app.get('db').get_unfilled_orders(function(err, orders) {
      res.status(200).json(orders);
    });
  },

  getFilledOrders: function(req, res) {
    req.app.get('db').get_filled_orders(function(err, orders) {
      res.status(200).json(orders);
    });
  },

  markOrderFilled: function(req, res) {
    req.app.get('db').update_order_mark_filled([req.params.id], function(err, order) {
      // req.app.get('db').get_unfilled_orders(function(err, unfilled) {
        // req.app.get('db').get_filled_orders(function(err, filled) {
          res.status(200).json(order);
        });
      // });
    // });
  },

  markOrderUnfilled: function(req, res) {
    req.app.get('db').update_order_mark_unfilled([req.params.id], function(err, order) {
      req.app.get('db').get_unfilled_orders(function(err, unfilled) {
        req.app.get('db').get_filled_orders(function(err, filled) {
          res.status(200).json(filled);
        });
      });
    });
  },

  getUserOrders: function(req, res) {
    req.app.get('db').get_user_orders([req.params.id], function(err, orders) {
      res.status(200).json(orders);
    });
  },

  getOrderDetails: function(req, res) {
    req.app.get('db').get_order_details([req.params.id], function(err, details) {
      res.status(200).json(details);
    });
  },

  placeOrder: function(req, res) {
    var userOrder = [req.body.userId];
    userOrder.push(req.body.quart.productId, req.body.quart.qty, req.body.quart.price);
    userOrder.push(req.body.pint.productId, req.body.pint.qty, req.body.pint.price);
    userOrder.push(req.body.half_pint.productId, req.body.half_pint.qty, req.body.half_pint.price);
    // userOrder.push(req.body.total);

    console.log('userOrder before post', userOrder);
    req.app.get('db').post_order([req.body.userId, req.body.total], function(err, order) {
      // res.status(200).json(order);
      console.log('db.post_order returns:', order);
      console.log('returned order id:', order[0].id);
      userOrder.push(order[0].id);
      console.log('userOrder:', userOrder);
      // console.log('pushed obj:', userOrder);
      req.app.get('db').post_ordered_products(userOrder, function(err, details) {
        console.log(err);
        console.log('details:', details);
        // res.status(200).json(order);
        req.app.get('db').delete_null_orders(function(err) {
          res.status(200).json(order[0]);
          // res.status(200).end();
          // Only one of these db functions has a send (otherwise, there is an error regarding sending multiple times with the same header. The value of nesting is that each will wait till the previous is successful.)
        });
      });
    });
  }

};









/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  †† CODE GRAVEYARD ††
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// if (req.body.product1) {
  // userOrder.push(1, req.body.product1);
// } else userOrder.push(null, null);
// if (req.body.product2) {
  // userOrder.push(2, req.body.product2);
// } else userOrder.push(null, null);
// if (req.body.product3) {
  // userOrder.push(3, req.body.product3);
// } else userOrder.push(null, null);


// var userOrder = [req.body.userId];
// if (req.body.product1) {
//   userOrder.push(1, req.body.product1);
// } else userOrder.push(null, null);
// if (req.body.product2) {
//   userOrder.push(2, req.body.product2);
// } else userOrder.push(null, null);
// if (req.body.product3) {
//   userOrder.push(3, req.body.product3);
// } else userOrder.push(null, null);


// var userOrder = [];
// for (var key in req.body) {
//   userOrder.push(req.body[key]);
// }
// var justProducts = userOrder.splice(userOrder.indexOf(req.body.userId));
// justProducts.forEach(function(curr, ind, attrs) {
//   userOrder.push(ind + 1, req.body);
// });






/*
placeOrder: function(req, res) {
  // console.log(req.body['3']);
  // for (var prodIdProp in req.body) {

    // for (var i = 0; i < req.body.length; i++) {
    //   for (var i = 0; i < prop.length; i++) {
    //     db.post_order([req.body[i].id], function(err, order) {
    //
    //     });
    //     res.status(200).json(order);
    //   }
    // }

    // for (var i = 1; i < req.body[prodIdProp].length; i++) {
    //   // prodIdProp is product
    //   console.log('userId: ' + req.params.id);
    //   console.log(prodIdProp + ' ' + req.body[prodIdProp][i]);

      db.post_order([req.body.userId], function(err, order) {
        // console.log('LOOK HERE: ' + order);
        // res.status(200).json(order);
        res.send(order);
      });
      db.post_ordered_products([req.body.userId, 1, req.body['1'], 2, req.body['2'], 3, req.body['3']], function(err, order) {
        // console.log('LOOK HERE: ' + order);
        // res.status(200).json(order);
        res.send(order);
      });
      // .then(function(res) {
      //   db.see_order_id([res], function(err, order) {
      //     res.json(order);
      //   })
      //   .then(function(res) {
      //     db.post_ordered_products([res.orderId], function(err, order) {
      //       res.json(order);
      //     });
      //   });
      // });

      // db.post_order([req.body[prodIdProp][i]], function(err, order) {
      //
      // });
      // res.status(200).json(order);
    // }
  // }
},

*/








//   getProductsForOrderNumber: function(req, res) {
//     if (/* req.order_id doesn't belog to the current_user_id */) {
//       res.status(403).json('')
//     }
//     db.getProductsForOrderNumber(req.order_id)
//   }
