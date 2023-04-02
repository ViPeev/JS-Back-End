const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    minlength: [2, "Name must be at least 2 characters long"],
  },
  location: {
    type: String,
    minlength: [5, "Location must be at least 5 characters long"],
    maxlength: [50, "Location must be at most 50 characters long"],
  },
  image: {
    type: String,
    validate: [/^https.\/\//, "Image URL must be a valid link"],
  },
  description: {
    type: String,
    minlength: [5, "Description must be at least 5 characters long"],
    maxlength: [50, "Description must be at most 50 characters long"],
  },
  age: {
    type: Number,
    min: [1, "Rating value must be at least 1"],
    max: [100, "Rating value must be at most 100"],
  },
  list: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "user" },
      comment: String,
    },
  ],
  owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

const Product = model("product", productSchema);

module.exports = Product;
