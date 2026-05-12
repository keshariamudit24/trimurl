-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "longUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "alias" BOOLEAN NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);
