// import { verifyRefreshToken, createAccessToken } from "@/lib/jwt";
// import connectDB from "@/lib/mongoose";
// import User from "@/models/User";

// export async function POST(req) {
//   await connectDB();
//   const { token } = await req.json();

//   try {
//     const { userId } = verifyRefreshToken(token);
//     const user = await User.findById(userId);
//     if (!user) {
//       throw new Error("User not found");
//     }

//     const accessToken = createAccessToken(user);

//     return new Response(JSON.stringify({ message: "Token refreshed" }), {
//       status: 200,
//       headers: {
//         "Set-Cookie": `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict`,
//       },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 401,
//     });
//   }
// }
import { verifyRefreshToken, createAccessToken } from "@/lib/jwt";
import connectDB from "@/lib/mongoose";
import User from "@/models/User";
export async function POST(req) {
  await connectDB();
  let token;

  try {
    token = req.headers
      .get("cookie")
      .split("; ")
      .find((row) => row.startsWith("refreshToken"))
      .split("=")[1];
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
    });
  }
  try {
    const { userId } = verifyRefreshToken(token);
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = createAccessToken(user);

    return new Response(JSON.stringify({ message: "Token refreshed" }), {
      status: 200,
      headers: {
        "Set-Cookie": `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict`,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }
}
