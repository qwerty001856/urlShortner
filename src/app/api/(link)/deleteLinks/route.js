// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbconnect";
// import Url from "@/models/url";
// import { getSession } from "@/actions/user";

// export async function DELETE(request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");
//   await dbConnect();

//   // Verify the session
//   const session = await getSession({});
//   if (!session) {
//     return NextResponse.json({ message: "Unauthorized" });
//   }

//   try {
//     const url = await Url.findById(id);
//     if (url.userId.toString() !== session.user.id) {
//       return NextResponse.json({ message: "Unauthorized" });
//     }

//     const deletedUrl = await Url.findOneAndDelete({ _id: id });
//     return NextResponse.json({ message: "URL deleted" });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "Error deleting URL", error });
//   }
// }
import { NextResponse } from "next/server";
import Url from "@/models/url";
import connectDB from "@/lib/mongoose";
import { verifyAccessToken } from "@/lib/jwt";
import User from "@/models/User";

export async function DELETE(request) {
  console.log("in delete");
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await connectDB();
  let token = request.headers
    .get("cookie")
    .split("; ")
    .find((row) => row.startsWith("accessToken"))
    .split("=")[1];
  const { userId } = verifyAccessToken(token);
  console.log("userId", userId);
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" });
  }

  try {
    const url = await Url.findById(id);
    if (!url) {
      return NextResponse.json({ message: "URL not found" });
    }

    // Check if the user is an admin or the owner of the URL
    if (user.role !== "admin" && url.userId.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" });
    }

    await Url.findOneAndDelete({ _id: id });
    return NextResponse.json({ message: "URL deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error deleting URL", error });
  }
}
