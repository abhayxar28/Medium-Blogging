/*
  Warnings:

  - Added the required column `blogImage` to the `Blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "blogImage" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "time" TEXT NOT NULL;
