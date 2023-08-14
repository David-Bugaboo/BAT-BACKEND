mongoose = require("mongoose");
require('dotenv/config')


const mongoConnectionUri = process.env.MONGO_DB_URI || "http://localhost:0000";

async function connectToMongoDb() {
  try {
    await mongoose.connect(mongoConnectionUri, {});
    console.log("Connected to BAT MongoDB database");
  } catch (e) {
    console.error(e);
    throw e;
  }
}

exports.connectToMongoDb = connectToMongoDb;
