-- CreateTable
CREATE TABLE "Identity" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "Identity_pkey" PRIMARY KEY ("id")
);
