CREATE TABLE `SchoolContact` (
  `id` VARCHAR(191) NOT NULL DEFAULT 'main', `sectionTitle` VARCHAR(191) NOT NULL,
  `sectionDescription` TEXT NOT NULL, `address` TEXT NOT NULL, `district` VARCHAR(191) NOT NULL,
  `regency` VARCHAR(191) NOT NULL, `postalCode` VARCHAR(191) NOT NULL, `phone` VARCHAR(191) NOT NULL,
  `whatsapp` VARCHAR(191) NOT NULL, `email` VARCHAR(191) NOT NULL, `serviceHours` VARCHAR(191) NOT NULL,
  `mapEmbedUrl` TEXT NOT NULL, `mapDirectionsUrl` TEXT NOT NULL, `whatsappDefaultMessage` TEXT NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
