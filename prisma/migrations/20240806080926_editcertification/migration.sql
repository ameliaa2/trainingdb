/*
  Warnings:

  - You are about to drop the column `certificatonCategory` on the `auth_users_departemen_team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `auth_users_departemen_team` DROP COLUMN `certificatonCategory`,
    ADD COLUMN `certificationCategory` VARCHAR(255) NULL;
