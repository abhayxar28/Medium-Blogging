import { PrismaClient } from "@prisma/client";

const prisma = (global as typeof global & { prisma?: PrismaClient }).prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  (global as typeof global & { prisma?: PrismaClient }).prisma = prisma;
}

export default prisma;
