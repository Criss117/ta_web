-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductSale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "salePrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subTotal" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ticketId" TEXT NOT NULL,
    "productId" TEXT,
    CONSTRAINT "ProductSale_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductSale_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductSale" ("createdAt", "deletedAt", "id", "isActive", "productId", "quantity", "salePrice", "subTotal", "ticketId", "updatedAt") SELECT "createdAt", "deletedAt", "id", "isActive", "productId", "quantity", "salePrice", "subTotal", "ticketId", "updatedAt" FROM "ProductSale";
DROP TABLE "ProductSale";
ALTER TABLE "new_ProductSale" RENAME TO "ProductSale";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
