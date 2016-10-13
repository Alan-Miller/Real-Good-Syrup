update orders
  set filled = true
  where orders.id = $1
