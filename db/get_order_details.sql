select qty, products.short_name as product_name, orders_products.product_total as product_total
from products
join orders_products on orders_products.product_id = products.id
join orders on orders_products.order_id = orders.id
join users on users.id = orders.user_id
where orders.id = $1
order by products.id


--
-- select qty, products.short_name as product_name, orders_products.product_total as product_total
-- from users
-- join orders on orders.user_id = users.id
-- join orders_products on orders_products.order_id = orders.id
-- where id = $1
-- order by products.id
