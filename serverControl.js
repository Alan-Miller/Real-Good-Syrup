var app = require('./server.js');
var db = app.get('db');


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
    // if (/* I'm not allowed to see all users because I'm an admin */) {
    //   /* return an error */
    // }
    db.get_users(function(err, users) {
      res.status(200).json(users);
    });
  },
  getThisUser: function(req, res) {
    console.log('req.user', req.user);
    db.get_this_user([req.params.id], function(err, user) {
      res.status(200).json(user);
    });
  },
  postUser: function(req, res) {
    db.post_user([req.body.firstname, req.body.lastname, req.body.address, req.body.zip, req.body.username, req.body.password], function(err, user) {
      res.status(200).json(user);
    });
  },
  // updateUser: function(req, res) {
  //   db.update_user([req.params.id, req.body.firstname, req.body.lastname, req.body.address, req.body.zip], function(err, user) {
  //     res.status(200).json(user);
  //   });
  // },

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    PRODUCTS
      Get all products
      Update products (admin)
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  getProducts: function(req, res) {
    db.get_products(function(err, products) {
      res.status(200).json(products);
    });
  },
  updateProducts: function(req, res) {
    // if (/* I'm not allowed to see all users because I'm not an admin */) {
    //   /* return an error */
    // }
    db.update_products([req.params.id, req.body.price_per], function(err, product) {
      res.status(200).json(product);
    });
  },

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
    ORDERS
      Get all orders (admin)
      Get this user's orders
      Post order to db
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  getAllOrders: function(req, res) {
    db.get_all_orders(function(err, orders) {
      res.status(200).json(orders);
    });
  },
  getUserOrders: function(req, res) {
    db.get_user_orders([req.params.id], function(err, orders) {
      res.status(200).json(orders);
    });
  },
  placeOrder: function(req, res) {
    var userAndProducts = [req.body.userId];
    if (req.body.product1) {
      userAndProducts.push(1, req.body.product1);
    } else userAndProducts.push(null, null);
    if (req.body.product2) {
      userAndProducts.push(2, req.body.product2);
    } else userAndProducts.push(null, null);
    if (req.body.product3) {
      userAndProducts.push(3, req.body.product3);
    } else userAndProducts.push(null, null);
    // var userAndProducts = [];
    // for (var key in req.body) {
    //   userAndProducts.push(req.body[key]);
    // }
    // var justProducts = userAndProducts.splice(userAndProducts.indexOf(req.body.userId));
    // justProducts.forEach(function(curr, ind, attrs) {
    //   userAndProducts.push(ind + 1, req.body);
    // });
    db.post_order([req.body.userId], function(err, order) {
      // res.status(200).json(order);
      db.post_ordered_products(userAndProducts, function(err, order) {
        // res.status(200).json(order);
        db.delete_null_rows(function(err) {
          res.status(200).end(); // Only one of these db functions should have a send (otherwise, there is an error regarding sending multiple times with the same header. The value of nesting is that each will wait till the previous is successful.)
        });
      });
    });
  }




};










//   getProductsForOrderNumber: function(req, res) {
//     if (/* req.order_id doesn't belog to the current_user_id */) {
//       res.status(403).json('')
//     }
//     db.getProductsForOrderNumber(req.order_id)
//   }





/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  †† CODE GRAVEYARD ††
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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
