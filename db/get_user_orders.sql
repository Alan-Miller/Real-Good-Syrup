select products.name, price_paid, orders.date
from orders
join orders_products
on orders.id = orders_products.order_id
join products
on products.id = orders_products.product_id
join users
on users.id = orders.user_id
where user_id = $1
