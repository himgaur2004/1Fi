require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("../models/Product");

async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/emi-store";
  await mongoose.connect(uri);

  let seedFilePath = path.join(__dirname, "seed_products.json");
  if (!fs.existsSync(seedFilePath)) {
    seedFilePath = path.join(__dirname, "../../../seed_products.json");
  }

  const data = JSON.parse(fs.readFileSync(seedFilePath, "utf-8"));

  await Product.deleteMany({});
  await Product.insertMany(data);

  console.log(`Successfully seeded ${data.length} products into MongoDB`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
