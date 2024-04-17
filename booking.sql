-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 08, 2024 at 12:55 AM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cathotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `checkindate` date DEFAULT NULL,
  `checkoutdate` date DEFAULT NULL,
  `fullprice` decimal(10,2) DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `priceVat` decimal(10,2) DEFAULT NULL,
  `details` text,
  `bookingdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `days` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `username`, `checkindate`, `checkoutdate`, `fullprice`, `discount`, `price`, `priceVat`, `details`, `bookingdate`, `days`) VALUES
(1, 'admin', '2024-04-01', '2024-04-08', '800.00', '100.00', '700.00', NULL, NULL, '2024-04-07 14:52:10', NULL),
(2, 'admin', '2024-04-07', '2024-04-14', '0.00', '0.00', NULL, '0.00', '', '2024-04-07 14:58:44', NULL),
(3, 'admin', '2024-04-07', '2024-04-14', '0.00', '0.00', NULL, '0.00', '', '2024-04-07 14:58:48', NULL),
(4, 'No login', '2024-04-07', '2024-04-08', '0.00', '0.00', NULL, '0.00', '', '2024-04-07 15:47:22', NULL),
(5, 'No login', '2024-04-12', '2024-04-13', '0.00', '0.00', NULL, '0.00', '', '2024-04-07 15:53:39', NULL),
(6, 'No login', '2024-04-12', '2024-04-13', '0.00', '0.00', NULL, '0.00', '', '2024-04-07 15:53:41', NULL),
(7, 'No login', '2024-04-12', '2024-04-13', '0.00', '0.00', NULL, '0.00', '', '2024-04-07 15:54:23', NULL),
(8, 'No login', '2024-04-13', '2024-04-14', '0.00', '0.00', NULL, '0.00', '', '2024-04-07 16:04:38', NULL),
(9, '', NULL, NULL, '0.00', '0.00', NULL, '0.00', NULL, '2024-04-07 16:28:00', NULL),
(10, '', NULL, NULL, '0.00', '0.00', NULL, '0.00', NULL, '2024-04-07 16:31:49', NULL),
(11, '', NULL, NULL, '0.00', '0.00', NULL, '0.00', NULL, '2024-04-07 16:34:17', NULL),
(12, '', NULL, NULL, '0.00', '0.00', NULL, '0.00', NULL, '2024-04-07 16:34:19', NULL),
(13, '', NULL, NULL, '0.00', '0.00', NULL, '0.00', NULL, '2024-04-08 00:01:00', NULL),
(14, '', NULL, NULL, '0.00', '0.00', NULL, '0.00', NULL, '2024-04-08 00:02:18', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
