export async function POST() {
  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
    headers: {
      "Set-Cookie": [
        "accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict",
        "refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict",
      ],
    },
  });
}
