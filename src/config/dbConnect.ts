import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function databaseConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}
