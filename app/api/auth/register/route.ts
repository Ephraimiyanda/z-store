import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { username, email, password } = await req.json();

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User created", userId: newUser._id });
  } catch (error) {
    return NextResponse.json(
      { error: "Error registering user" },
      { status: 500 }
    );
  }
}
