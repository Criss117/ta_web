-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SyncRemote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tableName" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "error" TEXT,
    "lastSync" DATETIME,
    "recordId" INTEGER NOT NULL,
    "operation" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_SyncRemote" ("createdAt", "deletedAt", "error", "id", "isActive", "lastSync", "operation", "recordId", "state", "tableName", "updatedAt") SELECT "createdAt", "deletedAt", "error", "id", "isActive", "lastSync", "operation", "recordId", "state", "tableName", "updatedAt" FROM "SyncRemote";
DROP TABLE "SyncRemote";
ALTER TABLE "new_SyncRemote" RENAME TO "SyncRemote";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
