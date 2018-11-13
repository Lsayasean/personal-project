delete from games_owned
where game_id = $1 and profile_id = $2;
insert into games_owned (game_id, profile_id)
values ($1, $2);
