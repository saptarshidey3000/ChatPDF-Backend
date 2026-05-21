-- CreateTable
CREATE TABLE "PdfChunk" (
    "id" TEXT NOT NULL,
    "pdfId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "pageNumber" INTEGER NOT NULL,
    "tokenCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PdfChunk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PdfChunk_pdfId_idx" ON "PdfChunk"("pdfId");

-- CreateIndex
CREATE INDEX "PdfChunk_pageNumber_idx" ON "PdfChunk"("pageNumber");

-- CreateIndex
CREATE INDEX "PdfChunk_chunkIndex_idx" ON "PdfChunk"("chunkIndex");

-- AddForeignKey
ALTER TABLE "PdfChunk" ADD CONSTRAINT "PdfChunk_pdfId_fkey" FOREIGN KEY ("pdfId") REFERENCES "Pdf"("id") ON DELETE CASCADE ON UPDATE CASCADE;
