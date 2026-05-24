# README.md

````md
ChatPDF Backend

AI-powered PDF chat backend built with Node.js, Express.js, Gemini AI, Qdrant Vector DB, Prisma, PostgreSQL, and Cloudinary.

This backend allows users to:

- Upload PDFs
- Parse and chunk PDF content
- Generate embeddings using Gemini
- Store vectors in Qdrant
- Perform semantic search (RAG)
- Chat with PDFs using AI
- Persist chat history
- Authenticate users using Clerk

---

Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Google Gemini AI
- Qdrant Vector Database
- Cloudinary
- Clerk Authentication
- Multer
- pdf-parse-new
- Rate Limiting + Security Middleware

---

Features

 Authentication
- Clerk JWT authentication
- Protected API routes
- User-specific PDFs and chats

PDF Upload Pipeline
- Upload PDF files
- Store files in Cloudinary
- Extract PDF text
- Chunk text intelligently
- Generate embeddings
- Store vectors in Qdrant

AI Chat System
- Retrieval-Augmented Generation (RAG)
- Semantic search over PDF chunks
- Gemini-powered responses
- Citation support
- Persistent chat history

Security
- Helmet
- Rate limiting
- CORS protection
- Secure cookies
- Request validation

---

Project Structure

```bash
src
├── config
├── controllers
├── middlewares
├── routes
├── services
├── scripts
├── utils
├── app.js
└── server.js
````

---

# Environment Variables

Create a `.env` file:

```env
PORT=8000
DATABASE_URL=
FRONTEND_URL=
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
GEMINI_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
QDRANT_URL=
QDRANT_API_KEY=
```

---

# Installation

```bash
git clone <repo-url>

cd chatpdf-backend

npm install
```

---

# Prisma Setup

```bash
npx prisma generate

npx prisma migrate dev
```

---

# Run Development Server

```bash
npm run dev
```

---

# Production Start

```bash
npm start
```

---

# API Routes

## Health Check

```http
GET /
```

---

## Test Database

```http
GET /test-db
```

---

## Upload PDF

```http
POST /api/v1/upload/pdf
```

### FormData

```bash
pdf: File
```

---

## Ask Questions About PDF

```http
POST /api/v1/chat/ask
```

### Request Body

```json
{
  "pdfId": "pdf_id",
  "question": "Explain this PDF"
}
```

---

# RAG Flow

```txt
PDF Upload
   ↓
PDF Parsing
   ↓
Chunking
   ↓
Embedding Generation
   ↓
Store Vectors in Qdrant
   ↓
Semantic Retrieval
   ↓
Gemini AI Response
```

---

# Future Improvements

* Streaming AI responses
* Multi-PDF chat
* PDF page preview
* OCR support
* LangChain integration
* Background processing queues
* Redis caching
* Conversation memory

---
# 🖼 Frontend Preview

<p align="center">
  <img width="1426" alt="Screenshot 2026-05-24 211156" src="https://github.com/user-attachments/assets/0a218614-5432-4c97-bf63-70c26a5c6a7b" />
</p>

<p align="center">
  <img width="714" alt="Screenshot 2026-05-24 211323" src="https://github.com/user-attachments/assets/9def12a1-b384-4426-873e-cfef201d7af0" />
</p>

<p align="center">
  <img width="1536" alt="chatpdf ui" src="https://github.com/user-attachments/assets/b47099be-d4c4-4e5b-92c3-94417fb10634" />
</p>

---

# Author
Saptarshi Dey
