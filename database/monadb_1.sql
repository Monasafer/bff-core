CREATE TABLE `save` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `state` int(1) NOT NULL,
  `tag`  text CHARACTER SET latin1 COLLATE latin1_bin,
  `creation_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `save_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `value` int(100) NOT NULL,
  `state` int(1) NOT NULL,
  `save_id` int(11),
  `creation_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `save_history`
  ADD CONSTRAINT `save_history_ibfk_1` FOREIGN KEY (`save_id`) REFERENCES `save` (`id`);
 
ALTER TABLE `save`
  ADD CONSTRAINT `save_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);