import { NextResponse } from "next/server";
import Url from "@/models/url";
import connectDB from "@/lib/mongoose";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const shortUrl = searchParams.get("url");
    if (!shortUrl) {
      return NextResponse.json({ message: "URL not found" }, { status: 400 });
    }

    const url = await Url.findOneAndUpdate(
      { shortUrl },
      { $inc: { accessCount: 1 } },
      { new: true }
    );
    if (url) {
      return NextResponse.json({ redirectUrl: url.originalUrl });
    } else {
      return NextResponse.json({ message: "URL not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Failed to redirect URL:", error);
    return NextResponse.json(
      { message: "Failed to redirect URL", error },
      { status: 500 }
    );
  }
}

/////////
/////////
/////////
/////////
/////////
/////////
/////////
/////////
// import { NextResponse } from "next/server";

// import Url from "@/models/url";
// import connectDB from "@/lib/mongoose";
// export async function GET(request) {
//   try {
//     await connectDB();
//     const { searchParams } = new URL(request.url);
//     const shortUrl = searchParams.get("url");
//     if (!shortUrl) {
//       // return NextResponse.redirect("/", { status: 400 });
//       return NextResponse.json({ message: "URL not found" }, { status: 400 });
//     }

//     const url = await Url.findOneAndUpdate(
//       { shortUrl },
//       { $inc: { accessCount: 1 } },
//       { new: true }
//     );
//     if (url) {
//       // return NextResponse.redirect(url.originalUrl);
//       return NextResponse.json({ redirectUrl: url.originalUrl });
//     } else {
//       // return NextResponse.redirect("/", { status: 404 });
//       return NextResponse.json({ message: "URL not foundd" }, { status: 404 });
//     }
//   } catch (error) {
//     console.error("Failed to redirect URL:", error);
//     // return NextResponse.redirect("/", { status: 500 });
//     return NextResponse.json(
//       { message: "Failed to redirect URL", error },
//       { status: 500 }
//     );
//   }
// }

// ////
// ////
// ///
// //
// //
// // //
// import { NextResponse } from "next/server";
// import dbConnect from "@/utils/dbconnect";
// import Url from "@/models/url";

// export async function GET(request) {
//   try {
//     await dbConnect();
//     const { searchParams } = new URL(request.url);
//     const shortUrl = searchParams.get("url");
//     if (!shortUrl) {
//       // return NextResponse.redirect("/", { status: 400 });
//       return NextResponse.json({ message: "URL not found" }, { status: 400 });
//     }

//     const url = await Url.findOneAndUpdate(
//       { shortUrl },
//       { $inc: { accessCount: 1 } },
//       { new: true }
//     );
//     if (url) {
//       console.log("redirecting");
//       console.log("");
//       console.log("");
//       console.log("");
//       console.log("");
//       return NextResponse.redirect(url.originalUrl);
//       // return NextResponse.json({ redirectUrl: url.originalUrl });
//     } else {
//       // return NextResponse.redirect("/", { status: 404 });
//       return NextResponse.json({ message: "URL not foundd" }, { status: 404 });
//     }
//   } catch (error) {
//     console.error("Failed to redirect URL:", error);
//     // return NextResponse.redirect("/", { status: 500 });
//     return NextResponse.json(
//       { message: "Failed to redirect URL", error },
//       { status: 500 }
//     );
//   }
// }
