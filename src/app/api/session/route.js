import User from "@/models/User";
import { verifyAccessToken } from "../../../lib/jwt";

export async function GET(req) {
  const cookieHeader = req.headers.get("cookie");

  if (!cookieHeader) {
    return new Response(JSON.stringify({ error: "No cookies found" }), {
      status: 400,
    });
  }

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("="))
  );
  const token = cookies.accessToken;

  try {
    const { userId } = verifyAccessToken(token);
    const user = await User.findOne({ _id: userId });
    return new Response(JSON.stringify({ id: user._id, role: user.role }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
    });
  }
}
