-- AlterTable
ALTER TABLE `users` ADD COLUMN `pathphoto` TEXT NULL,
    MODIFY `name` TEXT NOT NULL,
    MODIFY `pathktp` TEXT NULL,
    MODIFY `pathijazah` TEXT NULL;
