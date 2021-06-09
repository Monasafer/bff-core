INSERT INTO `user`
(`user`, pass, mail, creation_date, state_code)
VALUES('feder', 'asdf', 'federicomarilungo@gmail.com', '2020-04-05', 1);

INSERT INTO expend
(descr, value, user_id, creation_date, finish_date, state_code)
VALUES('', 1111, 4, '2020-04-05', '2020-04-05', 1);

INSERT INTO special_expend
(descr, value, user_id, creation_date, finish_date, state_code)
VALUES('daily', 12, 4, '2020-04-05', '2020-04-05', 1);

INSERT INTO special_expend
(descr, value, user_id, creation_date, finish_date, state_code)
VALUES('weekly', 12, 4, '2020-04-05', '2020-04-05', 1);

INSERT INTO special_expend
(descr, value, user_id, creation_date, finish_date, state_code)
VALUES('fsi', 12, 4, '2020-04-05', '2020-04-05', 1);

INSERT INTO mona
(descr, value, user_id, creation_date, state_code)
VALUES('gastodesdebase', 2111, 4, '2020-04-05', 1);

insert into mona
(descr, value, user_id, creation_date, 1)
values('Primer gasto', 720,'4','2020-04-05T03:00:00.000Z');

INSERT INTO save
(descr, value, user_id, creation_date, state_code)
VALUES('', 50, 4, '2020-04-05', 1);

select  * from `user`

select  * from `expend`

select  * from `mona`

select  * from `save`

select * from `special_expend`

SELECT table_schema "DB Name",
        ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) "DB Size in MB" 
FROM information_schema.tables 
GROUP BY table_schema; 