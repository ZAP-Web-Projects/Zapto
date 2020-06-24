const mongoose = require('mongoose');
const db = "mongodb+srv://admin:<admin123>@cluster0-odend.mongodb.net/<dbname>?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      { useNewUrlParser: true}
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;