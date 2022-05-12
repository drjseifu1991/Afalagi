-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 31, 2021 at 07:01 AM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `afalagi`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `role` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`phone_number`)
);

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`first_name`, `last_name`, `phone_number`, `gender`, `role`, `password`) VALUES
('lidia', 'lema', '0923242040', 'Female', 'User admin', 'MTIzNA=='),
('Dagmawit', 'mulugeta', '0923318059', 'Female', 'Blog admin', 'MTIzNA=='),
('Nolawit', 'frew', '0925764526', 'Female', 'Super admin', 'MTIzNA==');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
CREATE TABLE IF NOT EXISTS `blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blog_title` varchar(255) NOT NULL,
  `blog_detail` text NOT NULL,
  `time` varchar(20) NOT NULL,
  `blog_image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `blog_title`, `blog_detail`, `time`, `blog_image`) VALUES
(17, 'uisoklfgb', 'uyejskewjshyilweks', '09 / 03 / 2032', '725943.jpg'),
(15, 'tuyujilkolk', 'i6tuyhjnm ', 'Sat Aug 21 2021 16:0', '3416.jpg'),
(16, 'jhmn,', 'likhfgfgjhkjm', 'Sat Aug 21 2021 16:0', '989615.jpg'),
(13, 'eifdlkepfdlckx', 'esdpxc\'o;lkesp\'d', 'Sat Aug 21 2021 15:3', '761784.jpg'),
(14, 'gjklkjknm,', 'sfvchtgfhgb', 'Sat Aug 21 2021 16:0', '531399.jpg'),
(11, 'Mother and Son meet each other after ten years', 'sfdghjkhk,kj,\r\nghkj,hmj', 'Sat Aug 21 2021 14:1', '638136.jpg'),
(12, 'Two people who lost each other for 3 decades are meet', 'erftygjhjk,/', 'Sat Aug 21 2021 14:3', '937863.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_phone_number` varchar(30) NOT NULL,
  `comment_time` varchar(100) NOT NULL,
  `comment_message` text NOT NULL,
  `user_last_name` varchar(50) NOT NULL,
  `user_first_name` varchar(50) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user` (`user_phone_number`)
) ENGINE=InnoDB;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `user_phone_number`, `comment_time`, `comment_message`, `user_last_name`, `user_first_name`) VALUES
(40, '0923242040', 'Sat Aug 21 2021 14:27:03 GMT+0300 (East Africa Time)', 'sfdghjkl.j,m', 'Zewudu', 'Frezar'),
(41, '0923242040', 'Sat Aug 21 2021 14:28:10 GMT+0300 (East Africa Time)', 'tyuijolkghn', 'Zewudu', 'Frezar'),
(42, '0925764526', 'Sat Aug 21 2021 14:34:26 GMT+0300 (East Africa Time)', 'sfghj', 'frew', 'nolu'),
(43, '0925764526', 'Sat Aug 21 2021 17:50:49 GMT+0300 (East Africa Time)', 'rftuyioijkh', 'frew', 'nolu'),
(44, '0925764526', 'Fri Aug 27 14:12:28 EAT 2021', 'ooooooooooo', 'frew', 'nolu'),
(45, '0925764526', 'Fri Aug 27 14:12:50 EAT 2021', 'vddfffnjdd', 'frew', 'nolu'),
(46, '0925764526', 'Fri Aug 27 14:13:13 EAT 2021', 'hddfjjdsh', 'frew', 'nolu'),
(47, '0925764526', 'Fri Aug 27 15:47:48 EAT 2021', 'gggghbdhdh', 'frew', 'nolu'),
(48, '0925764526', 'Mon Aug 30 10:37:40 EAT 2021', 'what the ', 'frew', 'nolu');

-- --------------------------------------------------------

--
-- Table structure for table `complited`
--

DROP TABLE IF EXISTS `complited`;
CREATE TABLE IF NOT EXISTS `complited` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_first_name` varchar(50) NOT NULL,
  `tefelagi_first_name` varchar(50) NOT NULL,
  `user_last_name` varchar(50) NOT NULL,
  `user_phone_number` varchar(30) NOT NULL,
  `tefelagi_last_name` varchar(50) NOT NULL,
  `tefelagi_phone_number` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_phone_number` (`user_phone_number`),
  KEY `tefelagi_phone_number` (`tefelagi_phone_number`)
) ENGINE=InnoDB;

--
-- Dumping data for table `complited`
--

INSERT INTO `complited` (`id`, `user_first_name`, `tefelagi_first_name`, `user_last_name`, `user_phone_number`, `tefelagi_last_name`, `tefelagi_phone_number`) VALUES
(22, 'Frezar', 'kaleb', 'Zewudu', '0923242040', 'Teshale', '9223242040'),
(23, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(24, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(25, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(26, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(27, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(28, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(29, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(30, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(31, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(32, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(33, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(34, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(35, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(36, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(37, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(38, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(39, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(40, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(41, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(42, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(43, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(44, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(45, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(46, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(47, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(48, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(49, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(50, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(51, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(52, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(53, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(54, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(55, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(56, 'nolu', '', 'frew', '0925764526', 'Teshale', '9223242040'),
(57, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059'),
(58, 'nolu', '', 'frew', '0925764526', 'mulugeta', '0923318059');

-- --------------------------------------------------------

--
-- Table structure for table `replay`
--

DROP TABLE IF EXISTS `replay`;
CREATE TABLE IF NOT EXISTS `replay` (
  `replay_id` int NOT NULL AUTO_INCREMENT,
  `comment` int NOT NULL,
  `time` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `admin` varchar(100) NOT NULL,
  PRIMARY KEY (`replay_id`),
  KEY `comment` (`comment`)
) ENGINE=InnoDB;

--
-- Dumping data for table `replay`
--



-- --------------------------------------------------------

--
-- Table structure for table `tefelagi`
--

DROP TABLE IF EXISTS `tefelagi`;
CREATE TABLE IF NOT EXISTS `tefelagi` (
  `first_name` varchar(50) NOT NULL,
  `father_name` varchar(50) NOT NULL,
  `grand_father` varchar(50) NOT NULL,
  `mother_name` varchar(50) NOT NULL,
  `brother_name` varchar(50) NOT NULL,
  `sister_name` varchar(50) NOT NULL,
  `uncle_name` varchar(50) NOT NULL,
  `aunt_name` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `birth_date` varchar(30) NOT NULL,
  `phone_number` varchar(30) NOT NULL,
  `birth_place` varchar(100) NOT NULL,
  `current_place` varchar(100) NOT NULL,
  `used_place` varchar(100) NOT NULL,
  `biography` text NOT NULL,
  `picture` text NOT NULL,
  `user` varchar(30) NOT NULL,
  PRIMARY KEY (`phone_number`),
  KEY `user` (`user`)
) ENGINE=InnoDB;

--
-- Dumping data for table `tefelagi`
--



-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `phone_number` varchar(30) NOT NULL,
  `region` varchar(100) NOT NULL,
  `zone` varchar(100) NOT NULL,
  `woreda` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL,
  `town` varchar(100) NOT NULL,
  PRIMARY KEY (`phone_number`)
) ENGINE=InnoDB;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`first_name`, `last_name`, `gender`, `phone_number`, `region`, `zone`, `woreda`, `password`, `town`) VALUES
('eyu', 'alw', 'Male', '0918495080', 'addis', 'addis', 'addis', 'YWRkaXM=', 'addis'),
('eyu', 'alw', 'Male', '09184950805', 'addis', 'addis', 'addis', 'YWRkaXM=', 'addis'),
('Frezar', 'Zewudu', 'Male', '0923242040', 'Addis Abeba', 'Addis Abeba', 'Bahir Dar', 'MTIzNA==', 'Bahir Dar'),
('dagi', 'mulugeta', 'Female', '0923318059', 'Oromia', 'Bahir Dar', 'Addis Abeba', 'MTIzNDU2Nzg=', 'Sendafa'),
('nolu', 'frew', 'Female', '0925764526', 'Oromia', 'Bahir Dar', 'Addis Abeba', 'MTIzNDU=', 'Sendafa');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_phone_number`) REFERENCES `user` (`phone_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `replay`
--
ALTER TABLE `replay`
  ADD CONSTRAINT `replay_ibfk_1` FOREIGN KEY (`comment`) REFERENCES `comment` (`comment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `tefelagi`
--
ALTER TABLE `tefelagi`
  ADD CONSTRAINT `tefelagi_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`phone_number`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
