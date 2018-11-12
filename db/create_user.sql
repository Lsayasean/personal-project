insert into user_profile (name, profile_pass, profile_email, profile_bio)
values ($1, $2, $3, $4)
returning *;
