update user_profile
set name = $1, profile_bio = $2, profile_image = $3
where profile_id = $4;