import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "../../models/user";
import jwt from "jsonwebtoken";

// Helper to get user ID from cookie
const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded.id;
  } catch (error) {
    throw new Error("Invalid Token");
  }
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const userId = getDataFromToken(req); // Authenticate
    const { productId } = await req.json();

    const user = await User.findById(userId);

    // Toggle Logic: If exists, remove. If not, add.
    const isBookmarked = user.wishlist.includes(productId);

    let updatedUser;
    if (isBookmarked) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { wishlist: productId } },
        { new: true }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { wishlist: productId } },
        { new: true }
      );
    }

    return NextResponse.json({
      message: isBookmarked ? "Removed from wishlist" : "Added to wishlist",
      wishlist: updatedUser.wishlist,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

// GET Wishlist items
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const userId = getDataFromToken(req);
    const user = await User.findById(userId).populate("wishlist");
    return NextResponse.json(user.wishlist);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
