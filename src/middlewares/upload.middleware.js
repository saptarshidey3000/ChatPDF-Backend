import multer from "multer";
import path from "path";
import ApiError from "../utils/ApiError.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new ApiError(400, "Only PDF files are allowed"),
      false
    );
  }

  cb(null, true);
};

export const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter,
});