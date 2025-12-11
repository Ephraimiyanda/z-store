import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Global cache to prevent multiple connections in development (Hot Reload)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // 1. If we already have a connection, return it immediately.
  if (cached.conn) {
    return cached.conn;
  }

  // 2. If we don't have a promise (connection in progress), create one.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable mongoose buffering (Throw error immediately if not connected)
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB Connected");
      return mongoose;
    });
  }

  // 3. Await the promise to ensure connection is ready before returning.
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise on failure so we can try again
    console.error("MongoDB Connection Error:", e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
