import { NextResponse } from "next/server";
import Url from "@/models/url";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");
  const isAdminRequest = searchParams.get("admin") === "true";
  await connectDB();

  const user = await User.findById(userId);
  try {
    let urls;
    if (isAdminRequest) {
      if (user?.role === "admin") {
        urls = await Url.find({}).populate("userId", "userName");
      } else {
        return NextResponse.json([]);
      }
    } else {
      urls = await Url.find({ userId }).populate("userId", "userName");
    }
    return NextResponse.json(urls);
  } catch (error) {
    return NextResponse.json([]);
  }
}
