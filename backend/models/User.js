const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  favoriteGenres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
  wantToRead: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  completed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);