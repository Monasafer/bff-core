SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
USE `heroku_8a551bcfa4d3d31`;

--
-- Base de datos: `monadb`
--

--
-- Actualizacion de tabla de Gastos
--

ALTER TABLE 'expend' ADD payed BIT DEFAULT 0 NOT NULL;
ALTER TABLE 'expend' ADD tag varchar(100) NULL;

