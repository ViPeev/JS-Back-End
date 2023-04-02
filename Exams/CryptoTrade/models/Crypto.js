const { model, Schema } = require("mongoose");

const CryptoSchema = new Schema({
  name: {
    type: String,
    minlength: [2, "Title must be at least 2 characters long"],
  },
  price: {
    type: Number,
    min: [1, "Price must be a positive number"],
  },
  image: {
    type: String,
    validate: [/^https.\/\//, "Image URL must be a valid link"],
  },
  description: {
    type: String,
    minlength: [10, "Description must be at least 10 characters long"],
  },
  payment: {
    type: String,
    enum: {
      values: ["crypto-wallet", "credit-card", "debit-card", "paypal"],
      message: "Payment method not supported",
    },
  },
  // stars: {
  //   type: Number,
  //   min: [1, "Rating value must be at least 1"],
  //   max: [5, "Rating value must be at most 5"],
  // },
  wishingList: { type: [Schema.Types.ObjectId], ref: "user" },
  owner: { type: Schema.Types.ObjectId, required: true },
});

const Crypto = model("crypto", CryptoSchema);

module.exports = Crypto;
