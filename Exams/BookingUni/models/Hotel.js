const { Schema, model } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [4, "Hotel name must be at least 4 characters long"],
  },
  city: {
    type: String,
    required: true,
    minlength: [3, "City name must be at least 3 characters long"],
  },
  imageUrl: {
    type: String,
    requred: true,
    validate: {
      validator: (value) => {
        return URL_PATTERN.test(value);
      },
      message: "Image Url is not valid",
    },
  },
  rooms: {
    type: String,
    required: true,
    min: [1, "Rooms must be between 1 and 100"],
    max: [100, "Rooms must be between 1 and 100"],
  },
  booking: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

hotelSchema.index(
  { name: 1 },
  {
    collation: {
      locale: "end",
      strength: 2,
    },
  }
);

const Hotel = model("Hotel", hotelSchema);

module.exports = Hotel;
