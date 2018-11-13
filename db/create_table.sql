create table user_profile(
profile_id serial primary key,
name varchar(120),
profile_pass varchar(40),
profile_email varchar(80),
profile_bio varchar(180),
profile_image varchar(500)
)


create table game(
game_id serial primary key,
game_name varchar(180),
game_pic varchar(500)
)


create table games_owned (
owned_id serial PRIMARY key,
game_id integer REFERENCES game(game_id) not null,
profile_id integer REFERENCES user_profile(profile_id) not null
)
