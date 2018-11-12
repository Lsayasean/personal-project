create table user_profile(
profile_id serial primary key,
name varchar(120),
profile_pass varchar(40),
profile_email varchar(80),
profile_bio varchar(180)
)