// "use server";

// import { auth } from "@/auth";
// import dbConnect from "@/utils/dbconnect";
// import { compare, hash } from "bcryptjs";
// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";
// import User from "@/models/User";

// const login = async (user) => {
//   console.log("in the login function");
//   const email = user.email;
//   const password = user.password;
//   if (!email || !password) {
//     throw new Error("Please fill all fields");
//   }
//   try {
//     await dbConnect();
//     const user = await Userer.findOne({ email }).select("+password");
//     if (!user) {
//       throw new Error("No user found with the email");
//     }
//     const isValid = await compare(password, user.password);
//     if (!isValid) {
//       throw new Error("Password is incorrect");
//     }
//     return {
//       id: user._id,
//       email: user.email,
//       userName: user.userName,
//       role: user.role,
//     };
//   } catch (error) {
//     const someError = error;
//     return someError.cause;
//   }
//   // redirect("/");
// };
// const register = async (user) => {
//   const userName = user.userName;
//   const email = user.email;
//   const password = user.password;
//   if (!userName || !email || !password) {
//     throw new Error("Please fill all fields");
//   }
//   await dbConnect();
//   const existingUser = await User.findOne({ email });
//   if (existingUser) throw new Error("User already exists");
//   const hashedPassword = await hash(password, 12);
//   await User.create({ userName, email, password: hashedPassword });
//   redirect("/login");
// };
// const getSession = async () => {
//   const session = await auth();
//   const cookiesStore = cookies();
//   const token = cookiesStore.get("authjs.session-token");
//   let user = session?.user || null;
//   return { user, token: token?.value };
// };

// export { register, login, getSession };
