/*
  Warnings:

  - Added the required column `lastBalance` to the `DebtPayment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DebtPayment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "lastBalance" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "DebtPayment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DebtPayment" ("amount", "clientId", "createdAt", "deletedAt", "id", "isActive", "updatedAt") SELECT "amount", "clientId", "createdAt", "deletedAt", "id", "isActive", "updatedAt" FROM "DebtPayment";
DROP TABLE "DebtPayment";
ALTER TABLE "new_DebtPayment" RENAME TO "DebtPayment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
