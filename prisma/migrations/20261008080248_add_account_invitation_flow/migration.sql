-- AlterTable
ALTER TABLE `sitesettings` ALTER COLUMN `longName` DROP DEFAULT;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `activationToken` VARCHAR(191) NULL,
    ADD COLUMN `activationTokenExpiresAt` DATETIME(3) NULL,
    ADD COLUMN `resetToken` VARCHAR(191) NULL,
    ADD COLUMN `resetTokenExpiresAt` DATETIME(3) NULL,
    ADD COLUMN `status` ENUM('PENDING', 'ACTIVE') NOT NULL DEFAULT 'PENDING',
    MODIFY `password` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE INDEX `User_status_idx` ON `User`(`status`);
