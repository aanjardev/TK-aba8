CREATE TABLE `SiteSettings` (
  `id` VARCHAR(191) NOT NULL DEFAULT 'main',
  `schoolName` VARCHAR(191) NOT NULL,
  `shortName` VARCHAR(191) NOT NULL,
  `tagline` TEXT NOT NULL,
  `logo` VARCHAR(191) NULL,
  `favicon` VARCHAR(191) NULL,
  `facebook` VARCHAR(191) NULL,
  `instagram` VARCHAR(191) NULL,
  `youtube` VARCHAR(191) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `SiteSettings` (`id`,`schoolName`,`shortName`,`tagline`,`createdAt`,`updatedAt`)
VALUES ('main','TK Aisyiyah Bustanul Athfal 8 Kepanjen','TK ABA 8 Kepanjen','Mendidik dengan kasih sayang.',NOW(3),NOW(3));
