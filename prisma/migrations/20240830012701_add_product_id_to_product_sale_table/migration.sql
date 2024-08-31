/*
  Warnings:

  - You are about to drop the column `barcode` on the `ProductSale` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ProductSale` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ProductSale` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductSale" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "salePrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subTotal" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ticketId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "ProductSale_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductSale_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductSale" ("createdAt", "deletedAt", "id", "isActive", "quantity", "salePrice", "state", "subTotal", "ticketId", "updatedAt") SELECT "createdAt", "deletedAt", "id", "isActive", "quantity", "salePrice", "state", "subTotal", "ticketId", "updatedAt" FROM "ProductSale";
DROP TABLE "ProductSale";
ALTER TABLE "new_ProductSale" RENAME TO "ProductSale";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
