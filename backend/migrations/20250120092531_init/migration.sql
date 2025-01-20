-- CreateTable
CREATE TABLE "MemoryLane" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "user_name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Memory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memory_lane_slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "images" TEXT NOT NULL,
    CONSTRAINT "Memory_memory_lane_slug_fkey" FOREIGN KEY ("memory_lane_slug") REFERENCES "MemoryLane" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);
