-- MariaDB dump 10.18  Distrib 10.4.17-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: szakdolgozat
-- ------------------------------------------------------
-- Server version	10.4.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercises` (
  `ID` int(11) NOT NULL,
  `theme` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `class` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `link` text COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises` VALUES (1,'logo1.png',1,'Összedás','/additiongame'),(2,'logo2.png',2,'Osztás','/multiplicationgame'),(3,'logo3.png',3,'Törtek','/fractiongame');
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materials` (
  `name` varchar(100) COLLATE utf8mb4_hungarian_ci NOT NULL,
  `class` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES ('Osztás',2,'A szorzás és az osztás ellentétes műveletek.\r\nAz osztás eredményét hányadosnak nevezzük.\r\nTovábbi tagjai az osztandó: a szam, amit elosztunk, és az osztó a szám, amivel osztunk.\r\npl. 9:3=3\r\n'),('Szorzás',2,'A többszörös összeadást szorzássá egyszerűsíthetjük.\r\nPéldául:\r\n2+2+2+2+2=5*2\r\nHa sok tagot kell összeadni, akkor sokkal egyszerűbb szorzásként felírni műveletet\r\nPéldául:\r\n5+5+5+5+5+5+5+5+5+5+5+5=12*5=60\r\nA szorzás eredményét, tagjait (a műveletet alkotó számokat) szorzó tényezőknek hívjuk.\r\n'),('Törtek',3,'A hagyományos törtek három részből állnak: számláló (a vonal feletti szam), törtvonal es nevező (a vonal alatti szam). \r\nA nevező megmutatja, hogy az egészet hány egyenlő részre osztottuk.\r\nA számláló megmutatja, hogy az egyenlő részekből mennyit veszünk.\r\nTörtvonal az osztást jelenti\r\nA tört érteké nagyobb, mint 1, ha a számlálója nagyobb, mint a nevezője.\r\nA tört érteké egyenlő, 1-gyel, ha a számlálója egyenlő a nevezőjével.\r\nA tört érteké kisebb, mint 1, ha a számlálója kisebb a nevezőjénél.\r\n');
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passwords`
--

DROP TABLE IF EXISTS `passwords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `passwords` (
  `user_id` int(11) NOT NULL,
  `passwd` varchar(255) COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passwords`
--

LOCK TABLES `passwords` WRITE;
/*!40000 ALTER TABLE `passwords` DISABLE KEYS */;
INSERT INTO `passwords` VALUES (67,'$2b$04$YTE3q2DfVdZOrGxC2sGo4eOtFWQKKYa2JVeeUuZF.Bcr3ngrWZc2O'),(68,'$2b$04$X78ABho/IE9EYpJWTmaIH.nMVpMP0Q9MPuopLzqhDj3ce2.KMjeZ6'),(69,'$2b$04$8N/7d4IfNJEvei.9YdsbuuYBy1XMoN/0F2nfYOR.t7bSEOw8b/CM6');
/*!40000 ALTER TABLE `passwords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `results` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL,
  `point` varchar(20) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `excercise_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES (32,'2022-02-19 14:50:31','9/18',3,69),(33,'2022-02-19 14:51:44','14/16',2,69),(34,'2022-02-19 14:54:51','20/20',1,69),(35,'2022-03-09 09:59:32','0/0',2,68),(36,'2022-03-09 10:02:41','1/7',1,67),(37,'2022-03-09 10:13:14','14/14',1,67),(38,'2022-03-09 10:44:22','27/27',3,69),(39,'2022-03-09 10:47:01','7/7',3,69),(40,'2022-03-13 17:30:46','1/1',1,67),(41,'2022-03-13 17:32:25','0/0',1,67),(42,'2022-03-13 17:33:27','0/0',1,67),(43,'2022-03-13 17:33:53','0/0',1,67),(44,'2022-03-13 17:36:50','8/8',1,67),(45,'2022-03-17 19:09:35','6/7',3,67),(46,'2022-03-17 19:11:11','9/9',1,67),(47,'2022-03-17 19:49:01','0/0',1,69),(48,'2022-03-17 19:50:16','0/0',1,69),(49,'2022-03-20 20:46:02','10/14',2,69),(50,'2022-03-20 20:48:07','12/14',2,69),(51,'2022-03-23 11:16:16','1/1',2,69),(52,'2022-03-23 11:17:26','1/1',2,69),(53,'2022-03-23 11:18:20','2/2',3,69),(54,'2022-03-31 10:21:10','4/4',1,67),(55,'2022-03-31 10:21:52','0/0',1,69),(56,'2022-03-31 10:22:19','3/3',2,69),(57,'2022-03-31 10:23:13','-2/2',2,69),(58,'2022-03-31 10:46:19','13/25',2,69),(59,'2022-04-01 09:49:42','0/0',1,69),(60,'2022-04-01 09:50:15','2/6',2,69),(61,'2022-04-01 09:52:50','0/0',3,69),(62,'2022-04-01 09:56:34','0/1',3,69);
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8mb4_hungarian_ci DEFAULT NULL,
  `class` int(11) NOT NULL,
  `username` varchar(40) COLLATE utf8mb4_hungarian_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (67,'elsosJanos@gmail.com',1,'elsos_janos'),(68,'masodikosReka@gmail.com',2,'masodikos_reka'),(69,'negyedikesBela@email.hu',4,'negyedik_bela');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-19 10:42:29
