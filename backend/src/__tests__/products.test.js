const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");
const Product = require("../models/Product");
const seedData = require("../../../seed_products.json");

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
  await Product.insertMany(seedData);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

test("GET /api/health returns status ok", async () => {
  const res = await request(app).get("/api/health");
  expect(res.status).toBe(200);
  expect(res.body.status).toBe("ok");
});

test("GET /api/products returns all seeded products", async () => {
  const res = await request(app).get("/api/products");
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(seedData.length);
  expect(res.body[0]).toHaveProperty("slug");
  expect(res.body[0]).toHaveProperty("name");
  expect(res.body[0]).toHaveProperty("variants");
});

test("GET /api/products/:slug returns full detail with EMI plans", async () => {
  const res = await request(app).get("/api/products/iphone-17-pro");
  expect(res.status).toBe(200);
  expect(res.body.slug).toBe("iphone-17-pro");
  expect(res.body.variants.length).toBe(3);
  expect(res.body.variants[0].emiPlans.length).toBe(7);
  expect(res.body.variants[0].emiPlans[0]).toHaveProperty("tenureMonths");
  expect(res.body.variants[0].emiPlans[0]).toHaveProperty("monthlyAmount");
});

test("GET /api/products/:slug returns 404 for unknown slug", async () => {
  const res = await request(app).get("/api/products/not-real-phone-xyz");
  expect(res.status).toBe(404);
  expect(res.body.message).toBe("Product not found");
});
