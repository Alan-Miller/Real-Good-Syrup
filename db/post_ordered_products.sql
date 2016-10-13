insert into orders_products (user_id, product_id, qty, product_total, order_id)
  values ($1, $2, $3, $4, $11),
   ($1, $5, $6, $7, $11),
   ($1, $8, $9, $10, $11);
