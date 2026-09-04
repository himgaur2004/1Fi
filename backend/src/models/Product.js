const mongoose = require("mongoose");

const EMIPlanSchema = new mongoose.Schema(
  {
    tenureMonths: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    monthlyAmount: { type: Number, required: true },
    cashback: { type: Number, default: 0 },
  },
  { _id: false }
);

const VariantSchema = new mongoose.Schema({
  variantId: { type: String, required: true },
  storage: { type: String },
  color: { type: String, required: true },
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  emiPlans: [EMIPlanSchema],
});

const SpecItemSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const SpecCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    items: [SpecItemSchema],
  },
  { _id: false }
);

const ReviewSchema = new mongoose.Schema(
  {
    id: { type: String },
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: String, required: true },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    verifiedBuyer: { type: Boolean, default: true },
    helpfulCount: { type: Number, default: 0 },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String },
    highlights: [{ type: String }],
    inTheBox: [{ type: String }],
    seller: {
      name: { type: String, default: "OmniTech Retail Pvt Ltd" },
      badge: { type: String, default: "Authorized Brand Partner" },
      rating: { type: Number, default: 4.8 },
      reviewCount: { type: Number, default: 18420 },
      deliveryDays: { type: String, default: "2 - 3 Business Days" },
      returnPolicy: { type: String, default: "7 Days Hassle-Free Replacement" },
      warranty: { type: String, default: "1 Year Official Manufacturer Warranty" },
    },
    specifications: [SpecCategorySchema],
    ratingSummary: {
      average: { type: Number, default: 4.7 },
      totalRatings: { type: Number, default: 1420 },
      totalReviews: { type: Number, default: 384 },
      distribution: [
        {
          star: { type: Number },
          percentage: { type: Number },
          count: { type: Number },
        },
      ],
    },
    reviews: [ReviewSchema],
    variants: [VariantSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
