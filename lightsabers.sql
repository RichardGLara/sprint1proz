-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 07-Jun-2024 às 15:39
-- Versão do servidor: 10.11.7-MariaDB-cll-lve
-- versão do PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `u358426477_lightsabers`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `city`
--

CREATE TABLE `city` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `state_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `city`
--

INSERT INTO `city` (`id`, `name`, `state_id`) VALUES
(1, 'Belo Horizonte', 1),
(2, 'São Paulo', 2),
(3, 'Contagem', 1),
(4, 'Guarulhos', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `saber`
--

CREATE TABLE `saber` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `saber`
--

INSERT INTO `saber` (`id`, `name`, `image_path`) VALUES
(1, 'Rescuer', 'imgs/sabres/sabre10.jpg'),
(2, 'The Furies\n', 'imgs/sabres/sabreduo.jpg'),
(3, 'The Republic\n', 'imgs/sabres/sabre02.jpg'),
(4, 'The Slayer\n', 'imgs/sabres/sabre01.jpg'),
(5, 'True Knight\n', 'imgs/sabres/sabre03.jpg'),
(6, 'Fear Mk II', 'imgs/sabres/sabre06.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `state`
--

CREATE TABLE `state` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `state`
--

INSERT INTO `state` (`id`, `name`) VALUES
(1, 'Minas Gerais'),
(2, 'São Paulo');

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `state_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `fullname`, `email`, `username`, `password`, `gender`, `state_id`, `city_id`) VALUES
(22, 'Artur Gustavo', 'arturgustavopj@gmail.com', 'arturgpj', '$2y$10$yN.3uiXTYX6WZCr6kVuCIuA1/n0KRZcEOPMtSd77xOm5ArfjIlESS', 'male', 1, 1),
(23, 'Teste', 'teste@teste.com', 'teste', '$2y$10$hkZaa1WR5Zb4Mzm1Gq9wWuOI3f16r1UIABfANjoj5q1QzTKBgr4R.', 'male', 2, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_saber`
--

CREATE TABLE `user_saber` (
  `user_id` int(11) NOT NULL,
  `saber_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `user_saber`
--

INSERT INTO `user_saber` (`user_id`, `saber_id`) VALUES
(22, 1),
(22, 2),
(22, 6),
(23, 1),
(23, 2),
(23, 3),
(23, 4),
(23, 5);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`),
  ADD KEY `state_id` (`state_id`);

--
-- Índices para tabela `saber`
--
ALTER TABLE `saber`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `state_id` (`state_id`),
  ADD KEY `city_id` (`city_id`);

--
-- Índices para tabela `user_saber`
--
ALTER TABLE `user_saber`
  ADD PRIMARY KEY (`user_id`,`saber_id`),
  ADD KEY `saber_id` (`saber_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `city`
--
ALTER TABLE `city`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `saber`
--
ALTER TABLE `saber`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `state`
--
ALTER TABLE `state`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `city_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`);

--
-- Limitadores para a tabela `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`);

--
-- Limitadores para a tabela `user_saber`
--
ALTER TABLE `user_saber`
  ADD CONSTRAINT `user_saber_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_saber_ibfk_2` FOREIGN KEY (`saber_id`) REFERENCES `saber` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
