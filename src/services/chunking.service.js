export const chunkText = ({
  text,
  pageNumber,
  chunkSize = 1000,
  overlap = 200,
}) => {
  const chunks = [];

  let start = 0;
  let chunkIndex = 0;

  while (start < text.length) {
    const end = start + chunkSize;

    const chunk = text.slice(start, end);

    chunks.push({
      chunkIndex,
      content: chunk,
      pageNumber,
      tokenCount: chunk.length,
    });

    start += chunkSize - overlap;

    chunkIndex++;
  }

  return chunks;
};