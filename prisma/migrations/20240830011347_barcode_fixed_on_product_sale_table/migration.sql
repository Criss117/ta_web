-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductSale" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "salePrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subTotal" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ticketId" INTEGER NOT NULL,
    CONSTRAINT "ProductSale_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductSale" ("barcode", "createdAt", "deletedAt", "description", "id", "isActive", "quantity", "salePrice", "state", "subTotal", "ticketId", "updatedAt") SELECT "barcode", "createdAt", "deletedAt", "description", "id", "isActive", "quantity", "salePrice", "state", "subTotal", "ticketId", "updatedAt" FROM "ProductSale";
DROP TABLE "ProductSale";
ALTER TABLE "new_ProductSale" RENAME TO "ProductSale";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
