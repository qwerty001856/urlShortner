import { NextResponse } from "next/server";
import Url from "@/models/url";
import { nanoid } from "nanoid";
// import { getSession } from "@/actions/user";
import User from "@/models/User";
import connectDB from "@/lib/mongoose";

async function generateUniqueShortId() {
  let shortId;
  let existingUrl = null;

  do {
    shortId = nanoid(7); // generate a 7-character unique ID
    existingUrl = await Url.findOne({ shortUrl: shortId });
  } while (existingUrl);

  return shortId;
}

export async function POST(request) {
  try {
    console.log("in the post request to sorten");
    await connectDB();
    const body = await request.json();
    const originalUrl = body.originalUrl;
    let customDomain = body.customDomain || "";
    const userId = body?.id || null;
    console.log("user id", userId);
    let user = null;
    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
    }
    // Extract user role from the database or set default role if user is not found
    const role = user ? user.role : "default";
    console.log("role", role);
    // Set expiry date based on role
    let expiresAt;
    const currentDate = new Date();
    if (role === "admin") {
      expiresAt = new Date(currentDate.setDate(currentDate.getDate() + 500));
    } else if (role === "subscriber" || role === "user") {
      expiresAt = new Date(currentDate.setDate(currentDate.getDate() + 90)); // 120 days for subscribers
    } else {
      expiresAt = new Date(currentDate.setDate(currentDate.getDate() + 30)); // default 30 days
    }

    let url;

    if (role === "admin" || role === "subscriber" || role === "user") {
      // Ensure a unique short URL for each user if they are admin or subscriber
      url = await Url.findOne({ originalUrl, userId });

      if (!url) {
        const shortUrlId = await generateUniqueShortId();
        const shortUrl = customDomain
          ? `${customDomain}-${shortUrlId}`
          : shortUrlId;
        console.log("making url from 1");
        url = await Url.create({ originalUrl, shortUrl, userId, expiresAt });
      }
    } else {
      // For non-logged-in users, check if a short URL already exists
      url = await Url.findOne({ originalUrl, userId: null });

      if (!url) {
        const shortUrlId = await generateUniqueShortId();
        const shortUrl = shortUrlId; // No custom domain for non-logged-in users
        console.log("making url from 2");
        url = await Url.create({
          originalUrl,
          shortUrl,
          userId: null,
          expiresAt,
        });
      }
    }
    console.log("url is ", url);
    return new Response(JSON.stringify({ shortUrl: url.shortUrl }), {
      status: 201,
    });
  } catch (error) {
    console.error("Failed to shorten URL:", error);
    return NextResponse.json(
      { message: "Failed to shorten URL", error },
      { status: 500 }
    );
  }
}
