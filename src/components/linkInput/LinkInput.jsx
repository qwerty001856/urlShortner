"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaRegCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSession } from "../SessionProvider";

function LinkInput() {
  const [link, setLink] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const { session } = useSession();

  const getShortenLink = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/shorten", {
        originalUrl: link,
        customDomain: customDomain,
        id: session?.user?.id || null,
      });
      console.log("response", response);
      setShortUrl(`${process.env.NEXT_PUBLIC_DOMAIN}` + response.data.shortUrl);
      setError(""); // Clear any previous error
    } catch (err) {
      console.log("error ", err);
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center mt-40 mb-20">
      <div className="shadow-white p-6 rounded-md shadow-md w-full max-w-lg flex flex-col items-center bg-gray-800">
        <p className="text-center text-2xl font-bold mb-4 text-[#58bc82]">
          Enter the Link
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          placeholder="Your Link"
          className="bg-gray-700 text-white block w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          name="link"
          onChange={(e) => setLink(e.target.value)}
          value={link}
          type="text"
          required
          autoComplete="off"
        />
        {(session?.user?.role === "admin" ||
          session?.user?.role === "subscriber" ||
          session?.user?.role === "user") && (
          <input
            placeholder="Custom Domain"
            className="block w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            name="customDomain"
            onChange={(e) => setCustomDomain(e.target.value)}
            value={customDomain}
            type="text"
            autoComplete="off"
          />
        )}
        {/* <div class="w-[80%] flex items-center justify-center cursor-pointer">
          <div class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group">
            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                class="w-5 h-5 text-green-400"
              >
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
            </span>
            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                class="w-5 h-5 text-green-400"
              >
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
            </span>
            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">
              Button
            </span>
          </div>
        </div> */}

        <button
          onClick={getShortenLink}
          disabled={loading}
          className="mx-auto w-80 h-12 bg-white cursor-pointer rounded-3xl border-2 border-gray-900 shadow-[inset_0px_-2px_0px_1px_#ffffff] group hover:bg-gray-900 transition duration-300 ease-in-out"
        >
          <span className="font-medium text-[#333] group-hover:text-white">
            {loading ? "Loading..." : "SUBMIT"}
          </span>
        </button>
        {shortUrl && (
          <div className="mt-4 flex items-center bg-white p-2 rounded-md">
            <p className="text-gray-800 mr-4">{shortUrl}</p>
            <CopyToClipboard
              text={shortUrl}
              onCopy={() => setCopySuccess("Copied!")}
            >
              <FaRegCopy className="cursor-pointer text-gray-800" />
            </CopyToClipboard>
          </div>
        )}
        {copySuccess && <p className="text-green-500 mt-2">{copySuccess}</p>}
      </div>
    </div>
  );
}

export default LinkInput;
