select distinct up.name, up.profile_email, up.profile_bio, up.profile_image , up.background_image from games_owned ow
join user_profile up on ow.profile_id = up.profile_id
where ow.game_id in (select game_id from games_owned where profile_id = $1) and ow.profile_id != $1;