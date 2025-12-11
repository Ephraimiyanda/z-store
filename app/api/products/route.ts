import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "../models/product";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("q") || "";
    const sizes = searchParams.get("sizes")?.split(",") || [];
    const availability = searchParams.get("availability")?.split(",") || [];
    const categories = searchParams.get("categories")?.split(",") || [];
    const colors = searchParams.get("colors")?.split(",") || [];
    const collections = searchParams.get("collections")?.split(",") || [];
    const tags = searchParams.get("tags")?.split(",") || [];
    const ratings = searchParams.get("ratings")?.split(",") || [];
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const query: any = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ];
    }

    if (sizes.length > 0 && sizes[0] !== "") {
      query.sizes = { $in: sizes };
    }

    if (colors.length > 0 && colors[0] !== "") {
      query.colors = { $in: colors };
    }

    if (categories.length > 0 && categories[0] !== "") {
      query.categories = { $in: categories };
    }

    if (collections.length > 0 && collections[0] !== "") {
      query.collections = { $in: collections };
    }

    if (tags.length > 0 && tags[0] !== "") {
      query.tags = { $in: tags };
    }

    // --- Price Range ($gte and $lte) ---
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (availability.includes("in-stock")) {
      query.stock = { $gt: 0 };
    } else if (availability.includes("out-of-stock")) {
      query.stock = { $lte: 0 };
    }

    if (ratings.length > 0 && ratings[0] !== "") {
      const minRating = Math.min(...ratings.map(Number));
      query.rating = { $gte: minRating };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Filter Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
