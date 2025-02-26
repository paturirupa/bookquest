const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoute = require("./routes/userRoutes");
const bookRoute = require("./routes/bookRoutes");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/bookquest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Database connection error:", error));

app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);

app.listen(port, () => {
  console.log('App listening on port ${port}');
});