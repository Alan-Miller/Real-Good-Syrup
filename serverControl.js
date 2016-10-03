var app = require('./server.js');

var db = app.get('db');

module.exports = {
  getUsers: function(req, res) {
    // if (/* I'm not allowed to see all users because I'm an admin */) {
    //   /* return an error */
    // }
    db.see_users(function(err, users) {
      res.status(200).json(users);
    });
  },
  getProducts: function(req, res) {
    db.see_products(function(err, products) {
      res.status(200).json(products);
    });
  },
  updateProducts: function(req, res) {
    // if (/* I'm not allowed to see all users because I'm an admin */) {
    //   /* return an error */
    // }
    db.update_products([req.params.id, req.body.price_per], function(err, product) {
      res.status(200).json(product);
    });
  },
  updateUser: function(req, res) {
    db.update_user([req.params.id, req.body.firstname, req.body.lastname, req.body.address, req.body.zip], function(err, user) {
      res.status(200).json(user);
      console.log('Firing updateUser');
    });
  }
//   getMyOrders: function(req, res) {
//     db.getOrders(current_user_id);
//   },
//   getProductsForOrderNumber: function(req, res) {
//     if (/* req.order_id doesn't belog to the current_user_id */) {
//       res.status(403).json('')
//     }
//     db.getProductsForOrderNumber(req.order_id)
//   }



};
