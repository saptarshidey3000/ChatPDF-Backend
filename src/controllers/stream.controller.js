import {generateStreamingChatCompletion} from "../services/ai.service.js";

//Stream PDFAI response
export const streamPdfAnswer = async (req, res) => {
    try{
        const {
            pdfId, question,
        } = req.body;
        //Validate input
        if (!pdfId || !question) {
            return res.status(400).json({
                success: false,
                message: "pdfId and question are required",
            });
        }
         /*
      |--------------------------------------------------------------------------
      | SSE Headers
      |--------------------------------------------------------------------------
      |
      | Keeps connection open
      | Allows real-time streaming
      |
      */
        res.setHeader(
            "Content-Type",
            "text/event-stream"
        );
        res.setHeader(
            "Cache-Control",
            "no-cache"
        );
        res.setHeader(
            "Connection",
            "keep-alive"
        );
        //Start streaming RAG response
        await generateStreamingChatCompletion({
            pdfId,
            question,
            userId: req.userId,
            res,
        });
    }
    catch (error) {
        console.error("Error in streamPdfAnswer:", error);
        res.status(500).json({
            success: false,
            message: "Failed to stream PDF answer",
        });
    }
};