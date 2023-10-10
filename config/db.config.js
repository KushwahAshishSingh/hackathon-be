const mongoose = require('mongoose');

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log('connected to database');
  } catch (e) {
    console.log("Something went wrong", e);
  }
}

module.exports = db;