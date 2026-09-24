CREATE TABLE `Achievement` (
    `id` VARCHAR(191) NOT NULL, `title` VARCHAR(191) NOT NULL,
    `recipient` VARCHAR(191) NOT NULL, `category` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL, `year` INTEGER NOT NULL,
    `description` TEXT NOT NULL, `image` VARCHAR(191) NULL, `imageAlt` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true, `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), `updatedAt` DATETIME(3) NOT NULL,
    INDEX `Achievement_isActive_isFeatured_year_sortOrder_idx`(`isActive`, `isFeatured`, `year`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
