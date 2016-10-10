select *
-- select users.id, users.firstname, users.lastname, products.name, price_paid, orders.date
from orders
join orders_products
on orders.user_id = orders_products.user_id
join products
on products.id = orders_products.product_id
join users
on users.id = orders.user_id;
