/*
  Warnings:

  - A unique constraint covering the columns `[userId,booksID]` on the table `FavoriteBooks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `FavoriteBooks_userId_booksID_key` ON `FavoriteBooks`(`userId`, `booksID`);
