/**
 *  This project contains all [apis] that resides on internal dmz.
 *
 */

import express from "express";
import responseTime from "response-time";
import { connectDB, Product } from "./db.js";
import { StatsD } from "node-statsd";

const app = express();
const PORT = process.env.PORT || 13111;

app.use(express.json());
app.use(responseTime());

const stats = new StatsD();

stats.socket.on("error", function (error) {
  console.error(error.stack);
});

app.use(
  responseTime(function (req, res, time) {
    let stat = (req.method + req.url)
      .toLowerCase()
      .replace(/[:.]/g, "")
      .replace(/\//g, "_");
    stats.timing(stat, time);
  })
);

app.get("/api/v1/product-details", async (req, res) => {
  const docs = await Product.find({});
  return res.send({ docs });
});

app.get("/api/v2/product-details", async (req, res) => {
  try {
    const {
      category,
      brand,
      availability,
      minRating,
      maxRating,
      limit = 10,
      offset = 0,
      search,
    } = req.query;

    const filters = {};

    if (category) {
      filters.category = category;
    }

    if (brand) {
      filters.brand = brand;
    }

    if (availability) {
      filters["stock.availability"] = availability;
    }

    if (minRating || maxRating) {
      filters["rating.average"] = {};
      if (minRating) filters["rating.average"].$gte = parseFloat(minRating);
      if (maxRating) filters["rating.average"].$lte = parseFloat(maxRating);
    }

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    // Query the database with filters and apply pagination
    const docs = await Product.find(filters)
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    // Count total documents that match the filters for pagination metadata
    const totalDocs = await Product.countDocuments(filters);

    // Return the paginated and filtered results
    return res.send({
      pagination: {
        totalDocs,
        limit: parseInt(limit),
        offset: parseInt(offset),
        totalPages: Math.ceil(totalDocs / limit),
        currentPage: Math.floor(offset / limit) + 1,
      },  result: docs,
    },);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/api/v1/get-product-details", async (req, res) => {
  const docs = await Product.find({}).limit(1);
  return res.send(docs);
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log(`error`);
  }
});


app.use("/", logResponseTime);

function logResponseTime(req, res, next) {
  const startHrTime = process.hrtime.bigint();
  res.on("finish", () => {
    const endHrTime = process.hrtime.bigint();
    const elapsedTimeInMs = Number(endHrTime - startHrTime) / 1000000.0;
    console.log(req.method + " " + req.originalUrl + " " + elapsedTimeInMs);
  });

  next();
}
