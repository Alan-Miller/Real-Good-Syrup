update users
  set firstname = $1,
  lastname = $2,
  username = $3,
  address = $4,
  zip = $5
  where id = $6
