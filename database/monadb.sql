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
  `id_fe` int(11) UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `rel_fixed_expend`
--

CREATE TABLE `rel_fixed_expend` (
  `id_fe` int(11) NOT null AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `creation_date` date NOT NULL,
  `state` int(1) NOT NULL,
  `active` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `special_expend`
--

CREATE TABLE `special_expend` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `value` int(100) NOT NULL,
  `user_id` int(11) NOT NULL KEY,
  `month` date NOT NULL,
  `creation_date` date NOT NULL,
  `state_code` int(1) NOT NULL,
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
  `user_id` int(11) NOT NULL KEY,
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
