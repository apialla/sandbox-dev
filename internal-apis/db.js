import mongoose, { Schema } from "mongoose";
import { products } from "./products.js";

const priceSchema = new Schema({
  basePrice: { type: String, required: true }, // Changed to String to accommodate currency representation
  currency: { type: String, required: true },
  discount: {
    type: new Schema({
      type: { type: String, enum: ["percentage", "fixed"], required: true },
      value: { type: Number, required: true },
      validUntil: { type: Date, required: true },
    }),
    required: true,
  },
  finalPrice: { type: String, required: true }, // Changed to String to accommodate currency representation
});

const specificationsSchema = new Schema({
  screenSize: { type: String, required: true },
  smartFeatures: { type: String, required: true },
});

const stockSchema = new Schema({
  availability: { type: String, required: true },
  quantity: { type: Number, required: true },
  warehouses: [
    {
      id: { type: String, required: true }, // Warehouse ID
      location: { type: String, required: true }, // Warehouse location
      quantity: { type: Number, required: true }, // Quantity in the warehouse
    },
  ],
});

const ratingSchema = new Schema({
  average: { type: Number, required: true },
  reviews: { type: Number, required: true },
});

const productSchema = new Schema({
  id: { type: String, required: true, unique: false },
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: String, required: true },
  price: { type: priceSchema, required: true },
  specifications: { type: specificationsSchema, required: true },
  stock: { type: stockSchema, required: true },
  rating: { type: ratingSchema, required: true },
  images: { type: [String], required: true },
});

export const Product = mongoose.model("Product", productSchema);

export async function connectDB() {
  const mongourl = process.env.mongodb_uri || "mongodb://localhost:27017/iapi";
  mongoose
    .connect(mongourl);
    __seedDB();
}

async function __seedDB() {
    const promises = [];
    for (let i = 0; i < 200; i++) {
      promises.push(Product.insertMany(products));
    }
    await Promise.all(promises);
}