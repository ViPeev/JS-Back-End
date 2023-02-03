const { model, Schema } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    minlength: [2, "Title must be at least 2 characters long"],
  },
  author: {
    type: String,
    minlength: [5, "Author must be at least 5 characters long"],
  },
  image: {
    type: String,
    validate: [/^https.\/\//, "Image URL must be a valid link"],
  },
  review: {
    type: String,
    minlength: [10, "Review must be at least 10 characters long"],
  },
  genre: {
    type: String,
    minlength: [3, "Genre must be at least 3 characters long"],
  },
  stars: {
    type: Number,
    min: [1, "Rating value must be at least 1"],
    max: [5, "Rating value must be at most 5"],
  },
  wishingList: { type: [Schema.Types.ObjectId], ref: "user" },
  owner: { type: Schema.Types.ObjectId, required:true },
});

const Book = model("book", bookSchema);

module.exports = Book;
