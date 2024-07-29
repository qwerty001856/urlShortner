"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { AiOutlineProfile } from "react-icons/ai";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { RiUserAddFill } from "react-icons/ri";
import { useSession } from "../SessionProvider";

function Navbar() {
  const { session, logout } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const iconColor = (path) => {
    return pathname === path ? "#58bc82" : "white";
  };
  const logOutUser = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col">
      <div className="shadow-white border-gray-300 py-3 flex gap-1 shadow-md rounded-md justify-between px-4">
        <Link href="/">
          <div className="group relative px-4 cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                height="32"
                width="32"
              >
                <path
                  stroke="currentColor"
                  style={{ color: iconColor("/") }}
                  d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                ></path>
              </svg>
            </div>
            <span className="absolute text-nowrap top-10 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
              Home
            </span>
          </div>
        </Link>

        {!session?.user?.id ? (
          <>
            <Link href="/login">
              <div className="group relative px-4 cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                  <IoIosLogIn
                    size={24}
                    style={{ color: iconColor("/login") }}
                  />
                </div>
                <span className="absolute text-nowrap top-10 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                  Log IN
                </span>
              </div>
            </Link>
            <Link href="/signup">
              <div className="group relative px-4 cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                  <RiUserAddFill
                    size={24}
                    style={{ color: iconColor("/signup") }}
                  />
                </div>
                <span className="absolute text-nowrap top-10 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                  Sign Up
                </span>
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link href="/myUrls">
              <div className="group relative px-4 cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                  <AiOutlineProfile
                    size={24}
                    style={{ color: iconColor("/myUrls") }}
                  />
                </div>
                <span className="absolute text-nowrap top-10 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                  My URLs
                </span>
              </div>
            </Link>
            <div
              className="group relative px-4 cursor-pointer"
              onClick={() => {
                logOutUser();
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500">
                <IoIosLogOut
                  size={24}
                  style={{ color: iconColor("/logout") }}
                />
              </div>
              <span className="absolute text-nowrap top-10 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                Log Out
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
