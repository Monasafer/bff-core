SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
USE `heroku_8a551bcfa4d3d31`;

--
-- Base de datos: `monadb`
--

--
-- Estructura de tabla para la tabla `expend`
--

CREATE TABLE `expend` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `value` int(100) NOT NULL,
  `month` date NOT NULL,
  `state` int(1) NOT NULL,
  `id_fe` int(11),
  `isDailyUse` int(1) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `rel_fixed_expend`
--

CREATE TABLE `rel_fixed_expend` (
  `id_fe` int(11) NOT null AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `creation_date` date NOT NULL,
  `state` int(1) NOT NULL,
  `active` int(1) NOT NULL,
  `special` int(1) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `special_expend`
--

CREATE TABLE `special_expend` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `capacity` int(100) NOT NULL,
  `stock` int(100) NOT NULL,
  `user_id` int(11) NOT NULL KEY,
  `month` date NOT NULL,
  `state_code` int(1) NOT NULL,
  `id_fe` int(11),
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `mona`
--

CREATE TABLE `mona` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `value` int(100) NOT NULL,
  `user_id` int(11) NOT NULL KEY,
  `month` date NOT NULL,
  `creation_date` date NOT NULL,
  `state_code` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `save`
--

CREATE TABLE `save` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `value` int(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `saved` int(11) NOT null default 0,
  `month` date NOT NULL,
  `creation_date` date NOT NULL,
  `state_code` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `user` varchar(20) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL UNIQUE KEY,
  `pass` varchar(20) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `mail` varchar(320) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL UNIQUE,
  `creation_date` date NOT NULL,
  `state_code` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `month`
--

CREATE TABLE `month` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `month` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `state` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `expend`
--
ALTER TABLE `expend`
  ADD CONSTRAINT `expend_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

ALTER TABLE `expend`
  ADD CONSTRAINT `expend_ibfk_2` FOREIGN KEY (`id_fe`) REFERENCES `rel_fixed_expend` (`id_fe`);
 --
-- Filtros para la tabla `special_expend`
--
ALTER TABLE `special_expend`
  ADD CONSTRAINT `special_expend_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

 
--
-- Filtros para la tabla `mona`
--
ALTER TABLE `mona`
  ADD CONSTRAINT `mona_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `save`
--
ALTER TABLE `save`
  ADD CONSTRAINT `save_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Add special Column 
--
ALTER TABLE 'rel_fixed_expend' ADD special int(1) DEFAULT 0 NOT NULL;


--
-- Add Daily Column 
--
ALTER TABLE 'expend' ADD isDailyUse int(1) DEFAULT 0 NOT NULL;


/*

-- heroku_8a551bcfa4d3d31.expend definition

CREATE TABLE `expend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `value` int(100) NOT NULL,
  `month` date NOT NULL,
  `state` int(1) NOT NULL DEFAULT '1',
  `id_fe` int(11) DEFAULT NULL,
  `isDailyUse` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4015 DEFAULT CHARSET=latin1;


-- heroku_8a551bcfa4d3d31.`month` definition

CREATE TABLE `month` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `month` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `state` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=955 DEFAULT CHARSET=latin1;


-- heroku_8a551bcfa4d3d31.rel_fixed_expend definition

CREATE TABLE `rel_fixed_expend` (
  `id_fe` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `creation_date` date NOT NULL,
  `state` int(1) NOT NULL,
  `active` int(1) NOT NULL,
  `isSpecial` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_fe`)
) ENGINE=InnoDB AUTO_INCREMENT=935 DEFAULT CHARSET=latin1;


-- heroku_8a551bcfa4d3d31.special_expend definition

CREATE TABLE `special_expend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `capacity` int(100) NOT NULL,
  `stock` int(100) NOT NULL,
  `month` date NOT NULL,
  `state_code` int(1) NOT NULL,
  `id_fe` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=utf8;


-- heroku_8a551bcfa4d3d31.`user` definition

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(20) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `pass` varchar(200) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `mail` varchar(320) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `creation_date` date NOT NULL,
  `state_code` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=575 DEFAULT CHARSET=latin1;


-- heroku_8a551bcfa4d3d31.mona definition

CREATE TABLE `mona` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `value` int(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `month` date NOT NULL,
  `creation_date` date NOT NULL,
  `state_code` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `mona_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=935 DEFAULT CHARSET=latin1;


-- heroku_8a551bcfa4d3d31.save definition

CREATE TABLE `save` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `value` int(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `saved` int(11) NOT NULL DEFAULT '0',
  `month` date NOT NULL,
  `creation_date` date NOT NULL,
  `state_code` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `save_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=latin1;

*/