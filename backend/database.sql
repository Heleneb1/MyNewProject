-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: alexandre_dumas_db
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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `publication_date` varchar(45) DEFAULT NULL,
  `genre` varchar(45) DEFAULT NULL,
  `pages` varchar(45) DEFAULT NULL,
  `images_id` int DEFAULT NULL,
  `description` mediumtext,
  PRIMARY KEY (`id`),
  KEY `fk_books_images1_idx` (`images_id`)
) ENGINE=InnoDB AUTO_INCREMENT=746 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Les Trois Mousquetaires','1844','Roman historique','704',1,'Les Trois Mousquetaires (1844) : Ce roman d\'aventure suit les aventures du jeune d\'Artagnan, qui rejoint les célèbres mousquetaires Athos, Porthos et Aramis dans leur quête de justice et de vengeance dans la France du XVIIe siècle. L\'histoire est remplie d\'intrigues, de trahisons et de combats à l\'épée, ainsi que de nombreux personnages historiques.'),(2,'Le Comte de Monte-Cristo','1844-1846','Roman d\'aventure','1200',2,'Le Comte de Monte-Cristo (1844-1846) : Cette histoire suit le personnage d\'Edmond Dantès, qui est emprisonné à tort pendant 14 ans. Après avoir été libéré, il découvre un trésor caché et utilise sa richesse et son intelligence pour se venger de ceux qui l\'ont injustement emprisonné.'),(4,'La Reine Margot','1845','Roman historique','600',3,'La Reine Margot (1845) : Ce roman historique se déroule lors du massacre de la Saint-Barthélemy en France en 1572. Il suit le mariage de la reine Marguerite de Valois avec le protestant Henri de Navarre, qui conduit à une série d\'intrigues politiques et de complots.'),(5,'Vingt ans après','1845','Roman historique','820',4,'Vingt Ans Après (1845) : Suite des Trois Mousquetaires, ce livre suit les aventures des mousquetaires et de d\'Artagnan vingt ans après les événements du premier livre. L\'histoire se déroule pendant la Fronde, une série de révoltes en France au XVIIe siècle.'),(6,'Le Vicomte de Bragelonne','1847-1850','Roman historique','2536',5,'Le Vicomte de Bragelonne (1847-1850) : Ce livre est la suite de Vingt Ans Après et suit les mousquetaires dans une série de nouvelles aventures, y compris leur implication dans l\'histoire de l\'emprisonnement du roi Louis XIV en 1661.'),(7,'La Tulipe noire','1850','Roman historique','300',6,'La Tulipe noire (1850) : Cette histoire suit les aventures de deux amis, Cornelius van Baerle et Isaac Boxtel, qui se battent pour posséder une tulipe noire rare et convoitée pendant la période de la tulipomanie aux Pays-Bas.'),(8,'Le Chevalier de Maison-Rouge','1845','Roman historique','360',7,'Le Chevalier de Maison-Rouge (1846) : Ce roman historique se déroule pendant la Révolution française et suit les aventures d\'un chevalier royaliste nommé Maurice Lindey, qui se bat pour protéger Marie-Antoinette et la famille royale.'),(9,'Les Quarante-Cinq','1847','Roman historique','380',8,'Les Quarante-Cinq\" est un roman historique publié en 1847. L\'histoire se déroule en Écosse en 1745, pendant la seconde rébellion jacobite. Les jacobites, partisans du retour de la dynastie des Stuart sur le trône d\'Angleterre, sont en lutte contre les troupes du roi George II.'),(10,'Joseph Balsamo','1846','Roman historique','800',9,'Joseph Balsamo, un aventurier italien qui utilise ses pouvoirs occultes pour influencer les cours royales d\'Europe.'),(11,'Le Collier de la reine','1849','Roman historique','400',10,'Ce roman historique suit les événements entourant le scandale du collier de la reine, un épisode controversé de l\\\'histoire de France impliquant une affaire de vol et de fausses accusations.'),(12,'Ange Pitou','1853','Roman historique','580',11,'Ce roman historique se déroule pendant la Révolution française et suit le personnage d\'Ange Pitou, un jeune homme de la campagne qui se retrouve impliqué dans les événements tumultueux de l\'époque.'),(16,'Les Mohicans de Paris','1854-1859','Roman d\'aventure',NULL,15,'Salvator, de son vrai nom Conrad de Valgeneuse, est un prince déguisé en homme du peuple1. Salvator, qui a été privé de son titre et de son héritage par des parents malhonnêtes, s’est fait commissionnaire dans la Rue aux Fers, et fréquente le petit peuple de Paris, dont Barthélémy Lelong, dit Jean Taureau, équivalent du Chourineur de Sue1. Fleur-de-Marie s’appelle ici Fragola, et la Chouette, la Brocante'),(734,'Les Trois Mousquetaires','1844','Roman historique','740',772,'Les Trois Mousquetaires (1844) : Ce roman d\'aventure suit les aventures du jeune d\'Artagnan, qui rejoint les célèbres mousquetaires Athos, Porthos et Aramis dans leur quête de justice et de vengeance dans la France du XVIIe siècle. L\'histoire est remplie d\'intrigues, de trahisons et de combats à l\'épée, ainsi que de nombreux personnages historiques.'),(735,'Robin des Bois, le proscrit','1863','Roman d\'aventure','312',773,'Ce roman historique suit les aventures de Robin des Bois et de ses compagnons dans leur lutte contre les injustices de l\'époque.'),(736,'Les Compagnons de Jéhu','1857','Roman historique','460',774,'Ce roman historique se déroule pendant la Révolution française et suit les aventures d\'un groupe de royalistes, les Compagnons de Jéhu, qui se battent pour protéger la monarchie française en danger.'),(738,'Le Vicomte de Bragelonne','1847-1850','Roman historique','2536',776,'Au mois de mai 1660, le vicomte de Bragelonne arrive au château de Blois, porteur d’une lettre annonçant à Monsieur, le frère de Louis XIII, l’arrivée de Louis XIV et de la cour. La nuit suivante, un homme se présente au monarque : c’est le roi d’Angleterre Charles II, dépouillé de son royaume, qui vient demander au roi de France de l’argent ou des hommes afin de reconquérir sa couronne. Mazarin refuse. Sur le chemin du retour, Charles II rend visite à Athos qui lui propose son aide... Publié de 1847 à 1850, Le Vicomte de Bragelonne achève la trilogie ouverte par Les Trois Mousquetaires et poursuivie avec Vingt ans après.'),(741,'helene','25/07/2023','Autre','555',779,'La Reine Margot (1845) : Ce roman historique se déroule lors du massacre de la Saint-Barthélemy en France en 1572. Il suit le mariage de la reine Marguerite de Valois avec le protestant Henri de Navarre, qui conduit à une série d\'intrigues politiques et de complots.');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books_has_characters`
--

DROP TABLE IF EXISTS `books_has_characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books_has_characters` (
  `books_id` int NOT NULL,
  `characters_id` int NOT NULL,
  PRIMARY KEY (`books_id`,`characters_id`),
  KEY `fk_books_has_characters_characters1_idx` (`characters_id`),
  KEY `fk_books_has_characters_books1_idx` (`books_id`),
  CONSTRAINT `fk_books_has_characters_books1` FOREIGN KEY (`books_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books_has_characters`
--

LOCK TABLES `books_has_characters` WRITE;
/*!40000 ALTER TABLE `books_has_characters` DISABLE KEYS */;
INSERT INTO `books_has_characters` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(5,7),(5,8),(5,9),(5,10),(5,11),(2,12),(2,13),(2,14),(16,15),(16,16),(4,17),(4,18),(4,19);
/*!40000 ALTER TABLE `books_has_characters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books_has_quotes`
--

DROP TABLE IF EXISTS `books_has_quotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books_has_quotes` (
  `books_id` int NOT NULL,
  `quotes_id` int NOT NULL,
  PRIMARY KEY (`books_id`,`quotes_id`),
  KEY `fk_books_has_quotes_quotes1_idx` (`quotes_id`),
  KEY `fk_books_has_quotes_books1_idx` (`books_id`),
  CONSTRAINT `fk_books_has_quotes_books1` FOREIGN KEY (`books_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books_has_quotes`
--

LOCK TABLES `books_has_quotes` WRITE;
/*!40000 ALTER TABLE `books_has_quotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `books_has_quotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (2,11),(19,NULL),(87,15),(88,15),(89,15),(90,15),(91,15),(92,15),(93,15),(94,15),(95,15),(96,15),(97,15),(98,15),(99,15),(100,15),(109,18),(110,20),(111,21),(112,22),(113,23),(114,24),(115,25),(116,26),(117,27),(118,28);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_has_books`
--

DROP TABLE IF EXISTS `cart_has_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_has_books` (
  `cart_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `id_cart_has_books` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_cart_has_books`)
) ENGINE=InnoDB AUTO_INCREMENT=343 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_has_books`
--

LOCK TABLES `cart_has_books` WRITE;
/*!40000 ALTER TABLE `cart_has_books` DISABLE KEYS */;
INSERT INTO `cart_has_books` VALUES (NULL,11,266),(1,736,267),(1,12,268),(1,7,269),(1,10,270),(1,1,271),(1,741,272),(NULL,16,273),(1,8,274),(1,6,275),(1,5,276),(1,4,277),(NULL,1,278),(NULL,11,279),(NULL,734,280),(NULL,1,281),(NULL,1,282),(NULL,2,283),(NULL,734,284),(NULL,738,285),(NULL,1,286),(NULL,11,287),(NULL,9,288),(111,6,289),(111,1,290),(NULL,738,291),(NULL,734,292),(NULL,734,293),(113,1,294),(NULL,9,295),(113,11,296),(113,16,297),(NULL,NULL,298),(NULL,NULL,299),(NULL,NULL,300),(113,16,301),(NULL,11,302),(NULL,2,303),(NULL,9,304),(110,4,305),(110,738,306),(NULL,1,307),(110,6,308),(110,7,309),(110,736,310),(110,11,311),(110,7,312),(110,2,313),(NULL,16,314),(NULL,736,315),(113,4,316),(113,11,317),(113,738,318),(NULL,738,319),(NULL,738,320),(NULL,NULL,321),(NULL,NULL,322),(100,1,323),(100,1,324),(NULL,738,325),(113,8,326),(NULL,16,327),(NULL,8,328),(NULL,4,329),(114,7,330),(1,735,331),(NULL,11,332),(1,11,333),(NULL,2,334),(116,9,335),(116,4,336),(NULL,2,337),(117,9,338),(NULL,2,339),(118,10,340),(118,7,341),(118,16,342);
/*!40000 ALTER TABLE `cart_has_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_characters` varchar(150) DEFAULT NULL,
  `associated_book` varchar(150) DEFAULT NULL,
  `description` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (1,'Le cardinal de Richelieu','Les Trois Mousquetaires','Dumas a contribué à développer la légende noire d\'un autocrate machiavélique et retors.'),(2,'Louis XIII ','Les Trois Mousquetaires','Dumas n\'arrive pas à s\'attacher à ce personnage dont les qualités (sobriété, piété, chasteté) n\'étaient pas pour séduire cet amateur de bonne chère et de femmes.'),(3,'Le duc de Buckingham','Les Trois Mousquetaires',' Alexandre Dumas le suppose amant de la reine de France Anne d\'Autriche, et lui donne la carrure d\'un personnage romantique, souffrant d\'un amour impossible.'),(4,'La reine Anne d\'Autriche','Les Trois Mousquetaires','Dumas a gardé du personnage historique la victime d\'un mariage politique, en butte aux tracasseries du cardinal. Il s\'agit de cette période de la vie de la reine où, n\'ayant pas réussi à donner d\'héritier à Louis XIII, elle traverse une période difficile dans son mariage'),(5,'M. de Tréville','Les Trois Mousquetaires',' capitaine des mousquetaires du roi'),(6,'D\'Artagnan','Les Trois Mousquetaires','Charles de Batz de Castelmore d\'Artagnan avait dans l\'Histoire 13 ans en 1625Néanmoins son oncle maternel, Jean de Montesquiou d\'Artagnan, enseigne aux Gardes Françaises et apprécié du roi, avait été tué lors du siège de la Rochelle en 1628.Charles de Batz ayant emprunté à la famille de sa mère le nom d\'Artagnan pour servir chez les Mousquetaires'),(7,'D\'Artagnan','Vingt Ans après','D’Artagnan a vu ses amis quitter la compagnie des mousquetaires après la campagne de La Rochelle, et n’est pas monté en grade depuis. Il a vieilli, et est désabusé par sa condition ainsi que par Mazarin qu’il n’apprécie pas'),(8,'D\'Artagnan','Vingt Ans après','Les 40 moyens d’évasion du Duc de Beaufort'),(9,'D\'Artagnan','Vingt Ans après','Le fils de Milady et la fuite du roi à Saint-Germain'),(10,'Athos et Aramis ','Vingt Ans après','on retrouve Athos et Aramis dans la tente du roi Charles Ier avec Lord de Winter, le beau-frère de Milady, à côté de Newcastle, où le roi accompagné des Écossais s’apprête à affronter l’armée de Cromwell'),(11,'Athos, Porthos et Aramis','Vingt Ans après','La fin de la Fronde Athos, Porthos et Aramis se retirent donc avec Mazarin dans le château de Porthos à Pierrefonds, où ils le font accepter des conditions obtenues par d’Artagnan, sous menace de révéler le secret d’un ressort faisant mouvoir une caisse dans l’orangerie de Rueil, où se trouve un trésor, alors que Mazarin s’apprête à annoncer à la reine l’épuisement des finances. Après s\'être assuré que ses compères ne changeront pas d\'avis en son absence, d\'Artagnan part faire valider ces conditions auprès de la reine'),(12,' Edmond Dantès','Le Comte de Monte-Cristo','Le roman raconte comment, au début du règne de Louis XVIII, le 24 février 1815, alors que Napoléon se prépare à quitter l\'île d\'Elbe, Edmond Dantès, jeune marin de dix-neuf ans, second du navire Le Pharaon, débarque à Marseille pour s\'y fiancer le lendemain avec la belle Catalane Mercédès. Trahi par des « amis » jaloux, il est dénoncé comme conspirateur bonapartiste et enfermé dans une geôle du château d\'If, au large de Marseille. Après quatorze années, d\'abord réduit à la solitude et au désespoir puis régénéré et instruit en secret par un compagnon de captivité, l\'abbé Faria, il réussit à s\'évader et prend possession d\'un trésor caché dans l\'île de Montecristo dont l\'abbé, avant de mourir, lui avait signalé l\'existence.'),(13,'L\'abbé Faria','Le Comte de Monte-Cristo','prisonnier au château d\'If depuis de nombreuses années lorsque Dantès y arrive. Il transmet à Edmond une large part de son immense savoir, l\'éveille au raisonnement logique et à la science, et lui révèle l\'emplacement d\'un immense trésor caché depuis très longtemps sur l\'île de Monte-Cristo. Sa mort permettra l\'évasion audacieuse d\'Edmond.'),(14,'Albert de Morcerf','Le Comte de Monte-Cristo','fils de Mercédès et de Fernand. Il devient l\'ami de Monte-Cristo à la suite d\'une aventure certainement instrumentée par le comte à Rome'),(15,'Salvator','Les Mohicans de Paris','Salvator, de son vrai nom Conrad de Valgeneuse, est un prince déguisé en homme du peuple1. Salvator, qui a été privé de son titre et de son héritage par des parents malhonnêtes, s’est fait commissionnaire dans la Rue aux Fers, et fréquente le petit peuple de Paris, dont Barthélémy Lelong, dit Jean Taureau, équivalent du Chourineur de Sue1. Fleur-de-Marie s’appelle ici Fragola, et la Chouette, la Brocante1.'),(16,'Monsieur Jackal','Les Mohicans de Paris','Salvator compte parmi ses adversaires Monsieur Jackal, chef de la police de la Sûreté. Né vers 1787, « il a pour charge de prévenir les complots anti-bourboniens, ou de les provoquer pour mieux les réprimer » grâce à ses recrues composées d\'anciens bagnards. Inspiré par Vidocq, le personnage annonce l\'inspecteur Javert des Misérables'),(17,'Marguerite de Valois','La Reine Margot','L\'action du roman se déroule entre le mariage de Marguerite de Valois avec Henri de Navarre, futur Henri IV, en 1572 et la mort de Charles IX de France en 1574.'),(18,' Henri de Navarre','La Reine Margot','Henri IV, dit « le Grand » ou « Le Vert Galant », né sous le nom d\'Henri de Bourbon le 13 décembre 1553 à Pau et mort assassiné le 14 mai 1610 à Paris, est roi de Navarre à partir du 9 juin 1572 sous le nom d\'Henri III'),(19,'le comte Joseph Boniface','La Reine Margot','Cependant, l\'horrible massacre est aussi pour Margot l\'occasion de rencontrer le comte Joseph Boniface de la Môle, seigneur protestant venu à Paris pour proposer ses services à Henri de Navarre. Ils ont une liaison, mais la santé du roi Charles IX se dégrade, et on pense à un complot (la conjuration des Malcontents). Puisqu\'il faut des coupables, l\'amant de Marguerite est arrêté, torturé et exécuté');
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `characters_id` int DEFAULT NULL,
  `books_id` int DEFAULT NULL,
  `name_img` text,
  `url_img` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=786 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,1,1,'les Trois Mousquetaires','https://kbimages1-a.akamaihd.net/9c0489fe-6628-4ed9-a42a-627c3c9c9b38/353/569/90/False/les-trois-mousquetaires-26.jpg'),(2,12,2,'Le Comte de Montécristo','https://pictures.abebooks.com/isbn/9782737357039-fr.jpg'),(3,17,4,'La Reine Margot','https://www.livredepoche.com/sites/default/files/images/livres/couv/9782253099994-001-T.jpeg'),(4,7,5,'Vingt ans après','https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1477934281l/596829.jpg'),(5,NULL,6,'Le Vicomte de Bragelone','https://m.media-amazon.com/images/I/51ZUdTg+8sL.jpg'),(6,NULL,7,'La tulipe noire','https://static.fnac-static.com/multimedia/Images/FR/NR/bc/99/e9/15309244/1540-1/tsp20230324220140/La-Tulipe-Noire-Alexandre-Dumas.jpg'),(7,NULL,8,'Le chevalier de maison rouge','https://kbimages1-a.akamaihd.net/3198a04b-ccc7-41ec-b284-feff30bda065/353/569/90/False/le-chevalier-de-maison-rouge-59.jpg'),(8,NULL,9,'Les quarante-cinq','https://www.babelio.com/couv/CVT_Les-Quarante-cinq_8785.jpg'),(9,NULL,10,'Joseph Balsamo','https://fr.shopping.rakuten.com/photo/joseph-balsamo-tome-1-dumas-alexandre-335124203_ML.jpg'),(10,NULL,11,'Le collier de la reine','https://fr.shopping.rakuten.com/photo/le-collier-de-la-reine-alexandre-dumas-1087235624_ML.jpg'),(11,NULL,12,'Ange Pitou, les mémoires d\'un mèdecin','https://products-images.di-static.com/image/sodis-ange-pitou-tome-i-les-memoires-d-un-medecin/9791041929160-475x500-1.jpg'),(12,15,16,'Les Mohicans de Paris','https://media.senscritique.com/media/000000024771/300/Les_Mohicans_de_Paris.jpg'),(656,NULL,599,'LesTroisMousquetaires.jpg','http://localhost:5000/uploads/LesTroisMousquetaires.jpg'),(771,NULL,NULL,'LesTroisMousquetaires.jpg','http://localhost:5000/uploads/LesTroisMousquetaires.jpg'),(772,NULL,734,'LesTroisMousquetaires.jpg','http://localhost:5000/uploads/LesTroisMousquetaires.jpg'),(773,NULL,735,'Robin-des-bois-le-proscrit.jpg','http://localhost:5000/uploads/Robin-des-bois-le-proscrit.jpg'),(774,NULL,736,'Les-compagnons-de-Jehu.jpg','http://localhost:5000/uploads/Les-compagnons-de-Jehu.jpg'),(775,NULL,737,'La Dame de Monsoreau.jpg','http://localhost:5000/uploads/La Dame de Monsoreau.jpg'),(776,NULL,738,'le Vicomte de Bragelonne 1.jpg','http://localhost:5000/uploads/le Vicomte de Bragelonne 1.jpg'),(777,NULL,739,'le Vicomte de Bragelonne 1.jpg','http://localhost:5000/uploads/le Vicomte de Bragelonne 1.jpg'),(778,NULL,740,'le Vicomte de Bragelonne 1.jpg','http://localhost:5000/uploads/le Vicomte de Bragelonne 1.jpg'),(779,NULL,741,'helene-blanche-logo.png','http://localhost:5000/uploads/helene-blanche-logo.png'),(784,NULL,744,'ocean.jpg','http://localhost:5000/uploads/ocean.jpg'),(785,NULL,745,'.filter.map.png','http://localhost:5000/uploads/.filter.map.png');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotes`
--

DROP TABLE IF EXISTS `quotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `associated_books` varchar(150) DEFAULT NULL,
  `text` mediumtext,
  `associated_character` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotes`
--

LOCK TABLES `quotes` WRITE;
/*!40000 ALTER TABLE `quotes` DISABLE KEYS */;
INSERT INTO `quotes` VALUES (1,'Les Compagnons de Jéhu (1856)','La jeunesse, c\'est le printemps avec ses fraîches aurores et ses beaux soirs.',NULL),(2,'les Trois mousquetaires','“Un secret consiste à ne le répéter qu’à une seule personne à la fois.”',NULL),(3,'les Trois mousquetaires','Tous pour un, un pour tous !',NULL),(4,'les Trois mousquetaires','Vous ne voulez pas que je tue mon corps, et vous vous faites l\'agent de celui qui veut tuer mon âme !',NULL),(5,'les Trois mousquetaires','On dit la vérité gratis, on ment pour de l\'argent.',NULL),(6,'les Trois mousquetaires','En général, on ne demande de conseils, disait-il, que pour ne pas les suivre ; ou, si on les a suivis, que pour avoir quelqu\'un à qui l\'on puisse faire le reproche de les avoir donnés.',NULL),(7,'les Trois mousquetaires','Il y aura en tout temps et dans tous les pays, surtout si ces pays sont divisés de religion, des fanatiques qui ne demanderont pas mieux que de se faire martyrs.',NULL),(8,'les Trois mousquetaires','La vie est un chapelet de petites misères que le philosophe égrène en riant.',NULL),(9,'la Reine Margot','L\'amitié, voyez-vous, c\'est une étoile, tandis que l\'amour... l\'amour... eh bien, je la tiens, la comparaison... l\'amour n\'est qu\'une bougie.',NULL),(10,'Le Comte de Monte-Cristo','Il faut avoir voulu mourir, Maximilien, pour savoir combien il est bon de vivre.',NULL),(11,'Le Comte de Monte-Cristo','il n’y a ni bonheur ni malheur en ce monde, il y a la comparaison d’un état à un autre, voilà tout. Celui-là seul qui a éprouvé l’extrême infortune est apte à ressentir l’extrême félicité.',NULL),(12,'Le Comte de Monte-Cristo','Et il se mit à rire de son côté, mais comme rient les Anglais, c\'est à dire du bout des dents.',NULL),(13,'Le Comte de Monte-Cristo','Il faut le malheur pour creuser certaines mines mystérieuses cachées dans l\'intelligence humaine.',NULL),(14,'Le Comte de Monte-Cristo','En politique, mon cher, vous le savez comme moi, il n\'y a pas d\'hommes, mais des idées pas de sentiments, mais des intérêts en politique, on ne tue pas un homme : on supprime un obstacle, voilà tout.',NULL),(15,'Réponse d\'Alexandre Dumas','Au fait, cher Maître, vous devez bien vous y connaître en nègres ? Mais très certainement. Mon père était un mulâtre, mon grand-père était un nègre et mon arrière-grand-père était un singe. Vous voyez, Monsieur,  ma famille commence où la vôtre finit','Alexandre Dumas');
/*!40000 ALTER TABLE `quotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `role` tinyint DEFAULT '0',
  `cart_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'Admin','helene.blanche@outlook.fr','$argon2id$v=19$m=65536,t=5,p=1$h7FFrE7kf7FlEQIfxwNMuw$5V9WRO6CfBN5RlnlbZasTOr593B69qvYi4jY2Y5XvNU',1,NULL),(8,'Hélène','helene.blanche@hotmail.fr','$argon2id$v=19$m=65536,t=5,p=1$NQBfpi0Zacknl9m4bI6fDg$DHiDHMEXH9TiZeeIX039HNF+8JAl4xeb9gCTw1GaqtI',0,1),(14,'Hélène','helene@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$sWemFM2F2sJvwHab6oXN5w$ddWB7giAiEDBvZK3UGSNHqNw8JVeZ24AQsTuvqfkVvI',0,NULL),(15,'Yannick','yannick@gmail.fr','$argon2id$v=19$m=65536,t=5,p=1$e9laf+t5hGGBnRnCZU4cZA$1bikLv/TBQQKJhTNqK876qkHgfjgR7ZLYDwhyptnv7s',0,NULL),(18,'Mitaine','mitaine@monmail.com','$argon2id$v=19$m=65536,t=5,p=1$JYADEu3j3MyeV80B0vd5kg$Yh+xiWQHlEaCB/lGRIOzwRgtZ/NJOrKX655P8V3l90Q',0,NULL),(19,'Abibi','abibi@mail.com','$argon2id$v=19$m=65536,t=5,p=1$P+7ui6GVv6185eMuEm5Gpw$KrL9FNY39/I8xZbv0JOUT5JlnrpokH1OGdK4hhY6p4A',0,NULL),(20,'New','new@mail.fr','$argon2id$v=19$m=65536,t=5,p=1$ky0FGj0ZWZjmlN9mOCvI6w$6Wy3mscthzOCisQNBvqoXlXhRou0iDYuPT5PPqZBlBg',0,110),(21,'Next','next@mail.fr','$argon2id$v=19$m=65536,t=5,p=1$BvkdpQYesLkpwugJ8/B8Tw$VGbIVJDXg2U9itLY4FHIJZvSQKHmaEaF59GelIHrgQY',0,111),(23,'test','test@gmail.fr','$argon2id$v=19$m=65536,t=5,p=1$BdL2Hyk4GhRjiCu2MnGLCg$pN/fsJeQLX2Lm9txMAb4S6gZerP4CWrmVz2BTvz6RL8',0,113),(24,'coco','coco@mail.fr','$argon2id$v=19$m=65536,t=5,p=1$xI8zZfPGYQk1hq7Ybg4opA$Qj6rs/ZyQGJDjYH1ehpqLKT4+PxlPGivPmUD+7MNV/8',0,114),(25,'gogo','go@mail.fr','$argon2id$v=19$m=65536,t=5,p=1$EGfiC5t3FRxqDAOzpQV0fQ$HcQT9UAkO+HqQ6ukvktM5Dtf10RrDdjxci+6HFF+HGg',0,115),(26,'Binènène','binenene@mail.fr','$argon2id$v=19$m=65536,t=5,p=1$pGW0Q6RcdiqAH993j0kpbA$7gxPcWp1Rwq1w3rxQjhG+7Ub28CkB4u2JzFktj+Cjj4',0,116),(27,'Lapinou','lapinou@mail.fr','$argon2id$v=19$m=65536,t=5,p=1$wI2EjjyhDAj6CRxRkxx0Rw$qewdQOfMP9aAM/TbwTEgXJ7Gnv76TXinlQ/I4+aXlQY',0,117),(28,'Test2','Test2@gmail.fr','$argon2id$v=19$m=65536,t=5,p=1$okcU64HuFf4po+H4CqDRLg$rBgmCbMEuyoL8gFmNWObIgOJ/N/wrsYYR9Ak+P23+2E',0,118);
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

-- Dump completed on 2023-05-11 14:34:54
