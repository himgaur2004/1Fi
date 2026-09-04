const Product = require("../models/Product");

// GET /api/products -> lightweight list for home/listing page
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find(
      {},
      "slug name brand description variants.variantId variants.color variants.storage variants.price variants.mrp variants.images"
    );
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:slug -> full detail including variants and EMI plans
exports.getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};
