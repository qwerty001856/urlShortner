import connectDB from "@/lib/mongoose";
import { authenticateUser } from "@/lib/auth";
import { createAccessToken, createRefreshToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import { bcrypt } from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();
  try {
    const user = await authenticateUser(email, password);

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);
    return new NextResponse(
      JSON.stringify({
        message: "Login successful",
        id: user._id,
        role: user.role,
      }),
      {
        status: 200,
        headers: {
          "Set-Cookie": [
            `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict`,
            `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=5184000; SameSite=Strict`,
          ],
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }
}
