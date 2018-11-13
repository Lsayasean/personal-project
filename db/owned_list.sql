select o.owned_id, g.game_name, g.game_pic from games_owned o
join game g on o.game_id = g.game_id
where o.profile_id = $1