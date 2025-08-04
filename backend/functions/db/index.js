const admin = require("firebase-admin");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Use default credentials for Cloud Functions
admin.initializeApp({
  databaseURL: DATABASE_URL
});

const db = admin.database();

module.exports = db;