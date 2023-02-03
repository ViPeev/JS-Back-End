const { Schema, model } = require("mongoose");

const cubeSchema = new Schema({
  name: { type: String, required:[true,'Name is required']},
  description: {
    type: String,
    required:[true,"Description is required!"],
    length: { max: [50, "Description must be at most 50 characters long"] },
  },
  imageUrl: { type: String, required:[true,'Image URL is required!'],
  validate:[/^https./,'Please provide a correct URL!'] },
  diffLevel: {
    type: Number,
    required: [true,'Please, select a number between 1 and 6'],
    min: [1, "Difficulty level must be atleast 1"],
    max: [6, "Difficulty level must be at most 6"],
  },
  accessories: { type: [Schema.Types.ObjectId], ref: "accessory" },
  createrId:{type:String,required:true}
});

const cubeModel = model("cube", cubeSchema);

module.exports = cubeModel;
