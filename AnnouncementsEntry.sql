
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `AnnouncementsEntry`;

CREATE TABLE `AnnouncementsEntry` (
  `entryId` bigint(20) NOT NULL AUTO_INCREMENT,
  `userName` varchar(75) COLLATE utf8mb4_bin DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `title` varchar(75) COLLATE utf8mb4_bin DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_bin,
  PRIMARY KEY (`entryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


CREATE TABLE IF NOT EXISTS `AnnouncementsComments` (
  `id` bigint(20) NOT NULL,
  `entryId` bigint(20) NOT NULL,
  `userName` varchar(75) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `content` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE `AnnouncementsComments` ADD PRIMARY KEY (`id`);
ALTER TABLE `AnnouncementsComments` MODIFY `id` bigint(20) AUTO_INCREMENT;
ALTER TABLE `AnnouncementsComments` ADD INDEX `entryId` (`entryId`);

/*
describe `AnnouncementsComments`;
+------------+-------------+------+-----+---------+----------------+
| Field      | Type        | Null | Key | Default | Extra          |
+------------+-------------+------+-----+---------+----------------+
| id         | bigint(20)  | NO   | PRI | NULL    | auto_increment |
| entryId    | bigint(20)  | NO   | MUL | NULL    |                |
| userName   | varchar(75) | YES  |     | NULL    |                |
| createDate | datetime    | YES  |     | NULL    |                |
| content    | longtext    | YES  |     | NULL    |                |
+------------+-------------+------+-----+---------+----------------+
5 rows in set (0.00 sec)
*/
