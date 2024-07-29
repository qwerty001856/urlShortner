// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Loader from "@/components/loader/Loader";
// import { useRouter } from "next/navigation";

// function Redirect({ params }) {
//   const { url } = params; // Assuming 'url' is your dynamic route parameter
//   const [redirectUrl, setRedirectUrl] = useState("");
//   const [error, setError] = useState(false);
//   const router = useRouter();
//   useEffect(() => {
//     async function fetchRedirectUrl() {
//       try {
//         const response = await axios.get(`/api/redirect?url=${url}`); // Adjust API endpoint as per your setup
//         const data = response.data;

//         if (data.redirectUrl) {
//           setRedirectUrl(data.redirectUrl);
//         } else {
//           console.error("URL expired or not found:", data.message);
//           // Handle expired URL scenario (e.g., display an error message)
//         }
//       } catch (error) {
//         console.error("Failed to fetch redirect URL:", error);
//         setError(true);

//         // router.push("/not-found");
//         // return { notFound: true };
//         // Handle error (e.g., show an error message)
//       }
//     }

//     if (url) {
//       fetchRedirectUrl();
//     }
//   }, [url]);

//   useEffect(() => {
//     if (redirectUrl) {
//       window.location.replace(redirectUrl);
//     }
//   }, [redirectUrl]);

//   return (
//     <div className="flex justify-center items-center w-100 h-screen">
//       {error ? "url not found" : <Loader />}
//     </div>
//   );
// }

// export default Redirect;

///////
//////
///////
/////
////
//
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/navigation";

function Redirect({ params }) {
  const { url } = params;
  const [redirectUrl, setRedirectUrl] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let didCancel = false;
    async function fetchRedirectUrl() {
      try {
        const response = await axios.get(`/api/redirect?url=${url}`); // Adjust API endpoint as per your setup
        const data = response.data;
        if (data.redirectUrl && !didCancel) {
          setRedirectUrl(data.redirectUrl);
        } else {
          console.error("URL expired or not found:", data.message);
          setError(true);
        }
      } catch (error) {
        if (!didCancel) {
          console.error("Failed to fetch redirect URL:", error);
          setError(true);
        }
      }
    }
    if (url && !redirectUrl) {
      fetchRedirectUrl();
    }
    return () => {
      didCancel = true;
    };
  }, [url, redirectUrl]);

  useEffect(() => {
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  }, [redirectUrl, router]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      {error ? "URL not found" : <Loader />}
    </div>
  );
}

export default Redirect;
/////
/////
/////
