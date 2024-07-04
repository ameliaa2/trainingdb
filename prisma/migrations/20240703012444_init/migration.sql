-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `pathktp` VARCHAR(255) NOT NULL,
    `pathijazah` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departemen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `license` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departemen_team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iddepartemen` INTEGER NOT NULL,
    `idteam` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iduser` INTEGER NOT NULL,
    `iddepartemen` INTEGER NOT NULL,
    `idteam` INTEGER NOT NULL,
    `jobs` VARCHAR(191) NOT NULL,
    `grade` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_users_departemen_team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iduser` INTEGER NOT NULL,
    `iddepartemen` INTEGER NOT NULL,
    `idteam` INTEGER NOT NULL,
    `idlicense` INTEGER NOT NULL,
    `category` VARCHAR(30) NOT NULL,
    `status` VARCHAR(30) NOT NULL,
    `level` VARCHAR(30) NOT NULL,
    `pathlicense` VARCHAR(255) NOT NULL,
    `issueddate` DATETIME(3) NOT NULL,
    `expireddate` DATETIME(3) NOT NULL,
    `issuedyear` INTEGER NOT NULL,
    `expiredyear` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `departemen_team` ADD CONSTRAINT `departemen_team_iddepartemen_fkey` FOREIGN KEY (`iddepartemen`) REFERENCES `departemen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `departemen_team` ADD CONSTRAINT `departemen_team_idteam_fkey` FOREIGN KEY (`idteam`) REFERENCES `team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth_users` ADD CONSTRAINT `auth_users_iduser_fkey` FOREIGN KEY (`iduser`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth_users` ADD CONSTRAINT `auth_users_iddepartemen_fkey` FOREIGN KEY (`iddepartemen`) REFERENCES `departemen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth_users` ADD CONSTRAINT `auth_users_idteam_fkey` FOREIGN KEY (`idteam`) REFERENCES `team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth_users_departemen_team` ADD CONSTRAINT `auth_users_departemen_team_iduser_fkey` FOREIGN KEY (`iduser`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth_users_departemen_team` ADD CONSTRAINT `auth_users_departemen_team_iddepartemen_fkey` FOREIGN KEY (`iddepartemen`) REFERENCES `departemen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth_users_departemen_team` ADD CONSTRAINT `auth_users_departemen_team_idteam_fkey` FOREIGN KEY (`idteam`) REFERENCES `team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auth_users_departemen_team` ADD CONSTRAINT `auth_users_departemen_team_idlicense_fkey` FOREIGN KEY (`idlicense`) REFERENCES `license`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
