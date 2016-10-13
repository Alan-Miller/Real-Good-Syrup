-- select users.users.firstname, users.lastname, products.name, product_total, orders.date, count(orders.id), count(products.name)
select users.firstname, products.name, count(products.name) as "eachProduct"
from orders
join orders_products
on orders.user_id = orders_products.user_id
join products
on products.id = orders_products.product_id
join users
on users.id = orders.user_id
where filled = false
group by users.firstname, products.name


-- select *
-- from orders
-- join orders_products
-- on orders.user_id = orders_products.user_id
-- join products
-- on products.id = orders_products.product_id
-- join users
-- on users.id = orders.user_id
-- where filled = false



--
-- -- select *
-- select users.id, users.firstname, users.lastname, products.name, product_total, orders.date, count(products.name)
-- from orders
-- join orders_products
-- on orders.user_id = orders_products.user_id
-- join products
-- on products.id = orders_products.product_id
-- join users
-- on users.id = orders.user_id
-- where filled = false
-- -- group by users.id;
