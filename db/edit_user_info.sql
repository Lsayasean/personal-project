update user_profile
set name = $1, profile_bio = $2, profile_image = $3, background_image = $5
where profile_id = $4
returning *;