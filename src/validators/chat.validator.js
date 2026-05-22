import {z} from "zod";

//Ask PDF Question Validation
export const askPdfQuestionSchema = z.object({
    pdfId: z.string().min(1),
    question: z.string().min(1).max(2000),
});