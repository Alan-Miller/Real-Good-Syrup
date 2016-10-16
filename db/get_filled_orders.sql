select users.firstname, users.lastname, sum(orders_products.qty) as num_items_in_order, orders.date, users.id as users_id, orders.id as orders_id
from users
join orders on orders.user_id = users.id
join orders_products on orders_products.order_id = orders.id
where filled = true
group by users_id, orders_id, orders.date
order by date
