const { Schema, model } = require("mongoose");

const accessorySchema = new Schema({
  name: { type: String, required:[true,'Name is required']},
  description: {
    type: String,
    required:[true,"Description is required!"],
    length: { max: [50, "Description must be at most 50 characters long"] },
  },
  imageUrl: { type: String, required: true, validate: /^https./ },
});

const accessoryModel = model("accessory", accessorySchema);

module.exports = accessoryModel;
