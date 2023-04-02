const connectionString = "mongodb://localhost:27017/bookReviews";
const mongoose = require("mongoose");

module.exports = async (app) => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error(err.message);
    process.exit(1);
  }
};
