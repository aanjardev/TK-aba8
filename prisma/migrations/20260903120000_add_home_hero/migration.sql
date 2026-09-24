CREATE TABLE `HomeHero` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'main',
    `headlineTop` VARCHAR(191) NOT NULL,
    `headlineHighlight` VARCHAR(191) NOT NULL,
    `headlineBottom` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `primaryLabel` VARCHAR(191) NOT NULL,
    `primaryUrl` VARCHAR(191) NOT NULL,
    `secondaryLabel` VARCHAR(191) NOT NULL,
    `secondaryUrl` VARCHAR(191) NOT NULL,
    `backgroundImage` VARCHAR(191) NULL,
    `stats` JSON NOT NULL,
    `features` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
