const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbURI = process.env.DATABASE_URI;
    await mongoose.connect(dbURI);
    console.log('DB connection successful!');
  } catch (err) {
    process.exit(1);
  }
};

module.exports = connectDB;
