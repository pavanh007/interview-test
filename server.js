import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });


mongoose
  .connect("mongodb://127.0.0.1:27017/ticket-master-node", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection established successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    console.error("Error code:", error.code);
    process.exit(1); // Exit the process with an error code
  });

//NOTE - Start the server
const port = process.env.PORT || 6011;
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}....`);
});
