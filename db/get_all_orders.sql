-- select users.users.firstname, users.lastname, products.name, price_paid, orders.date, count(orders.id), count(products.name)
-- select users.firstname, products.name, count(products.name) as "eachProduct"
-- from orders
-- join orders_products
-- on orders.user_id = orders_products.user_id
-- join products
-- on products.id = orders_products.product_id
-- join users
-- on users.id = orders.user_id
-- where filled = false
-- group by users.firstname, products.name


-- select users.id, count(products.name)
-- from orders
-- join orders_products
-- on orders.user_id = orders_products.user_id
-- join products
-- on products.id = orders_products.product_id
-- join users
-- on users.id = orders.user_id
-- where filled = false


select users.firstname, sum(orders_products.qty), orders.date, min(orders.date) as date_priority, users.id
from users
join orders on orders.user_id = users.id
join orders_products on orders_products.id = orders.id
group by users.id, orders.date
order by date_priority



--
-- select users.id, users.firstname, users.lastname, count(products.name) as num_products, min(date) as date_priority
-- from orders
-- join orders_products
-- on orders.user_id = orders_products.user_id
-- join products
-- on products.id = orders_products.product_id
-- join users
-- on users.id = orders.user_id
-- where filled = false
-- group by users.id
-- order by date_priority



--
-- -- select *
-- select users.id, users.firstname, users.lastname, products.name, price_paid, orders.date, count(products.name)
-- from orders
-- join orders_products
-- on orders.user_id = orders_products.user_id
-- join products
-- on products.id = orders_products.product_id
-- join users
-- on users.id = orders.user_id
-- where filled = false
-- -- group by users.id;
