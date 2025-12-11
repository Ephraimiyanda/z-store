import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create Token Data
    const tokenData = { id: user._id, email: user.email };

    // Sign Token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    // Set Cookie (HttpOnly) for security
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
