update user_profile
set  name = $1, profile_bio = $2, profile_image = $3, background_image = $4
where profile_id = $4;