CREATE TABLE `expend` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `value` int(100) NOT NULL,
  `month` date NOT NULL,
  `state` int(1) NOT NULL,
  `id_fixed_expend` int(11),
  `payed` BIT DEFAULT 0 NOT null,
  `tag`  text CHARACTER SET latin1 COLLATE latin1_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `rel_fixed_expend` (
  `id` int(11) NOT null AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `creation_date` date NOT NULL,
  `state` int(1) NOT NULL,
  `active` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `mona` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `value` int(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `month` date NOT NULL,
  `creation_date` date NOT NULL,
  `state_code` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `user` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user` varchar(20) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL UNIQUE KEY,
  `pass` varchar(320) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `mail` varchar(320) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL UNIQUE,
  `creation_date` date NOT NULL,
  `state_code` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `month` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `month` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `state` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `reserves` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `value` int(100) NOT NULL,
  `month` date NOT NULL,
  `state` int(1) NOT NULL,
  `id_fixed_reserve` int(11),
  `tag`  text CHARACTER SET latin1 COLLATE latin1_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `rel_fixed_reserves` (
  `id` int(11) NOT null AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `creation_date` date NOT NULL,
  `state` int(1) NOT NULL,
  `active` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `reserves_expends` (
  `id` int(11) NOT null AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `creation_date` date NOT NULL,
  `state` int(1) NOT NULL,
  `value` int(11) NOT NULL,
  `reserve_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE `mona`
  ADD CONSTRAINT `mona_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
 
ALTER TABLE `month`
  ADD CONSTRAINT `month_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
 
ALTER TABLE `expend`
  ADD CONSTRAINT `expend_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
 
ALTER TABLE `expend`
  ADD CONSTRAINT `expend_ibfk_2` FOREIGN KEY (`id_fixed_expend`) REFERENCES `rel_fixed_expend` (`id`);

ALTER TABLE `rel_fixed_expend`
  ADD CONSTRAINT `rel_fixed_expend_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `reserves`
  ADD CONSTRAINT `reserves_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `reserves`
  ADD CONSTRAINT `reserves_ibfk_2` FOREIGN KEY (`id_fixed_reserve`) REFERENCES `rel_fixed_reserves` (`id`);

ALTER TABLE `rel_fixed_reserves`
  ADD CONSTRAINT `rel_fixed_reserves_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `reserves_expends`
  ADD CONSTRAINT `reserves_expends_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
 
ALTER TABLE `reserves_expends`
  ADD CONSTRAINT `reserves_expends_ibfk_2` FOREIGN KEY (`reserve_id`) REFERENCES `reserves` (`id`);