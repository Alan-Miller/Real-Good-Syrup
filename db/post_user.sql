insert into users (firstname, lastname, address, zip, admin, username, password)
  values ($1, $2, $3, $4, false, $5, crypt($6, gen_salt('bf')));
