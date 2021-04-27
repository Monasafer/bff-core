-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 13-04-2020 a las 01:36:42
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `monadb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `monadb`;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `monadb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `expend`
--

CREATE TABLE `expend` (
  `expen_id` int(11) NOT NULL,
  `expen_descr` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `expen_value` int(100) NOT NULL,
  `expen_user_id` int(11) NOT NULL,
  `expen_creation_date` date NOT NULL,
  `expen_finish_date` date NOT NULL,
  `expen_state_code` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mona`
--

CREATE TABLE `mona` (
  `mona_id` int(11) NOT NULL,
  `mona_descr` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `mona_value` int(100) NOT NULL,
  `mona_user_id` int(11) NOT NULL,
  `mona_creation_date` date NOT NULL,
  `mona_state_code` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `save`
--

CREATE TABLE `save` (
  `save_id` int(11) NOT NULL,
  `save_descr` text CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `save_value` int(100) NOT NULL,
  `save_pretend` int(100) NOT NULL,
  `save_user_id` int(11) NOT NULL,
  `save_creation_date` date NOT NULL,
  `save_pretend_date` date NOT NULL,
  `save_state_code` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user` varchar(20) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `pass` varchar(20) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `mail` varchar(320) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `creation_date` date NOT NULL,
  `state_code` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `expend`
--
ALTER TABLE `expend`
  ADD PRIMARY KEY (`expen_id`),
  ADD KEY `expen_user_id` (`expen_user_id`);

--
-- Indices de la tabla `mona`
--
ALTER TABLE `mona`
  ADD PRIMARY KEY (`mona_id`),
  ADD KEY `mona_user_id` (`mona_user_id`);

--
-- Indices de la tabla `save`
--
ALTER TABLE `save`
  ADD PRIMARY KEY (`save_id`),
  ADD KEY `save_user_id` (`save_user_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user` (`user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `expend`
--
ALTER TABLE `expend`
  MODIFY `expen_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mona`
--
ALTER TABLE `mona`
  MODIFY `mona_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `save`
--
ALTER TABLE `save`
  MODIFY `save_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `expend`
--
ALTER TABLE `expend`
  ADD CONSTRAINT `expend_ibfk_1` FOREIGN KEY (`expen_user_id`) REFERENCES `user` (`user_id`);

--
-- Filtros para la tabla `mona`
--
ALTER TABLE `mona`
  ADD CONSTRAINT `mona_ibfk_1` FOREIGN KEY (`mona_user_id`) REFERENCES `user` (`user_id`);

--
-- Filtros para la tabla `save`
--
ALTER TABLE `save`
  ADD CONSTRAINT `save_ibfk_1` FOREIGN KEY (`save_user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
