import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "../../models/product";

// --- GET ONE PRODUCT ---
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// --- DELETE ONE PRODUCT ---
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // 1. Type is now a Promise
) {
  try {
    const { id } = await params; // 2. Must await params

    await connectDB();
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
