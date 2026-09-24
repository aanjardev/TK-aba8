CREATE TABLE `CurriculumSettings` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'main', `title` VARCHAR(191) NOT NULL,
    `introduction` TEXT NOT NULL, `approachTitle` VARCHAR(191) NOT NULL,
    `approachDescription` TEXT NOT NULL, `image` VARCHAR(191) NULL,
    `methods` JSON NOT NULL, `schedule` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `EducationProgram` (
    `id` VARCHAR(191) NOT NULL, `slug` VARCHAR(191) NOT NULL, `title` VARCHAR(191) NOT NULL,
    `eyebrow` VARCHAR(191) NOT NULL, `description` TEXT NOT NULL, `age` VARCHAR(191) NOT NULL,
    `schedule` VARCHAR(191) NOT NULL, `capacity` VARCHAR(191) NOT NULL, `teacherRatio` VARCHAR(191) NOT NULL,
    `highlights` JSON NOT NULL, `image` VARCHAR(191) NULL, `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false, `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), `updatedAt` DATETIME(3) NOT NULL,
    UNIQUE INDEX `EducationProgram_slug_key`(`slug`),
    INDEX `EducationProgram_isActive_isFeatured_sortOrder_idx`(`isActive`, `isFeatured`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
