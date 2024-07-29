"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Loader from "@/components/loader/Loader";
import { useSession } from "@/components/SessionProvider";

export default function MYUrls() {
  const { session } = useSession();
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllUrls, setShowAllUrls] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      setIsLoading(true);
      const url = showAllUrls
        ? `/api/getLinks?admin=true&id=${session.user.id}`
        : `/api/getLinks?id=${session.user.id}`;
      axios
        .get(url)
        .then((response) => {
          setUrls(Array.isArray(response.data) ? response.data : []);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  }, [session, showAllUrls]);

  const deleteUrl = async (id) => {
    try {
      await axios.delete(`/api/deleteLinks?id=${id}`),
        {
          headers: {
            withCredentials: true,
            "Content-Type": "application/json",
          },
        };
      setUrls(urls.filter((url) => url._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const calculateDaysLeft = (expiresAt) => {
    const currentDate = moment();
    const expiryDate = moment(expiresAt);
    return expiryDate.diff(currentDate, "days");
  };

  return (
    <div className="text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl mb-6">Your URLs</h1>
      {session?.user?.role === "admin" ? (
        <div className="flex items-center mb-4">
          <label className="cursor-pointer flex items-center">
            <div className="relative">
              <input
                type="checkbox"
                checked={showAllUrls}
                onChange={() => setShowAllUrls(!showAllUrls)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-[#58bc82]"></div>
              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition peer-checked:translate-x-full"></div>
            </div>
            <span className="ml-3 text-lg">Show All URLs</span>
          </label>
        </div>
      ) : (
        ""
      )}
      <div className="w-full max-w-3xl">
        {isLoading ? (
          <div className="justify-center items-center flex h-screen">
            <Loader />
          </div>
        ) : urls.length === 0 ? (
          <p className="text-center text-gray-400">No URLs found.</p>
        ) : (
          Array.isArray(urls) &&
          urls.map((url) => (
            <div
              key={url._id}
              className="bg-gray-800 p-4 rounded mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex-1 mb-4 sm:mb-0 break-all">
                <a
                  target="_blank"
                  href={`/${url.shortUrl}`}
                  className="text-lg text-[#58bc82] hover:underline hover:underline-offset-2 break-all"
                >
                  {`${process.env.NEXT_PUBLIC_DOMAIN}${url.shortUrl}`}
                </a>
                <p className="text-sm text-gray-400 break-all">
                  {url.originalUrl}
                </p>
                <p className="text-sm text-gray-400">
                  Expires: {moment(url.expiresAt).format("LLL")}
                </p>
                <p className="text-sm text-gray-400">
                  {calculateDaysLeft(url.expiresAt)} days left
                </p>
                <p className="text-sm text-gray-400">
                  Access Count: {url.accessCount}
                </p>
                {showAllUrls && url.userId && (
                  <p className="text-sm text-gray-400">
                    Created by: {url.userId.userName}
                  </p>
                )}
              </div>
              <button
                className="bg-red-500 px-4 py-2 rounded text-sm w-full sm:w-auto"
                onClick={() => deleteUrl(url._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
