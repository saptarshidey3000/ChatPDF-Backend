import asyncHandler from "../utils/asyncHandler.js";
import { uploadPdfService } from "../services/upload.service.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const uploadPdf = asyncHandler(
  async (req, res) => {
    if (!req.file) {
      throw new ApiError(400, "PDF file is required");
    }

    const pdf = await uploadPdfService({
      file: req.file,
      userId: req.user.id,
    });

    return res.status(201).json(
new ApiResponse(
  201,
  "PDF uploaded successfully",
  pdf
)
    );
  }
);