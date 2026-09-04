const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const clientOrigin = process.env.CLIENT_ORIGIN;
if (clientOrigin && clientOrigin !== "*") {
  app.use(cors({ origin: clientOrigin.includes(",") ? clientOrigin.split(",") : clientOrigin }));
} else {
  app.use(cors());
}

app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/products", productRoutes);

app.use(errorHandler);

module.exports = app;
