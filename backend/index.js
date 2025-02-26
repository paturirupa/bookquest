const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoute = require("./routes/userRoutes");
const bookRoute = require("./routes/bookRoutes"); // Ensure this is added

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/bookquest")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Database connection error:", error));

app.use("/api/users", userRoute);
app.use("/api/books", bookRoute); // Add book routes

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
