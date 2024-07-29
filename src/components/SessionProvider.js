// "use client";
// import { createContext, useState, useEffect, useContext } from "react";

// const SessionContext = createContext();

// export const SessionProvider = ({ children }) => {
//   const [session, setSession] = useState(null);
//   useEffect(() => {
//     const fetchSession = async () => {
//       const response = await fetch("/api/session", {
//         credentials: "include",
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setSession({ user: data });
//       } else {
//         setSession(null);
//       }
//     };

//     const refreshToken = async () => {
//       console.log("refreshing token");
//       const response = await fetch("/api/auth/refresh", {
//         method: "POST",
//         credentials: "include",
//       });

//       if (response.ok) {
//         fetchSession();
//       }
//     };

//     fetchSession();

//     const interval = setInterval(
//       () => {
//         refreshToken();
//       },
//       // 14 * 60 * 1000
//       3 * 1000
//     ); // Refresh the token every 14 minutes

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <SessionContext.Provider value={{ session, setSession }}>
//       {children}
//     </SessionContext.Provider>
//   );
// };

// export const useSession = () => {
//   return useContext(SessionContext);
// };
// "use client";
// import { createContext, useState, useEffect, useContext } from "react";

// const SessionContext = createContext();

// export const SessionProvider = ({ children }) => {
//   const [session, setSession] = useState(null);
//   const fetchSession = async () => {
//     const response = await fetch("/api/session", {
//       credentials: "include",
//     });
//     if (response.ok) {
//       const data = await response.json();
//       setSession({ user: data });
//     } else {
//       setSession(null);
//     }
//   };

//   const refreshToken = async () => {
//     console.log("refreshing token");
//     const response = await fetch("/api/auth/refresh", {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // body: JSON.stringify({ token: "YOUR_REFRESH_TOKEN" }), // Replace with the actual token
//     });

//     if (response.ok) {
//       fetchSession();
//     }
//   };
//   useEffect(() => {
//     fetchSession();

//     const interval = setInterval(() => {
//       refreshToken();
//       // 14 * 60 * 1000
//       // 2 * 10 * 10
//     }, 14 * 60 * 1000); // Refresh the token every 14 minutes

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <SessionContext.Provider value={{ session, setSession }}>
//       {children}
//     </SessionContext.Provider>
//   );
// };

// export const useSession = () => {
//   return useContext(SessionContext);
// };
////////
////////
////////
////////
////////
////////
////////
"use client";
import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const fetchSession = async () => {
    const response = await fetch("/api/session", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setSession({ user: data });
    } else {
      setSession(null);
    }
  };

  const logout = async () => {
    console.log("inlogout");
    try {
      await axios.post("/api/auth/logout");
      setSession(null); // Clear session state locally
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const refreshToken = async () => {
      // const response = await fetch("/api/auth/refresh", {
      //   method: "POST",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      const response = await axios.post(
        "/api/auth/refresh",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },

          // body: JSON.stringify({ token: "YOUR_REFRESH_TOKEN" }), // Replace with the actual token
        }
      );

      if (response.ok) {
        fetchSession();
      }
    };
    const initializeSession = async () => {
      // Refresh token first
      await refreshToken();

      // Fetch session after token refresh
      fetchSession();
    };

    // Initialize session on component mount
    initializeSession();
    const interval = setInterval(() => {
      refreshToken();
      // 14 * 60 * 1000
      // 2 * 10 * 10
    }, 14 * 60 * 1000); // Refresh the token every 14 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
