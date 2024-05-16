-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 19, 2024 at 04:32 PM
-- Server version: 8.0.36-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `modelprime`
--

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE `cards` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `card_number` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `card_holder` varchar(220) COLLATE utf8mb4_general_ci NOT NULL,
  `expiry` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(200) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cards`
--

INSERT INTO `cards` (`id`, `userId`, `card_number`, `card_holder`, `expiry`, `type`) VALUES
(9, 113, '4562 2233 5678 7852', 'Arham Khan', '11/22', 'Visa');

-- --------------------------------------------------------

--
-- Table structure for table `modals`
--

CREATE TABLE `modals` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `path` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `size` float NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modals`
--

INSERT INTO `modals` (`id`, `name`, `path`, `size`, `user_id`, `created_at`) VALUES
(90, 'new.stl', '/temp/file-1702549941447-668233616.stl', 16256800, 107, '2023-12-14 10:32:21'),
(92, 'new3.stl', '/temp/file-1702549956392-212502747.stl', 13968500, 107, '2023-12-14 10:32:36'),
(95, 'new4.stl', '/temp/file-1702632814949-277524577.stl', 8481080, 107, '2023-12-15 09:33:35'),
(96, 'new.stl', '/temp/file-1702640013678-299021655.stl', 16256800, 107, '2023-12-15 11:33:34');

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`id`, `name`) VALUES
(1, 'Model Room'),
(2, 'Brand Selection'),
(3, 'Tooth Prep'),
(4, 'File Conversion');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sub_title` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `price` double(16,2) NOT NULL DEFAULT '0.00',
  `discount` double(4,2) NOT NULL DEFAULT '0.00',
  `deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `sub_title`, `description`, `price`, `discount`, `deleted`) VALUES
(1, 'Classic', 'Classic', 'New Product added', 4.00, 0.00, 1),
(2, 'Starter', 'Starter', 'New Product added with new Option', 4.00, 0.00, 0),
(3, 'Brand Selection', 'Brand Selection', 'New Product added with new Brand Selection', 4.00, 0.00, 0),
(4, 'Prep Room', 'Prep Room', 'New Product added with multiple options', 4.00, 0.00, 0),
(6, 'arham', 'test', 'description test', 10.00, 0.00, 0),
(7, 'testing ', 'testing', 'testing description', 1000.00, 0.00, 0),
(8, 'ajksdns', 'uikasdsd', 'description', 10.00, 0.00, 0),
(10, 'hassan', 'hello world', 'asadsadasdsadsdsad', 15.00, 0.00, 0),
(11, 'sasdasads', 'sdadssasda', 'dsakjdskjdbsajbadjnsdab', 45.00, 0.00, 0),
(12, '137', 'email1@gmail.com', '137', 20.00, 10.00, 0),
(13, '137', 'email1@gmail.com', '137', 20.00, 10.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_options`
--

CREATE TABLE `product_options` (
  `product_id` int NOT NULL,
  `option_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_options`
--

INSERT INTO `product_options` (`product_id`, `option_id`) VALUES
(1, 1),
(2, 1),
(2, 4),
(3, 1),
(3, 4),
(4, 1),
(4, 2),
(4, 3),
(6, 1),
(7, 1),
(8, 1),
(8, 2);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `emailWhenPillowReady` tinyint(1) NOT NULL DEFAULT '0',
  `emailWhenSomeoneAnswer` tinyint(1) NOT NULL DEFAULT '0',
  `emailWhenSomeoneMentions` tinyint(1) NOT NULL DEFAULT '0',
  `new_launches` tinyint(1) NOT NULL DEFAULT '0',
  `monthly_updates` tinyint(1) NOT NULL DEFAULT '0',
  `subscribe_newsLetter` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `userId`, `emailWhenPillowReady`, `emailWhenSomeoneAnswer`, `emailWhenSomeoneMentions`, `new_launches`, `monthly_updates`, `subscribe_newsLetter`) VALUES
(2, 113, 1, 1, 0, 1, 0, 0),
(3, 121, 0, 0, 0, 0, 0, 0),
(4, 122, 0, 0, 0, 0, 0, 0),
(5, 123, 0, 0, 0, 0, 0, 0),
(6, 131, 0, 0, 0, 0, 0, 0),
(7, 134, 0, 0, 0, 0, 0, 0),
(8, 135, 0, 0, 0, 0, 0, 0),
(9, 136, 0, 0, 0, 0, 0, 0),
(27, 137, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int NOT NULL,
  `title` varchar(220) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(220) COLLATE utf8mb4_general_ci NOT NULL,
  `files` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `description`, `files`, `userId`, `created_at`) VALUES
(31, 'First Issue', 'New ISSUE occur in uploading modal', '[\"/temp/files-1702557740193-456867203.PNG\"]', 107, '2023-12-14 12:42:20'),
(33, '', '', '[]', 136, '2024-04-15 11:06:38');

-- --------------------------------------------------------

--
-- Table structure for table `ticket_chats`
--

CREATE TABLE `ticket_chats` (
  `id` int NOT NULL,
  `message` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `ticket_id` int NOT NULL,
  `from` varchar(11) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket_chats`
--

INSERT INTO `ticket_chats` (`id`, `message`, `ticket_id`, `from`, `created_at`, `userId`) VALUES
(66, 'Hello whats an update?', 31, 'user', '2023-12-14 12:42:59', 114),
(67, 'hi', 31, 'admin', '2023-12-14 12:43:03', 107),
(68, 'we were working on this', 31, 'user', '2023-12-14 12:43:13', 114),
(69, 'hi', 31, 'admin', '2023-12-14 12:43:18', 107),
(70, 'What working!', 31, 'admin', '2023-12-14 12:43:27', 107),
(71, 'okay ', 31, 'user', '2023-12-14 12:43:31', 114),
(72, 'What working!', 31, 'admin', '2023-12-14 12:43:36', 107),
(73, 'What working! ok ki report ha', 31, 'admin', '2023-12-14 12:44:08', 107),
(74, 'yes done', 31, 'user', '2023-12-14 12:44:13', 114);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(120) COLLATE utf8mb4_general_ci NOT NULL,
  `company` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `zip_code` int NOT NULL,
  `license_number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` text COLLATE utf8mb4_general_ci,
  `profile_image` text COLLATE utf8mb4_general_ci,
  `type` enum('lab','clinic') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_type` enum('user','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  `is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `otp_code` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `company`, `address`, `number`, `state`, `zip_code`, `license_number`, `password`, `profile_image`, `type`, `user_type`, `is_verified`, `otp_code`, `created_at`) VALUES
(107, 'Arham', 'Khan', 'arhamkhancs99@gmail.com', 'adaaasads', 'USAA', '03317524020', 'karachi', 7460, '134242324244242', '$2b$10$KK4fT9RxvE7K7Aphfn6PnOTXyt4xzqEogXqee9bfzjPMwSGaT9aaS', '/temp/file-1702639089679-409043710.PNG', 'lab', 'user', 1, 89074, '2024-04-19 09:22:31'),
(113, 'ARAM', 'ALi', 'arhamkhancs33@gmail.com', 'adaaasads', 'sadds', '123123', 'karachi', 7460, '134242324244242', '$2b$10$29cs6HxkUvImb6L2Z3MA5eWKzVw9CMlarQ3XcQqufR7eTMA0QZfJK', NULL, 'lab', 'user', 1, NULL, '2024-04-19 07:08:41'),
(114, 'Admin', '', 'admin@gmail.com', '', '', '', '', 0, '', '$2b$10$2k8LB4.arGimHacbvbxu5eMn/7sBEDBpaQxXrUO.VGmwsjppaRsEK', NULL, 'lab', 'admin', 1, NULL, '2024-04-19 09:31:27'),
(121, 'Muhammad Ismail', 'Khan', 'arhamkhancs3@gmail.com', 'SPEC Oil and Gas', 'Flat no.4,2nd Floor 3D 28/57 Nazimabad No.3', '03123221231123', 'Sindh', 74600, '03104456788', '$2b$10$IsNEVXBgjkdvq8CD0d31IOBS0hmNx4dSlOOVp6oD9KO0tVcb2/Yq.', NULL, 'lab', 'user', 1, NULL, '2024-04-19 07:08:41'),
(122, 'Muhammad ALi', 'Khan', 'arhamkhancs3003@gmail.com', 'SPEC Oil and Gas', 'Flat no.4,2nd Floor 3D 28/57 Nazimabad No.3', '03123221231123', 'Sindh', 74600, '03108876351', '$2b$10$Dn0nBHcNN0mI.feY/ibqNORe2lStG5SF3Y5e0dyMFjxteksE7DG3i', NULL, 'clinic', 'user', 1, NULL, '2024-04-19 09:29:46'),
(123, 'Arham', 'Khan', 'arhamkhancs30000003@gmail.com', 'Tassaract', 'Gulshan Block 6 Near Rimjim Shopping Mall', '03123221231123', 'Sindh', 74600, '03104456788', '$2b$10$w8X0wVUcAzCJpuu3uJvgpeyrpBDkmqfBsNlFlcipaIBW1henNVOoC', NULL, 'lab', 'user', 1, NULL, '2024-04-19 07:08:41'),
(124, 'Muhammad Ismail', 'Khan', 'ismailkhanch16@gmail.com', 'SPEC Oil and Gas', 'Flat no.4,2nd Floor 3D 28/57 Nazimabad No.3', '03123221231123', 'Sindh', 74600, '03104456788', '', NULL, 'clinic', 'user', 0, NULL, '2024-04-19 09:29:46'),
(128, 'Muhammad Ismail', 'Khan', 'ismailkhanch169@gmail.com', 'SPEC Oil and Gas', 'Flat no.4,2nd Floor 3D 28/57 Nazimabad No.3', '03123221231123', 'Sindh', 74600, '03108876351', '', NULL, 'clinic', 'user', 0, NULL, '2024-04-19 09:29:46'),
(130, 'Muhammad Ismail', 'Khan', 'ismailkhanch160@gmail.com', 'SPEC Oil and Gas', 'Flat no.4,2nd Floor 3D 28/57 Nazimabad No.3', '03123221231123', 'Sindh', 74600, '03108876351', '', NULL, 'clinic', 'user', 0, NULL, '2024-04-19 09:29:46'),
(131, 'Muhammad Ismail', 'Khan', 'arhamkhancs333@gmail.com', 'SPEC Oil and Gas', 'Flat no.4,2nd Floor 3D 28/57 Nazimabad No.3', '03123221231123', 'Sindh', 74600, '03104456788', '$2b$10$BRMkNWYNsTo1WDkZrMTiwuni.icRBHemruf1ZV/jdjpXtWAY95aL.', NULL, 'clinic', 'user', 1, NULL, '2024-04-19 09:29:46'),
(132, 'Muhammad Ismail', 'Khan', 'ismailkhanch16899@gmail.com', 'SPEC Oil and Gas', 'Flat no.4, 2nd Floor 3 D 28/57 Nazimabad no.3, Karachi', '434243342324423', 'Sindh', 74600, '03108876351', '', NULL, 'lab', 'user', 0, NULL, '2024-04-19 07:08:41'),
(133, 'Muhammad Ismail', 'Khan', 'ismailkhanch16arham@gmail.com', 'SPEC Oil and Gas', 'Flat no.4, 2nd Floor 3 D 28/57 Nazimabad no.3, Karachi', '03108876351', 'Sindh', 74600, '03104456788', '', NULL, 'lab', 'user', 0, NULL, '2024-04-19 07:08:41'),
(134, 'sharu', 'ssss', 'shariq_sami@outlook.com', 'Tasasas', 'sdssdsdsdsd', '34', '23', 23, '43434', '$2b$10$TCs/pIxRvULOcEyNRVjO6OSagrNAkN05C588fZFnAT89vuE4ZF5cS', NULL, 'lab', 'user', 1, NULL, '2024-04-19 07:08:41'),
(135, 'Safan', 'Ali', 'orthoprime1@gmail.com', 'Ortho Prime Dental Lab', '123 Test Ave', '11', 'TX', 77043, '12354', '$2b$10$YzSfqvx/lQPIae57U3EySuL0fpWxkogVcO8cIL7EiNrl4Q1Ad/qd2', NULL, 'lab', 'user', 1, NULL, '2024-04-19 07:08:41'),
(136, 'haseeb', 'haseeb', 'haseeb@tassaract.com', 'tassaract', 'gulshan', '+92123456789', 'sindh', 7888, '111', '$2b$10$Yt6pL/Nq3mD9l6c5tuHaCeiQJdo195lc1vi/wpe8XBbcebtooIK9K', NULL, 'clinic', 'user', 1, NULL, '2024-04-19 09:29:46'),
(137, 'first name1', 'last name1', 'email1@gmail.com', 'company1', 'address 1', '12345678', 'state1', 12244, 'license1', '$2b$10$GBe7KSRJa6SAeeQR1ur0KOEfyC4SO.h./LZ8LUCzSqZKou0fVUl6q', NULL, 'clinic', 'user', 1, NULL, '2024-04-19 09:29:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `card_number` (`card_number`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `modals`
--
ALTER TABLE `modals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_options`
--
ALTER TABLE `product_options`
  ADD PRIMARY KEY (`product_id`,`option_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `userId_2` (`userId`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `ticket_chats`
--
ALTER TABLE `ticket_chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `modals`
--
ALTER TABLE `modals`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ticket_chats`
--
ALTER TABLE `ticket_chats`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `modals`
--
ALTER TABLE `modals`
  ADD CONSTRAINT `modals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `settings`
--
ALTER TABLE `settings`
  ADD CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `ticket_chats`
--
ALTER TABLE `ticket_chats`
  ADD CONSTRAINT `ticket_chats_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
