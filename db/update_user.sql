update users
  set firstname = $2,
  lastname = $3,
  address = $4,
  zip = $5
  where id = $1
