const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/Cubicle";

mongoose.set('strictQuery',true);

module.exports = async (app) => {
  try {
    await mongoose.connect(mongoURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error("Error initializing database");
    console.error(err.message);
    process.exit(1);
  }
};
