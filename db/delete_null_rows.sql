DELETE FROM orders_products
  WHERE product_id IS NULL and price_paid IS NULL
