import prisma from "../config/db.js";

import {searchSimilarChunks} from "./vector.service.js";

import {generateChatCompletion} from "./ai.service.js";
import {generatestreamingChatCompletion} from "./ai.service.js";

//Stream RAG response

export const streamResponse = async ({
    pdfId, question, userId , res ,
}) => {
    //retrieve relevant chunks
    const retrievedChunks = await searchSimilarChunks({
        query: question,
        pdfId,
        topK: 5,
    });
    //build context
    const context = retrievedChunks.map((chunk) => {
        return `
PAGE ${chunk.payload.pageNumber}:
${chunk.payload.text}
`;
    }).join("\n\n");
    //build prompt
    const systemPrompt = `
    You are an AI PDF assistant.

Answer ONLY using provided PDF context.

If answer is missing,
say:
"I could not find this information in the PDF."

Always cite page numbers.

Keep answers concise.

PDF Context:
${context}
`;
//store fullresponse 
let fullResponse = "";
//stream ai tokens
const stream = await generatestreamingChatCompletion({
    systemPrompt,
    userMessage: question,
});
//Handle client disconnect
let isClientDisconnected = false;
req.on("close", () => {
    console.log("Client disconnected");
    isClientDisconnected = true;
    stream.cancel(); //cancel Gemini stream
});
//Stream tokens one by one
for await (const chunk of stream) {
    //Stop if client disconnected
    if (isClientDisconnected) {
        console.log("Stopping stream due to client disconnect");
        break;
    }
    //Extract token text
    const text = chunk.text;
    if(!text) continue;
    //Build final response
    fullResponse += text;
    //Send token to client
    res.write(
        `data:${JSON.stringify({
            type:"stream",
            chunk: text,
        })}\n\n`
    );
}
  //save chat history
  await prisma.chat.create({
    data: {
        pdfId,
        userId,
        userQuestion: question,
        aiAnswer: fullResponse,
    } ,
    });
    //Send citations
    res.write(
        `data:${JSON.stringify({
            type:"citations",
            citations: retrievedChunks.map((chunk) => ({
                pageNumber: chunk.payload.pageNumber,
                text: chunk.payload.text,
            })),
        })}\n\n`
    );
    //End stream
    res.write(
        `data:${JSON.stringify({
            type:"end",
        })}\n\n`
    );
    //Close response
    res.end();
}
