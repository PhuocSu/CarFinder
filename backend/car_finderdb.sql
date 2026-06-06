-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: kgm_db
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `id` int NOT NULL AUTO_INCREMENT,
  `carImage` json NOT NULL,
  `vehicleBadge` json DEFAULT NULL,
  `firstRegDate` datetime NOT NULL,
  `exteriorColor` varchar(255) NOT NULL,
  `seatingCapacity` int NOT NULL,
  `manufacturerYear` int NOT NULL,
  `mileage` int unsigned NOT NULL DEFAULT '0' COMMENT 'Mileage in kilometers',
  `interiorColor` varchar(255) NOT NULL,
  `carRegNo` varchar(20) NOT NULL COMMENT 'Car registration number',
  `basePrice` int NOT NULL,
  `discountPercent` float NOT NULL,
  `isAvailable` tinyint NOT NULL DEFAULT '0' COMMENT 'Whether the car is currently available for sale',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `sub_model_id` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `brandName` varchar(255) NOT NULL,
  `engineDisplacement` varchar(255) NOT NULL,
  `fuelType` varchar(255) NOT NULL,
  `transmissionType` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_f6d885558d49225c88904a0d4e` (`carRegNo`),
  KEY `FK_c62a43f90cf921a4357915ebea3` (`sub_model_id`),
  CONSTRAINT `FK_c62a43f90cf921a4357915ebea3` FOREIGN KEY (`sub_model_id`) REFERENCES `sub_model` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (1,'[]','[\"SHORT_DISTANCE\", \"CAMPER\"]','2023-01-16 00:00:00','BLACK',5,2023,15000,'GREEN_SERIES','13가7890',15000000,0,1,'2026-01-13 21:45:33.850053','2026-05-26 19:14:38.650587',3,'Nice car!','1.5 GDI-T 2WD 블랙 엣지','','GASOLINE',''),(2,'[]','[\"BEIGE_SEATS\", \"SINGLE_OWNER\"]','2024-02-16 00:00:00','BLACK',4,2024,15000,'BEIGE_SERIES','14가1234',16000000,6,1,'2026-01-13 21:48:13.508763','2026-05-26 19:14:38.657111',4,'Brutal Engine','1.5 가솔린 2WD V3','','GASOLINE',''),(3,'[]','[\"SHORT_DISTANCE\", \"SELLER_RECOMMENDED\"]','2024-02-16 00:00:00','BLUE',6,2022,20000,'BEIGE_SERIES','15가2345',17000000,8,1,'2026-01-13 21:48:56.803376','2026-05-26 19:14:38.660702',11,'Smart automoblies','2.2 4WD 럭셔리','','DIESEL',''),(16,'[]','[\"SINGLE_OWNER\", \"NO_INSURANCE_HISTORY\", \"NON_SMOKER\"]','2023-12-11 00:00:00','GREEN',5,2024,54363,'GRAY_SERIES','39어7680',12300000,0,1,'2026-01-18 16:24:43.549673','2026-05-26 19:14:38.664391',6,'','EV E7','4.8km/kWh','HYBRID',''),(17,'[]','[\"SINGLE_OWNER\", \"NO_INSURANCE_HISTORY\", \"NON_SMOKER\"]','2023-06-14 00:00:00','녹색',5,2024,54363,'회색 계열','132두8741',16300000,0,1,'2026-02-02 21:46:28.505030','2026-05-26 19:14:38.667901',11,'','2.2 4WD 노블레스','4.8km/kWh','전기','자동변속기'),(19,'[]','[\"SINGLE_OWNER\", \"NO_INSURANCE_HISTORY\", \"NON_SMOKER\"]','2023-06-14 00:00:00','녹색',5,2024,54363,'회색 계열','263어2276',16300000,0,1,'2026-02-02 21:48:05.609153','2026-05-26 19:14:38.672202',11,'','2.2 2WD 럭셔리','4.8km/kWh','전기','자동변속기'),(20,'[]','[\"SINGLE_OWNER\", \"NO_INSURANCE_HISTORY\", \"NON_SMOKER\"]','2023-06-14 00:00:00','녹색',5,2024,54363,'회색 계열','309거8859',16300000,0,1,'2026-02-02 21:48:39.397373','2026-05-26 19:14:38.675446',11,'','2.2 2WD 프레스티지','4.8km/kWh','전기','자동변속기'),(21,'[]','[\"SINGLE_OWNER\", \"NO_INSURANCE_HISTORY\", \"NON_SMOKER\"]','2023-06-14 00:00:00','녹색',5,2024,54363,'회색 계열','134두9669',16300000,0,1,'2026-02-02 21:49:38.520251','2026-05-26 19:14:38.678570',11,'','2.2 4WD 럭셔리','4.8km/kWh','전기','자동변속기'),(22,'[]','[\"SINGLE_OWNER\", \"NO_INSURANCE_HISTORY\", \"NON_SMOKER\"]','2023-06-14 00:00:00','녹색',5,2024,54363,'회색 계열','183모3297',16300000,0,1,'2026-02-02 21:50:18.918343','2026-05-26 19:14:38.682629',11,'','2.2 4WD 더 블랙','4.8km/kWh','전기','자동변속기'),(23,'[]','[\"SINGLE_OWNER\", \"NO_INSURANCE_HISTORY\", \"NON_SMOKER\"]','2023-06-14 00:00:00','녹색',5,2024,54363,'회색 계열','319부9101',16300000,0,1,'2026-02-02 21:51:03.052109','2026-05-26 19:14:38.686242',11,'','2.2 4WD 프레스티지','4.8km/kWh','전기','자동변속기'),(24,'[]','[\"SINGLE_OWNER\", \"NO_INSURANCE_HISTORY\", \"NON_SMOKER\"]','2023-06-14 00:00:00','녹색',5,2024,54363,'회색 계열','230루4250',16300000,0,1,'2026-02-02 21:52:33.540987','2026-05-26 19:14:38.689476',6,'','1.5 가솔린 2WD V3','4.8km/kWh','전기','자동변속기'),(25,'[]','[\"SINGLE_OWNER\", \"NO_INSURANCE_HISTORY\", \"NON_SMOKER\"]','2023-06-14 00:00:00','녹색',5,2024,54363,'회색 계열','129더7481',16300000,0,1,'2026-02-02 21:53:27.578268','2026-05-26 19:14:38.693196',6,'','1.6 가솔린 2WD V3','4.8km/kWh','전기','자동변속기'),(26,'[]','[\"SINGLE_OWNER\", \"NO_INSURANCE_HISTORY\", \"NON_SMOKER\"]','2023-06-14 00:00:00','녹색',5,2024,54363,'회색 계열','62거4905',16300000,0,1,'2026-02-02 21:57:22.435524','2026-05-26 19:14:38.696065',6,'','1.6 가솔린 TX','4.8km/kWh','전기','자동변속기'),(27,'[]','[\"BEIGE_SEATS\", \"SINGLE_OWNER\"]','2023-06-14 00:00:00','녹색',5,2023,54363,'회색 계열','108구9459',12000000,10,1,'2026-02-02 22:00:39.205679','2026-05-26 19:14:38.701652',12,'','1.6 가솔린 TX','11.2km/L (4등급)','전기','자동변속기');
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compare_car`
--

DROP TABLE IF EXISTS `compare_car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compare_car` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` int DEFAULT NULL,
  `car_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9cdf2874591a90896aaf37e8e72` (`car_id`),
  KEY `FK_41101979ac26b9d0bd171f95ea4` (`user_id`),
  CONSTRAINT `FK_41101979ac26b9d0bd171f95ea4` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_9cdf2874591a90896aaf37e8e72` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compare_car`
--

LOCK TABLES `compare_car` WRITE;
/*!40000 ALTER TABLE `compare_car` DISABLE KEYS */;
INSERT INTO `compare_car` VALUES (30,'2026-01-25 22:42:46.046515','2026-01-25 22:42:46.046515',2,3),(50,'2026-05-19 16:01:24.015176','2026-05-19 16:01:24.015176',1,1);
/*!40000 ALTER TABLE `compare_car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_number_counter`
--

DROP TABLE IF EXISTS `contract_number_counter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_number_counter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date_key` varchar(255) NOT NULL,
  `last_sequence` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ecc58cf561a77004d1f4e176db` (`date_key`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_number_counter`
--

LOCK TABLES `contract_number_counter` WRITE;
/*!40000 ALTER TABLE `contract_number_counter` DISABLE KEYS */;
INSERT INTO `contract_number_counter` VALUES (1,'260522',2),(2,'260523',12),(3,'260524',45),(4,'260525',4),(5,'260526',14),(6,'260527',3);
/*!40000 ALTER TABLE `contract_number_counter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contract_status_history`
--

DROP TABLE IF EXISTS `contract_status_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract_status_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `previous_status` enum('DRAFTED','ACTIVE','COMPLETED','CANCELLED') DEFAULT NULL,
  `new_status` enum('DRAFTED','ACTIVE','COMPLETED','CANCELLED') NOT NULL,
  `changed_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `note` varchar(255) DEFAULT NULL,
  `contract_id` int NOT NULL,
  `changed_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f8bcc63d886fbff6a1f3e38c559` (`contract_id`),
  KEY `FK_b09791af6af5ccfa57602b29151` (`changed_by`),
  CONSTRAINT `FK_b09791af6af5ccfa57602b29151` FOREIGN KEY (`changed_by`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_f8bcc63d886fbff6a1f3e38c559` FOREIGN KEY (`contract_id`) REFERENCES `purchase_contract` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract_status_history`
--

LOCK TABLES `contract_status_history` WRITE;
/*!40000 ALTER TABLE `contract_status_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract_status_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subTitle` varchar(255) NOT NULL,
  `fileAttachment` varchar(255) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `content` varchar(255) NOT NULL,
  `isTemporarySave` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fileAttachmentName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (2,'SooTestEvent2','SooTestSubtitle2','SooTestUploadFile2.png','2026-02-02 21:00:00','2026-02-02 23:00:00','SooTestContent2',0,'2026-02-01 14:18:42.089947','2026-02-01 14:18:42.089947',''),(3,'SooTestEvent3','SooTestSubtitle3','SooTestUploadFile3.png','2026-02-02 21:00:00','2026-02-02 23:00:00','SooTestContent3',0,'2026-02-01 14:18:59.572985','2026-02-01 14:18:59.572985',''),(4,'SooTestEvent4','SooTestSubtitle4','SooTestUploadFile4.png','2026-02-02 21:00:00','2026-02-02 23:00:00','SooTestContent4',1,'2026-02-01 14:19:13.541769','2026-02-01 14:19:13.541769',''),(6,'SooTestEvent6','SooTestSubtitle6','SooTestUploadFile6.png','2026-02-02 21:00:00','2026-02-02 23:00:00','SooTestContent6',0,'2026-02-01 14:20:36.486092','2026-02-01 14:20:36.486092',''),(7,'SooTestEvent7','SooTestSubtitle7','SooTestUploadFile7.png','2026-02-02 21:00:00','2026-02-02 23:00:00','SooTestContent7',0,'2026-02-01 14:20:52.688416','2026-02-01 14:20:52.688416',''),(9,'SooTestEvent9','SooTestSubtitle9','SooTestUploadFile9.png','2026-02-02 21:00:00','2026-02-02 23:00:00','SooTestContent9',0,'2026-02-01 14:21:16.503057','2026-02-01 14:21:16.503057',''),(10,'SooTestEvent10 <Again>','SooTestSubtitle10','https://res.cloudinary.com/dnfhzvn2k/image/upload/v1769961447/notice/mhbfmaavkcj9kgvp1ybo.jpg','2026-02-02 21:00:00','2026-02-04 00:00:00','<p>SooTestEvent10 &lt;Again&gt;</p>',0,'2026-02-01 14:21:37.869928','2026-02-01 23:05:46.000000','meow.jpg'),(11,'SooTestEvent11','SooTestSubtitle11','SooTestUploadFile11.png','2026-02-02 21:00:00','2026-02-02 23:00:00','SooTestContent11',1,'2026-02-01 14:21:48.821076','2026-02-01 14:21:48.821076',''),(12,'SooTestCreateItem','SooTestCreateItem','https://res.cloudinary.com/dnfhzvn2k/image/upload/v1769955980/notice/j8qy9mmpp34om6mtd47o.jpg','2026-02-03 00:00:00','2026-02-06 00:00:00','<p>SooTestCreateItem</p>',0,'2026-02-01 21:27:19.991645','2026-02-01 21:27:19.991645','meow.jpg');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` enum('전체','차량 및 계약 절차 관련','계약 조건 관련','결제/비용 관련','인수관련','기타') NOT NULL DEFAULT '전체',
  `fileAttachment` varchar(255) DEFAULT NULL,
  `content` varchar(500) NOT NULL,
  `isTemporarySave` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fileAttachmentName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
INSERT INTO `faq` VALUES (1,'SooTestUpdate','차량 및 계약 절차 관련','SooTestUploadFile.png','SooTestContent',0,'2026-01-29 22:21:02.692454','2026-01-29 22:24:40.000000',NULL),(3,'SooTestEvent4','계약 조건 관련','SooTestUploadFile3.png','<p>SooTestContent4</p>',0,'2026-01-29 22:22:05.823305','2026-01-31 00:49:48.000000',NULL),(4,'SooTestEvent4','결제/비용 관련','SooTestUploadFile4.png','SooTestContent4',0,'2026-01-29 22:22:30.857585','2026-01-29 22:22:30.857585',NULL),(5,'SooTestEvent5','결제/비용 관련','SooTestUploadFile4.png','SooTestContent5',1,'2026-01-30 00:45:28.163716','2026-01-30 00:45:28.163716',NULL),(6,'DemoConfirmButton1','차량 및 계약 절차 관련','','<p>DemoConfirmButton1</p>',0,'2026-01-30 23:07:39.988140','2026-01-31 00:42:53.000000',NULL),(7,'DemoTemporarySave','계약 조건 관련','','<p>DemoTemporarySave</p>',1,'2026-01-30 23:18:50.422852','2026-01-30 23:18:50.422852',NULL),(8,'SooTestUploadPicture','차량 및 계약 절차 관련','https://res.cloudinary.com/dnfhzvn2k/image/upload/v1769798076/notice/r6vrmau0cyia0xga8tz3.jpg','<p>SooTestUploadPicture</p>',0,'2026-01-31 01:34:46.528084','2026-01-31 01:34:46.528084','meow.jpg');
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite_car`
--

DROP TABLE IF EXISTS `favorite_car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite_car` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` int NOT NULL,
  `car_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_566ea717cb71243d90647683528` (`user_id`),
  KEY `FK_35fd9434de580296e9ab4364ea0` (`car_id`),
  CONSTRAINT `FK_35fd9434de580296e9ab4364ea0` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_566ea717cb71243d90647683528` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_car`
--

LOCK TABLES `favorite_car` WRITE;
/*!40000 ALTER TABLE `favorite_car` DISABLE KEYS */;
INSERT INTO `favorite_car` VALUES (124,'2026-02-05 23:49:33.545610','2026-02-05 23:49:33.545610',2,1),(126,'2026-02-08 16:37:36.454754','2026-02-08 16:37:36.454754',1,2),(129,'2026-02-08 16:38:18.639300','2026-02-08 16:38:18.639300',1,3);
/*!40000 ALTER TABLE `favorite_car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model` (
  `id` int NOT NULL AUTO_INCREMENT,
  `modelName` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model`
--

LOCK TABLES `model` WRITE;
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
INSERT INTO `model` VALUES (3,'토레스','2025-12-22 23:49:52.917767','2025-12-22 23:49:52.917767'),(4,'티볼리','2025-12-22 23:51:49.639602','2025-12-22 23:51:49.639602'),(5,'렉스턴','2025-12-22 23:54:25.353335','2025-12-22 23:54:25.353335'),(6,'토레스','2026-02-03 21:33:36.156496','2026-02-03 21:33:36.156496'),(7,'코란도','2026-02-03 21:34:05.401579','2026-02-03 21:34:05.401579');
/*!40000 ALTER TABLE `model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `fileAttachment` varchar(255) DEFAULT NULL,
  `content` varchar(500) NOT NULL,
  `isTemporarySave` tinyint NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `fileAttachmentName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (1,'Thông báo bảo trì hệ thống','https://example.com/files/maintenance-guide.pdf','Hệ thống CarFinder sẽ được bảo trì từ 22:00 ngày 26/01/2026 đến 02:00 ngày 27/01/2026. Trong thời gian này, một số chức năng có thể không khả dụng. Xin lỗi vì sự bất tiện này.',0,'2026-01-27 18:44:51.181605','2026-01-27 18:44:51.181605',NULL),(2,'Demo2','https://example.com/files/maintenance-guide.pdf','ContentDemo2',0,'2026-01-27 18:45:14.340077','2026-01-27 18:45:14.340077',NULL),(3,'Demo3','https://example.com/files/maintenance-guide.pdf','ContentDemo3',0,'2026-01-27 18:45:20.047446','2026-01-27 18:45:20.047446',NULL),(4,'Demo4','https://example.com/files/maintenance-guide.pdf','ContentDemo4',0,'2026-01-27 18:45:24.610880','2026-01-27 18:45:24.610880',NULL),(5,'Demo5','https://example.com/files/maintenance-guide.pdf','ContentDemo5',0,'2026-01-27 18:45:35.749684','2026-01-27 18:45:35.749684',NULL),(6,'Demo6','https://example.com/files/maintenance-guide.pdf','ContentDemo6',0,'2026-01-27 18:45:41.806248','2026-01-27 18:45:41.806248',NULL),(7,'Demo7','https://example.com/files/maintenance-guide.pdf','ContentDemo7',0,'2026-01-27 18:45:47.682279','2026-01-27 18:45:47.682279',NULL),(8,'Demo8','https://example.com/files/maintenance-guide.pdf','ContentDemo8',0,'2026-01-27 18:45:53.839204','2026-01-27 18:45:53.839204',NULL),(9,'Demo9','https://example.com/files/maintenance-guide.pdf','ContentDemo9',0,'2026-01-27 18:45:59.652640','2026-01-27 18:45:59.652640',NULL),(13,'DemoWritePage','','<p>DemoWritePage</p>',0,'2026-01-27 22:51:11.891250','2026-01-27 22:51:11.891250',NULL),(18,'DemoUploadFile','https://res.cloudinary.com/dnfhzvn2k/image/upload/v1769625189/notice/h4zogkhmgggqrpadskrn.jpg','<p>DemoUploadFile</p>',1,'2026-01-29 00:45:31.785808','2026-01-30 01:20:04.000000','meow.jpg'),(21,'Welcome to Vietnam','https://res.cloudinary.com/dnfhzvn2k/image/upload/v1769796145/notice/vvvd5nckowioaeleljuh.jpg','<p>Welcome to Vietnam</p>',0,'2026-01-31 01:02:35.354189','2026-01-31 01:02:58.000000','hoà bình.jpg');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) NOT NULL,
  `payment_method` enum('CASH','BANK_TRANSFER','CREDIT_CARD','MOMO') NOT NULL,
  `status_payment` enum('PENDING','SUCCESS','FAILED') NOT NULL DEFAULT 'PENDING',
  `contract_id` int NOT NULL,
  `transaction_ref` varchar(100) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `payment_type` enum('DEPOSIT','FINAL') NOT NULL DEFAULT 'DEPOSIT',
  `order_id` varchar(100) DEFAULT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4a85b9df866c49165311420908e` (`contract_id`),
  CONSTRAINT `FK_4a85b9df866c49165311420908e` FOREIGN KEY (`contract_id`) REFERENCES `purchase_contract` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (63,500000.00,'MOMO','SUCCESS',74,'4752562290','2026-05-26 23:27:30.822302','DEPOSIT','63-1779812850825-alxzkf','2026-05-26 16:28:08'),(64,15800000.00,'MOMO','SUCCESS',74,'4752571632','2026-05-26 23:28:22.584610','FINAL','64-1779812902591-seniek','2026-05-26 16:28:43'),(65,500000.00,'MOMO','FAILED',75,'1779812993120','2026-05-26 23:29:47.281793','DEPOSIT','65-1779812987284-plqwl5','2026-05-26 16:29:53'),(66,500000.00,'MOMO','FAILED',76,'1779813039187','2026-05-26 23:30:35.082755','DEPOSIT','66-1779813035086-nq3c0m','2026-05-26 16:30:39'),(67,500000.00,'MOMO','SUCCESS',77,'4752581403','2026-05-26 23:34:05.618089','DEPOSIT','67-1779813245623-vys5q9','2026-05-26 16:34:22'),(68,500000.00,'MOMO','FAILED',78,'1779819705966','2026-05-27 01:21:25.430391','DEPOSIT','68-1779819685438-3ssp6l','2026-05-26 18:21:46'),(69,500000.00,'MOMO','FAILED',79,'1779823929869','2026-05-27 02:32:03.802907','DEPOSIT','69-1779823923807-9qqvxz','2026-05-26 19:32:10'),(70,500000.00,'MOMO','FAILED',80,'1779824493816','2026-05-27 02:41:29.510108','DEPOSIT','70-1779824489516-wv8oif','2026-05-26 19:41:34');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_contract`
--

DROP TABLE IF EXISTS `purchase_contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_contract` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contract_number` varchar(255) NOT NULL,
  `price_at_purchase` decimal(12,2) NOT NULL,
  `buyer_email` varchar(100) NOT NULL,
  `buyer_phone` varchar(20) NOT NULL,
  `desired_delivery_date` date DEFAULT NULL,
  `signature_digital` text,
  `notes` text,
  `status_contract` enum('DRAFTED','ACTIVE','COMPLETED','CANCELLED') NOT NULL DEFAULT 'DRAFTED',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `car_id` int NOT NULL,
  `buyer_id` int NOT NULL,
  `saleperson_id` int DEFAULT NULL,
  `buyer_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_1c008461bfe756c600e2d6e26a` (`contract_number`),
  KEY `FK_cfb719c2160c11c843be328a16c` (`car_id`),
  KEY `FK_2cd8df8c60bd922939532b3c50c` (`buyer_id`),
  KEY `FK_9e1f41a6c860dbc853c954a3814` (`saleperson_id`),
  CONSTRAINT `FK_2cd8df8c60bd922939532b3c50c` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_9e1f41a6c860dbc853c954a3814` FOREIGN KEY (`saleperson_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_cfb719c2160c11c843be328a16c` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_contract`
--

LOCK TABLES `purchase_contract` WRITE;
/*!40000 ALTER TABLE `purchase_contract` DISABLE KEYS */;
INSERT INTO `purchase_contract` VALUES (74,'KGM-2605260011',16300000.00,'SooTest@gmail.com','0943401637','2026-05-26',NULL,NULL,'COMPLETED','2026-05-26 23:27:30.793707',25,2,NULL,'Business Name'),(75,'KGM-2605260012',10800000.00,'SooTest123@gmail.com','0943401637','2026-05-26',NULL,NULL,'CANCELLED','2026-05-26 23:29:47.256700',27,2,NULL,'Business Name'),(76,'KGM-2605260013',16300000.00,'Soo@gmail.com','0943401637','2026-05-26',NULL,NULL,'CANCELLED','2026-05-26 23:30:35.051410',26,2,NULL,'Business Name'),(77,'KGM-2605260014',10800000.00,'Soo@gmail.com','0943401637','2026-05-26',NULL,NULL,'ACTIVE','2026-05-26 23:34:05.568586',27,2,NULL,'Business Name'),(78,'KGM-2605270001',16300000.00,'SooTest@gmail.com','0943401637','2026-05-27',NULL,NULL,'CANCELLED','2026-05-27 01:21:25.403100',21,2,NULL,'Business Name'),(79,'KGM-2605270002',16300000.00,'Soo@gmail.com','0943401637','2026-05-27',NULL,NULL,'CANCELLED','2026-05-27 02:32:03.773081',26,2,NULL,'Business Name'),(80,'KGM-2605270003',16300000.00,'Soo@gmail.com','0943401637','2026-05-27',NULL,NULL,'DRAFTED','2026-05-27 02:41:29.484148',24,2,NULL,'Business Name');
/*!40000 ALTER TABLE `purchase_contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recent_search_history`
--

DROP TABLE IF EXISTS `recent_search_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recent_search_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filters` json NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b50ebe1b1b5b1e2ec3968eb9708` (`userId`),
  CONSTRAINT `FK_b50ebe1b1b5b1e2ec3968eb9708` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recent_search_history`
--

LOCK TABLES `recent_search_history` WRITE;
/*!40000 ALTER TABLE `recent_search_history` DISABLE KEYS */;
INSERT INTO `recent_search_history` VALUES (4,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"exColors\": [], \"inColors\": [], \"modelIds\": [], \"pageSize\": 12, \"fuelTypes\": [], \"subModelIds\": []}','2026-02-08 23:10:27.683412',1),(5,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"exColors\": [], \"inColors\": [], \"modelIds\": [], \"pageSize\": 12, \"fuelTypes\": [], \"subModelIds\": []}','2026-02-08 23:10:42.899400',1),(6,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"exColors\": [], \"inColors\": [], \"modelIds\": [], \"pageSize\": 12, \"fuelTypes\": [], \"subModelIds\": []}','2026-02-08 23:10:49.708185',1),(83,'{\"page\": 1, \"order\": \"asc\", \"badges\": [\"COUPE_OPTION\", \"SHORT_DISTANCE\"], \"search\": \"\", \"yearMax\": 2003, \"yearMin\": 2001, \"exColors\": [\"WHITE\", \"BLACK\"], \"inColors\": [\"BLACK_SERIES\", \"BROWN_SERIES\"], \"modelIds\": [3], \"pageSize\": 12, \"priceMax\": 4000000, \"priceMin\": 2000000, \"fuelTypes\": [\"ALL\", \"GASOLINE\"], \"mileageMax\": 90000, \"mileageMin\": 50000, \"subModelIds\": [3, 4]}','2026-02-10 20:06:42.462340',2),(84,'{\"page\": 1, \"order\": \"asc\", \"badges\": [\"COUPE_OPTION\", \"SHORT_DISTANCE\"], \"search\": \"\", \"yearMax\": 2003, \"yearMin\": 2001, \"exColors\": [\"WHITE\", \"BLACK\"], \"inColors\": [\"BLACK_SERIES\", \"BROWN_SERIES\"], \"modelIds\": [3], \"pageSize\": 12, \"priceMax\": 4000000, \"priceMin\": 2000000, \"fuelTypes\": [\"ALL\", \"GASOLINE\"], \"mileageMax\": 90000, \"mileageMin\": 50000, \"subModelIds\": [3, 4]}','2026-02-10 20:34:36.823301',2),(85,'{\"page\": 1, \"order\": \"asc\", \"badges\": [\"COUPE_OPTION\", \"SHORT_DISTANCE\"], \"search\": \"\", \"yearMax\": 2003, \"yearMin\": 2001, \"exColors\": [\"WHITE\", \"BLACK\"], \"inColors\": [\"BLACK_SERIES\", \"BROWN_SERIES\"], \"modelIds\": [3], \"pageSize\": 12, \"priceMax\": 4000000, \"priceMin\": 2000000, \"fuelTypes\": [\"ALL\", \"GASOLINE\"], \"mileageMax\": 90000, \"mileageMin\": 50000, \"subModelIds\": [3, 4]}','2026-02-10 20:34:58.253845',2),(86,'{\"page\": 1, \"order\": \"asc\", \"badges\": [\"COUPE_OPTION\", \"SHORT_DISTANCE\"], \"search\": \"\", \"yearMax\": 2003, \"yearMin\": 2001, \"exColors\": [\"WHITE\", \"BLACK\"], \"inColors\": [\"BLACK_SERIES\", \"BROWN_SERIES\"], \"modelIds\": [3], \"pageSize\": 12, \"priceMax\": 4000000, \"priceMin\": 2000000, \"fuelTypes\": [\"ALL\", \"GASOLINE\"], \"mileageMax\": 90000, \"mileageMin\": 50000, \"subModelIds\": [3, 4]}','2026-02-10 20:37:11.222652',2),(87,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"yearMin\": 2001, \"modelIds\": [], \"pageSize\": 12, \"priceMax\": 5000000, \"priceMin\": 3000000, \"mileageMin\": 70000, \"subModelIds\": []}','2026-02-10 20:39:51.218862',2),(88,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"yearMin\": 2001, \"modelIds\": [], \"pageSize\": 12, \"priceMax\": 5000000, \"priceMin\": 3000000, \"mileageMin\": 70000, \"subModelIds\": []}','2026-02-10 20:39:56.139033',2),(89,'{\"page\": 1, \"order\": \"asc\", \"badges\": [\"COUPE_OPTION\", \"SHORT_DISTANCE\"], \"search\": \"\", \"yearMax\": 2003, \"yearMin\": 2001, \"exColors\": [\"WHITE\", \"BLACK\"], \"inColors\": [\"BLACK_SERIES\", \"BROWN_SERIES\"], \"modelIds\": [3], \"pageSize\": 12, \"priceMax\": 4000000, \"priceMin\": 2000000, \"fuelTypes\": [\"ALL\", \"GASOLINE\"], \"mileageMax\": 90000, \"mileageMin\": 50000, \"subModelIds\": [3, 4]}','2026-02-10 20:40:09.535322',2),(92,'{\"page\": 1, \"order\": \"asc\", \"badges\": [\"SINGLE_OWNER\", \"NO_INSURANCE_HISTORY\", \"TAX_BENEFIT\"], \"search\": \"\", \"modelIds\": [], \"pageSize\": 12, \"subModelIds\": []}','2026-03-27 22:27:55.867948',2),(100,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"inColors\": [\"YELLOW_SERIES\"], \"modelIds\": [], \"pageSize\": 12, \"subModelIds\": []}','2026-05-19 10:58:54.585346',1),(101,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"exColors\": [\"GREEN\"], \"modelIds\": [], \"pageSize\": 12, \"subModelIds\": []}','2026-05-19 10:59:04.265778',1),(102,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"exColors\": [\"SILVER_GRAY\"], \"modelIds\": [], \"pageSize\": 12, \"subModelIds\": []}','2026-05-19 10:59:11.853110',1),(103,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"exColors\": [\"BLACK\"], \"modelIds\": [], \"pageSize\": 12, \"subModelIds\": []}','2026-05-19 10:59:20.518593',1),(104,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"modelIds\": [], \"pageSize\": 12, \"fuelTypes\": [\"ALL\"], \"subModelIds\": []}','2026-05-19 10:59:31.549193',1),(105,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"modelIds\": [], \"pageSize\": 12, \"mileageMax\": 50000, \"mileageMin\": 20000, \"subModelIds\": []}','2026-05-19 10:59:42.336703',1),(106,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"modelIds\": [], \"pageSize\": 12, \"priceMax\": 12000000, \"priceMin\": 7000000, \"subModelIds\": []}','2026-05-19 10:59:49.495380',1),(107,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"yearMax\": 2008, \"yearMin\": 2004, \"modelIds\": [], \"pageSize\": 12, \"subModelIds\": []}','2026-05-19 10:59:53.579431',1),(108,'{\"page\": 1, \"order\": \"asc\", \"badges\": [\"BEIGE_SEATS\"], \"search\": \"\", \"modelIds\": [], \"pageSize\": 12, \"subModelIds\": []}','2026-05-19 16:01:35.589625',1),(109,'{\"page\": 1, \"order\": \"asc\", \"badges\": [], \"search\": \"\", \"exColors\": [\"YELLOW\"], \"modelIds\": [], \"pageSize\": 12, \"subModelIds\": []}','2026-05-26 21:30:24.226371',2);
/*!40000 ALTER TABLE `recent_search_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recently_viewed_car`
--

DROP TABLE IF EXISTS `recently_viewed_car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recently_viewed_car` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` int NOT NULL,
  `car_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8d83a26d6d664ad98d577ceaea6` (`user_id`),
  KEY `FK_d0c0c1991d67d4d36985d2de3ff` (`car_id`),
  CONSTRAINT `FK_8d83a26d6d664ad98d577ceaea6` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_d0c0c1991d67d4d36985d2de3ff` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recently_viewed_car`
--

LOCK TABLES `recently_viewed_car` WRITE;
/*!40000 ALTER TABLE `recently_viewed_car` DISABLE KEYS */;
INSERT INTO `recently_viewed_car` VALUES (45,'2026-05-27 01:02:03.426734','2026-05-27 01:53:16.834000',2,27),(46,'2026-05-27 01:02:07.663567','2026-05-27 01:52:31.955000',2,3),(47,'2026-05-27 01:21:02.402123','2026-05-27 01:21:02.402123',2,21),(48,'2026-05-27 01:50:21.476225','2026-05-27 01:55:50.698000',2,25),(49,'2026-05-27 02:31:42.225701','2026-05-27 02:31:42.225701',2,26),(50,'2026-05-27 02:41:09.555144','2026-05-27 02:41:09.555144',2,24);
/*!40000 ALTER TABLE `recently_viewed_car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(36) NOT NULL,
  `refreshToken` varchar(255) NOT NULL,
  `expireAt` timestamp NOT NULL,
  `userAgent` varchar(255) DEFAULT NULL,
  `ipAddress` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_085d540d9f418cfbdc7bd55bb19` (`user_id`),
  CONSTRAINT `FK_085d540d9f418cfbdc7bd55bb19` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('00e1d3c2-297a-493e-806d-92a96fd767ca','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYnVzaW5lc3MxMjMiLCJyb2xlIjoiQlVTSU5FU1MiLCJpYXQiOjE3Nzk2MzgyNDgsImV4cCI6MTc4MDI0MzA0OH0.gFKF_0qA-71NzQq_tPwVqjLVnzz53E54zjO1CHauDuA','2026-05-31 15:57:28','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0','::1','2026-05-24 22:57:28.073252','2026-05-24 22:57:28.073252',2),('365dda82-b372-4fa7-86cc-037d6c23ba71','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYnVzaW5lc3MxMjMiLCJyb2xlIjoiQlVTSU5FU1MiLCJpYXQiOjE3Nzk3MDU4NTIsImV4cCI6MTc4MDMxMDY1Mn0.47LGSnobHd5lV_kFWhh9vG683d19w7TZim3Cu_Pb2WE','2026-06-01 10:44:13','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0','::1','2026-05-25 17:44:12.752688','2026-05-25 17:44:12.752688',2),('61b2086b-615e-428a-be78-3188974e9f53','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoic29vZGV2QWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3Nzk2MTU2ODUsImV4cCI6MTc4MDIyMDQ4NX0.AhUVYPzwU-Ahhf8XXvpvfazSyOmQat-6_lPNwHnEnDE','2026-05-31 09:41:25','PostmanRuntime/7.54.0','::1','2026-05-24 16:41:25.261891','2026-05-24 16:41:25.261891',1),('87c84ffc-9551-4170-b56c-e721a2110f94','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYnVzaW5lc3MxMjMiLCJyb2xlIjoiQlVTSU5FU1MiLCJpYXQiOjE3Nzk1MjY1NDMsImV4cCI6MTc4MDEzMTM0M30.fja_qxFuvJfDpeyzHp7TN3ZEEEE-zlw4e_IijAig79w','2026-05-30 08:55:43','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0','::1','2026-05-23 15:55:43.150192','2026-05-23 15:55:43.150192',2),('94ab675d-8599-41c5-8e09-79833aded57d','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYnVzaW5lc3MxMjMiLCJyb2xlIjoiQlVTSU5FU1MiLCJpYXQiOjE3Nzk1MjY2MzYsImV4cCI6MTc4MDEzMTQzNn0.wETjvk6wLn2_tF24YRNepXt-YunkMvYw6KNOGhFSGuo','2026-05-30 08:57:16','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0','::1','2026-05-23 15:57:16.494683','2026-05-23 15:57:16.494683',2),('bfa85171-1dda-4c5d-aee2-5423c8629dc0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYnVzaW5lc3MxMjMiLCJyb2xlIjoiQlVTSU5FU1MiLCJpYXQiOjE3Nzk2NDc4NTIsImV4cCI6MTc4MDI1MjY1Mn0.IXjdigwhijHEQw1dEdvF5hPUSjJSYxcH0hZTqDgAE-E','2026-05-31 18:37:32','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0','::1','2026-05-25 01:37:32.466809','2026-05-25 01:37:32.466809',2),('c0ca57c7-7222-4249-b35f-a8ba001a1a90','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiYnVzaW5lc3MxMjMiLCJyb2xlIjoiQlVTSU5FU1MiLCJpYXQiOjE3Nzk1MjY2NDAsImV4cCI6MTc4MDEzMTQ0MH0.UrS2Ddc_Mb9K1NzGw75YT7puXddNKS0l6VaU23mNUIc','2026-05-30 08:57:20','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0','::1','2026-05-23 15:57:20.320461','2026-05-23 15:57:20.320461',2),('c31ade7d-95f9-4f8f-be88-b39f6ec9acc9','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoic29vZGV2QWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3Nzk4MTE2NDIsImV4cCI6MTc4MDQxNjQ0Mn0.U2jLHxiWOld_h91G16GdQS9eDvBQvgR7qz4glRABGho','2026-06-02 16:07:22','PostmanRuntime/7.54.0','::1','2026-05-26 23:07:22.080834','2026-05-26 23:07:22.080834',1),('dff44aff-769c-423b-8a51-f6b0e94ba359','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoic29vZGV2QWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3Nzk3NDAwMjcsImV4cCI6MTc4MDM0NDgyN30.34uVKIRNsTeAghoHwerjpJAvevCSyUuY4Esi16_LW-o','2026-06-01 20:13:47','PostmanRuntime/7.54.0','::1','2026-05-26 03:13:47.491470','2026-05-26 03:13:47.491470',1),('e4cd3d6f-590e-42ca-a7df-3a46a29e5131','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoic29vZGV2QWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3Nzk1MzQwNDcsImV4cCI6MTc4MDEzODg0N30.3KuBt-_oRyCgXqxPBGnDq3jC3qRN-K-k_WMll2zEgi4','2026-05-30 11:00:48','PostmanRuntime/7.54.0','::1','2026-05-23 18:00:47.849535','2026-05-23 18:00:47.849535',1);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_model`
--

DROP TABLE IF EXISTS `sub_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_model` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subModelName` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `model_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2fca85cbee663ffded312e35b82` (`model_id`),
  CONSTRAINT `FK_2fca85cbee663ffded312e35b82` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_model`
--

LOCK TABLES `sub_model` WRITE;
/*!40000 ALTER TABLE `sub_model` DISABLE KEYS */;
INSERT INTO `sub_model` VALUES (3,'토레스','2025-12-22 23:50:35.966456','2025-12-22 23:50:35.966456',3),(4,'더 뉴토레스','2025-12-22 23:51:06.220689','2025-12-22 23:51:06.220689',3),(5,'토레스 EVX','2025-12-22 23:51:18.816242','2025-12-22 23:51:18.816242',3),(6,'베리 뉴 티볼리','2025-12-22 23:52:14.940017','2025-12-22 23:52:14.940017',4),(7,'뉴 티볼리 에어','2025-12-22 23:52:29.978860','2025-12-22 23:52:29.978860',4),(8,'티볼리 아머','2025-12-22 23:52:44.815283','2025-12-22 23:52:44.815283',4),(9,'더 뉴티볼리','2025-12-22 23:52:52.895206','2025-12-22 23:52:52.895206',4),(10,'티볼리 에어','2025-12-22 23:53:04.629588','2025-12-22 23:53:04.629588',4),(11,'올 뉴렉스턴','2025-12-22 23:54:46.526287','2025-12-22 23:54:46.526287',5),(12,'더 뉴렉스턴 스포츠','2025-12-22 23:54:54.868333','2025-12-22 23:54:54.868333',5),(13,'더 뉴렉스턴 스포츠 칸','2025-12-22 23:55:07.933833','2025-12-22 23:55:07.933833',5),(14,'더 뉴렉스턴 스포츠 칸 쿨멘','2025-12-22 23:55:31.885058','2025-12-22 23:55:31.885058',5),(15,'G4 렉스턴','2025-12-22 23:55:43.269361','2025-12-22 23:55:43.269361',5),(16,'렉스턴 스포츠','2025-12-22 23:55:53.370543','2025-12-22 23:55:53.370543',5),(17,'더 뉴렉스턴 스포츠 쿨멘','2025-12-22 23:56:02.547189','2025-12-22 23:56:02.547189',5);
/*!40000 ALTER TABLE `sub_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `custName` varchar(255) NOT NULL,
  `custId` varchar(255) NOT NULL,
  `custPw` varchar(255) NOT NULL,
  `birthDate` datetime NOT NULL,
  `custAddr` varchar(255) NOT NULL,
  `role` enum('ADMIN','INDIVIDUAL','BUSINESS','AGENCY') NOT NULL DEFAULT 'INDIVIDUAL',
  `isActive` tinyint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `reprsntName` varchar(255) DEFAULT NULL,
  `corpRegNo` varchar(255) DEFAULT NULL,
  `bnsmRegNo` varchar(255) DEFAULT NULL,
  `bnsmRegCert` varchar(255) DEFAULT NULL,
  `corpEmail` varchar(255) DEFAULT NULL,
  `custRep` varchar(255) DEFAULT NULL,
  `repDepTit` varchar(255) DEFAULT NULL,
  `hpNo` varchar(255) DEFAULT NULL,
  `corpTellNo` varchar(255) DEFAULT NULL,
  `corpFaxNo` varchar(255) DEFAULT NULL,
  `custRepPhone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'soodeadmin','soodevAdmin','$2b$10$UuZO1s14gFfN4MSMjY8pJ.n7aU4bFncoXnJnbIOk.ViF5WbcBO8mi','2003-11-12 07:00:00','Saigon','ADMIN',1,'soodev.it@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'Business Name','business123','$2b$10$nH0ALzytZs13c6dBVSuRNONzUGuIk9Vb96U/TBip.dT3jX.EuizZO','1990-01-01 00:00:00','123 Business St, City','BUSINESS',1,NULL,'John Doe 123','1234567890','BN12345678','certificate123','contact@business.com','Jane Smith','Sales Manager',NULL,'1234567890','1234567891','901234253'),(4,'Nguyen Van A','individual123','$2b$10$sYuQ9zLo.YakZWereta5wOdFJrQ9mKyib9QziOW1oQCZo1l2hmgfW','1990-01-01 00:00:00','123 Duong ABC, Quan 1, TP.HCM','INDIVIDUAL',1,'nguyenvana@email.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0123456789',NULL,NULL,NULL),(9,'sooAgency','sooAgency','$2b$10$4cJbQFrRbXUuQNIGuU5LFOIgQw6ECeCPBoASr8ZKq9he.q8e4mROO','2026-02-24 00:00:00','174 Nguyen Van Cong Street, Ward 3','BUSINESS',1,NULL,'sooDev','Soo128u7897','12321898223','123SooTest','1234Soo@gmail.com','김경기','대표',NULL,'SooDev','1234Soo@gmail.com','1071871279'),(12,'Agency123','Agency123','$2b$10$Db..iAn3KdznDw0dK1RDWeXFs47UmnEkrNW1hI24rn0DuXTec6iqW','2026-02-25 00:00:00','174 Nguyen Van Cong Street, Ward 3','AGENCY',1,NULL,'sooDev','Soo128u7897w','12321898223d','123SooTest','1234Soo@gmail.com','김경기','대표',NULL,'SooDev','1234Soo@gmail.com','0943401637');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-03 23:28:13
