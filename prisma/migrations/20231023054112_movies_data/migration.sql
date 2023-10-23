-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "movieName" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "cast" TEXT[],
    "genre" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
