CREATE TABLE `Staff` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `category` ENUM('PRINCIPAL', 'TEACHER', 'STAFF') NOT NULL DEFAULT 'TEACHER',
  `position` VARCHAR(191) NOT NULL,
  `identityNo` VARCHAR(191) NULL,
  `education` VARCHAR(191) NULL,
  `experience` VARCHAR(191) NULL,
  `description` TEXT NULL,
  `quote` TEXT NULL,
  `image` VARCHAR(191) NULL,
  `imageAlt` VARCHAR(191) NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `sortOrder` INTEGER NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  INDEX `Staff_isActive_category_sortOrder_idx`(`isActive`, `category`, `sortOrder`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
