import connectDB from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(req) {
  const { userName, email, password } = await req.json();
  if (!userName || !email || !password) {
    throw new Error("Please fill all fields");
  }
  await connectDB();
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");
  // const hashedPassword = await hash(password, 12);
  await User.create({ userName, email, password });
  return new Response(
    JSON.stringify({ message: "User registered successfully" }),
    { status: 201 }
  );
}
