import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 8000;


// Check if env variables are loading
console.log(process.env.CLERK_PUBLISHABLE_KEY);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});