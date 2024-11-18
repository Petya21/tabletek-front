-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Nov 11. 13:41
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webbolt`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tablets`
--

CREATE TABLE `tablets` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `os` varchar(50) DEFAULT NULL,
  `cpu_speed` decimal(3,1) DEFAULT NULL,
  `cores` int(11) DEFAULT NULL,
  `display_size` decimal(3,1) DEFAULT NULL,
  `resolution_x` int(11) DEFAULT NULL,
  `resolution_y` int(11) DEFAULT NULL,
  `ram` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `tablets`
--

INSERT INTO `tablets` (`id`, `name`, `os`, `cpu_speed`, `cores`, `display_size`, `resolution_x`, `resolution_y`, `ram`, `price`) VALUES
(1, 'Galaxy Tab S8', 'Android', 2.8, 8, 11.0, 2560, 1600, 8, 226150),
(2, 'iPad Air 2022', 'iOS', 3.1, 6, 10.9, 2360, 1640, 8, 209650),
(3, 'Microsoft Surface Go 3', 'Windows', 3.3, 4, 10.5, 1920, 1280, 4, 139650),
(4, 'Lenovo Tab P11', 'Android', 2.4, 8, 11.0, 2000, 1200, 6, 104650),
(5, 'Fire HD 10', 'Fire OS', 2.0, 8, 10.1, 1920, 1200, 3, 52150),
(6, 'Samsung Galaxy Tab A7', 'Android', 2.0, 8, 10.4, 2000, 1200, 3, 80150);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
