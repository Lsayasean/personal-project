insert into user_profile (name, profile_pass, profile_email, profile_bio, profile_image, background_image)
values ($1, $2, $3, $4, $5, $6)
returning *;
