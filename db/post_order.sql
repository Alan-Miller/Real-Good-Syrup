insert into orders (user_id, date, filled, order_total)
  values ($1, current_date, false, $2)
  returning *



-- insert into orders_products (user_id, product_id, product_total)
--   values ($1, $2, $3),
--    ($1, $4, $5),
--    ($1, $6, $7);
