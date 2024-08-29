/*
  Warnings:

  - Added the required column `ccNumber` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ccNumber" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "creditLimit" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Client" ("address", "balance", "createdAt", "creditLimit", "deletedAt", "fullName", "id", "isActive", "phone", "updatedAt") SELECT "address", "balance", "createdAt", "creditLimit", "deletedAt", "fullName", "id", "isActive", "phone", "updatedAt" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_ccNumber_key" ON "Client"("ccNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
