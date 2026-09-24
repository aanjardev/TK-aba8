CREATE TABLE `VisionMissionSettings` (
  `id` VARCHAR(191) NOT NULL DEFAULT 'main',
  `pageTitle` VARCHAR(191) NOT NULL,
  `introduction` TEXT NOT NULL,
  `visionTitle` VARCHAR(191) NOT NULL,
  `visionDescription` TEXT NOT NULL,
  `visionPoints` JSON NOT NULL,
  `missions` JSON NOT NULL,
  `goals` JSON NOT NULL,
  `motto` TEXT NOT NULL,
  `coreValues` JSON NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
