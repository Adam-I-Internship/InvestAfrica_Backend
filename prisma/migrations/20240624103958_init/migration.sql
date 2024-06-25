/*
  Warnings:

  - You are about to drop the column `companyWebsite` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `personOfContact` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "companyWebsite",
DROP COLUMN "personOfContact",
DROP COLUMN "position";
