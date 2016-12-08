
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE IF NOT EXISTS `AnnouncementsEntry` (
  `uuid_` varchar(75) DEFAULT NULL,
  `entryId` bigint(20) NOT NULL,
  `companyId` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  `userName` varchar(75) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `modifiedDate` datetime DEFAULT NULL,
  `classNameId` bigint(20) DEFAULT NULL,
  `classPK` bigint(20) DEFAULT NULL,
  `title` varchar(75) DEFAULT NULL,
  `content` longtext,
  `url` longtext,
  `type_` varchar(75) DEFAULT NULL,
  `displayDate` datetime DEFAULT NULL,
  `expirationDate` datetime DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `alert` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `AnnouncementsEntry`
 ADD PRIMARY KEY (`entryId`), ADD KEY `IX_A6EF0B81` (`classNameId`,`classPK`), ADD KEY `IX_14F06A6B` (`classNameId`,`classPK`,`alert`), ADD KEY `IX_D49C2E66` (`userId`), ADD KEY `IX_1AFBDE08` (`uuid_`), ADD KEY `IX_F2949120` (`uuid_`,`companyId`);


ALTER TABLE `AnnouncementsEntry` DROP INDEX  `IX_A6EF0B81`;
ALTER TABLE `AnnouncementsEntry` DROP INDEX  `IX_14F06A6B`;
ALTER TABLE `AnnouncementsEntry` DROP INDEX  `IX_D49C2E66`;
ALTER TABLE `AnnouncementsEntry` DROP INDEX  `IX_1AFBDE08`;
ALTER TABLE `AnnouncementsEntry` DROP INDEX  `IX_F2949120`;
ALTER TABLE `AnnouncementsEntry` MODIFY `entryId` bigint(20) AUTO_INCREMENT;


ALTER TABLE `AnnouncementsEntry` DROP COLUMN `uuid_`;
ALTER TABLE `AnnouncementsEntry` DROP COLUMN `companyId`;
ALTER TABLE `AnnouncementsEntry` DROP COLUMN `userId`;
ALTER TABLE `AnnouncementsEntry` DROP COLUMN `modifiedDate`;
ALTER TABLE `AnnouncementsEntry` DROP COLUMN `classNameId`;
ALTER TABLE `AnnouncementsEntry` DROP COLUMN `classPK`;
ALTER TABLE `AnnouncementsEntry` DROP COLUMN `url`;
ALTER TABLE `AnnouncementsEntry` DROP COLUMN `type_`;
ALTER TABLE `AnnouncementsEntry` DROP COLUMN `displayDate`;
ALTER TABLE `AnnouncementsEntry` DROP COLUMN `expirationDate`;
ALTER TABLE `AnnouncementsEntry` DROP COLUMN `priority`;
ALTER TABLE `AnnouncementsEntry` DROP COLUMN `alert`;

/*
MariaDB [announcements_db]> describe `AnnouncementsEntry`;
+------------+-------------+------+-----+---------+----------------+
| Field      | Type        | Null | Key | Default | Extra          |
+------------+-------------+------+-----+---------+----------------+
| entryId    | bigint(20)  | NO   | PRI | NULL    | auto_increment |
| userName   | varchar(75) | YES  |     | NULL    |                |
| createDate | datetime    | YES  |     | NULL    |                |
| title      | varchar(75) | YES  |     | NULL    |                |
| content    | longtext    | YES  |     | NULL    |                |
+------------+-------------+------+-----+---------+----------------+
   
*/

CREATE TABLE IF NOT EXISTS `AnnouncementsComments` (
  `id` bigint(20) NOT NULL,
  `entryId` bigint(20) NOT NULL,
  `userName` varchar(75) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `content` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
