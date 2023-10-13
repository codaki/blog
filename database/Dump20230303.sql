-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `coment`
--

DROP TABLE IF EXISTS `coment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `coment` varchar(450) NOT NULL,
  `date` date NOT NULL,
  `idU` int NOT NULL,
  `pid` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idU_idx` (`idU`),
  KEY `pid_idp` (`pid`),
  CONSTRAINT `idU` FOREIGN KEY (`idU`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pid` FOREIGN KEY (`pid`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coment`
--

LOCK TABLES `coment` WRITE;
/*!40000 ALTER TABLE `coment` DISABLE KEYS */;
INSERT INTO `coment` VALUES (1,'La Mona Lisa es uno de los cuadros más famosos de la historia del arte. Fue pintado por Leonardo da Vinci en el siglo XVI y es conocido por su enigmática sonrisa.','2023-02-26',4,1),(3,'Esta ley es una de las leyes fundamentales de la física y se aplica a todos los sistemas, desde partículas subatómicas hasta galaxias enteras.','2023-02-26',4,7),(5,'La integral se utiliza en muchos campos, incluyendo la física, donde se utiliza para calcular la energía potencial y cinética.','2023-02-26',4,9),(8,'<p>sdasd</p>','2023-02-27',4,1),(9,'<p>La monalisa fue creado por Leonardo Da Vinci</p>','2023-02-27',4,1),(10,'<p>No es verdad</p>','2023-02-27',7,1),(19,'<p>hola</p>','2023-02-27',4,9),(22,'<p>Es tan famosa porque la pintora, creo un nuevo estilo propio tomando los aspectos de su vida mezclándolos con los elementos de la naturaleza y la identidad mexicana.</p><p><br></p>','2023-03-03',9,13),(23,'<p>El modelo de Avogadro es una teoría científica que establece que volúmenes iguales de gases, bajo las mismas condiciones de temperatura y presión, contienen el mismo número de moléculas. Este concepto es esencial para comprender el comportamiento de los gases y su relación con las leyes de los gases.</p><p><br></p>','2023-03-03',9,15),(24,'<p>El modelo de Avogadro también permite relacionar la masa de una sustancia con la cantidad de partículas que contiene. En concreto, una mole de una sustancia contiene el mismo número de partículas que hay en 12 gramos de carbono-12. Esta relación entre masa y número de partículas es fundamental en la química, ya que permite hacer cálculos estequiométricos precisos y determinar la composición de las sustancias.</p><p><br></p>','2023-03-03',4,15),(25,'<p>Existen varios tipos, los cuales corresponden al tema de movimiento parabólico, estos son: el movimiento de la Parábola completa, la Media Parábola, la Parábola ascendente-la Parábola descendente y la última pero no menos importante, la Porción de parábola.</p><p><br></p>','2023-03-03',4,17),(26,'<p>Porque en un mundo de hombres, Frida no solo destaco sino que abrió un camino a todas esas mujeres seguras de sí mismas y de su talento.</p><p>Título del Post: Van Gogh Inmersivo</p><p><br></p>','2023-03-03',7,13),(27,'<p>Las bases de datos NoSQL, o No sólo SQL, son un tipo de base de datos que difieren de las bases de datos relacionales tradicionales en su enfoque en la escalabilidad y la flexibilidad. En lugar de utilizar tablas y relaciones, las bases de datos NoSQL almacenan datos en estructuras como documentos, grafos o claves-valor.</p><p><br></p>','2023-03-03',7,19),(28,'<p>React es una de las bibliotecas de JavaScript más populares para el desarrollo de aplicaciones web modernas. Una de las ventajas de React es su enfoque en la creación de componentes reutilizables, que permiten a los desarrolladores construir aplicaciones escalables y mantener un código limpio y organizado.</p>','2023-03-03',9,20),(29,'<p>El momento de una fuerza con respecto a un punto da a conocer en qué medida existe capacidad de una fuerza o sistema de fuerzas para cambiar el estado de la rotación del cuerpo alrededor de un eje que pase por dicho punto.</p><p><br></p>','2023-03-03',9,18),(30,'<p>El momento tiende a provocar una aceleración angular (cambio en la velocidad de giro) en el cuerpo sobre el cual se aplica y es una magnitud característica en elementos que trabajan sometidos a torsión (como los ejes de maquinaria) o a flexión (como las vigas).</p>','2023-03-03',4,18),(31,'<p>El elemento más reactivo de la tabla periódica es el francio, con número atómico 87. Esto se debe a que el francio tiene la configuración electrónica más cercana a la de un gas noble, con un solo electrón en su capa externa. Además, el francio es un metal alcalino, lo que significa que tiene una tendencia natural a perder ese electrón externo en reacciones químicas.</p><p><br></p>','2023-03-03',4,16),(32,'<p>-Si, ya se fue hace rato</p><p><br></p>','2023-03-03',4,14),(33,'<p>-No, se abrió nuevas fechas hasta el 23 de abril, ¡te recomiendo que vayas!</p>','2023-03-03',7,14),(34,'<p>Dado que el francio es un elemento extremadamente raro y altamente radiactivo, su reactividad no ha sido ampliamente estudiada. De hecho, nunca se ha observado una muestra visible de francio en estado sólido, ya que se descompone rápidamente en otros elementos. Por lo tanto, la afirmación de que el francio es el elemento más reactivo.</p>','2023-03-03',7,16),(35,'<p>Fuí me pareció bueno</p>','2023-03-03',4,13),(36,'<p>Soy una evolución, porque voy creciendo como persona</p>','2023-03-03',4,21),(37,'<p>Me precipité no soy una evolución , soy una creacion porque soy catolico</p>','2023-03-03',4,21);
/*!40000 ALTER TABLE `coment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `desc` varchar(1000) NOT NULL,
  `img` varchar(255) NOT NULL,
  `date` datetime DEFAULT NULL,
  `uid` int NOT NULL,
  `cat` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'La Mona Lisa','<p>¿Quién pintó el cuadro de La Mona Lisa?</p>','16774714663711677452778523Mona_lisa.jpg','2023-02-26 22:49:19',7,'arte'),(7,'Conservación energía','<p>¿Qué es la ley de conservación de la energía?</p>','1677470673303fisica.png','2023-02-25 22:38:22',3,'fisica'),(9,'Integrales','<p>¿Qué es la integral de una función?</p>','1677470707714calculo.png','2023-02-26 18:54:33',2,'calculo'),(13,'Pinturas de Frida Kahlo ','<p>¿Por qué Frida Kahlo es tan famosa, si sus pinturas no son estéticas?</p><p><br></p>','1677821690796XZ2EZGBXQFBEPPCDFKWGUMNZCE.jpg','2023-03-03 00:34:50',9,'arte'),(14,'Van Gogh Inmersivo','<p>¿La exhibición de van Gogh Inmersivo ya se fue de Quito?</p><p><br></p>','1677821734242VanGogh_2020_LaurenceLabat-6531_HR.jpg','2023-03-03 00:35:34',9,'arte'),(15,'Avogadro','<p>¿Qué es el modelo Avogadro?</p>','1677821891936250px-Loratadine-3d-vdW.png','2023-03-03 00:36:21',9,'quimica'),(16,'Elementos Reactivos','<p>¿Cuál es el elemento más reactivo de la tabla periódica?</p><p><br></p>','1677821847259158920.jpg','2023-03-03 00:37:27',4,'quimica'),(17,'Movimiento parabólico','<p>¿Cuáles son los tipos de movimiento parabólico?</p>','1677821995719movimiento.jpg','2023-03-03 00:39:19',4,'fisica'),(18,'Momento de fuerza','<p>¿Cómo se interpreta el momento de fuerza?</p><p><br></p>','1677822069935tor.jpg','2023-03-03 00:41:09',7,'fisica'),(19,'Introducción a las bases de datos NoSQL','<p>¿Qué son las bases de datos NoSQL y en qué se diferencian de las bases de datos relacionales tradicionales?</p><p><br></p>','1677822136182com.jpg','2023-03-03 00:42:16',7,'computacion'),(20,'Cómo crear componentes reutilizables en React','<p>¿Cómo podemos crear componentes reutilizables en React y por qué son importantes en el desarrollo de aplicaciones web?</p><p><br></p>','1677822200606rea.jpg','2023-03-03 00:43:20',9,'computacion'),(21,'Ser o no ser','<p>Somos una evolución o creación? </p>','16778488145283mio4.jpg','2023-03-03 08:06:54',10,'fisica');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'aaescobar2','aaescobar2@espe.edu.ec','$2a$10$ugtD/ToixTVkXrjFIsthi.fq.soHH34qwSXCZx/BBqQVlpusqKA4G',NULL),(3,'test2','test2@gmail.com','$2a$10$cEA7pOU3C.PjQA.am2grEeTi921CX1AHeKq9cHwsgG6bb.Oyex6Je',NULL),(4,'ayme','aymealejandra1@gmail.com','$2a$10$BTd9PtuM/GZGptiV7zuDweEhV4P6APnyH.jba9mkyt4qk1DtAkDqi',NULL),(6,'camila','alejandra-ayme@hotmail.com','$2a$10$gZ3AYatBs2Gp/7lc5YvjI.kTIGkUnBsqDtUElxiPufUuj/cHUYeKe',NULL),(7,'daportilla1','daportilla1@espe.edu.ec','$2a$10$9YetGGZh2tE/WOl5x7KgtOkY/OS/bk0s.aMPHukKVo/X.DNuh5.XW',NULL),(8,'marcelo','hola@espe.edu.ec','$2a$10$bOWskqaGu09mTtRzZC09Be6T8akpR6XIvNmLzwdFL9Ig4ZUEX2jUi',NULL),(9,'Chris','cdiza5@espe.edu.ec','$2a$10$cfAhW2PKGlyrWu.eJb4L/.JyKfBzuh1CpycvyBtKEwTCXlEzmPNnW',NULL),(10,'camilita','c@espe.edu.ec','$2a$10$89cHUG7GQU9E3Ea830p4jeU83NwlQrB3vRn4PAtd.sMC3HhPx/Avu',NULL);
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

-- Dump completed on 2023-03-03  8:15:15
