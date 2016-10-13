select *
from orders
join orders_products
on orders.id = orders_products.order_id
join products
on products.id = orders_products.product_id
join users
on users.id = orders.user_id
where users.id = $1
