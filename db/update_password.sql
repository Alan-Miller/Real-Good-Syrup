update users
  set password = crypt($1, gen_salt('bf'))
  where id = $2
