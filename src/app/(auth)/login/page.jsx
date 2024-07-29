"use client";
import React, { useState } from "react";
import "./style.css";
import { useRouter } from "next/navigation";
import Alert from "@/components/error/error";
import Link from "next/link";
import axios from "axios";
import { useSession } from "@/components/SessionProvider";

function LogIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { setSession } = useSession();

  const router = useRouter();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const logInUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.data.id) {
        throw new Error("Login failed");
      }
      setSession({
        user: {
          id: response.data.id,
          email: response.data.email,
          role: response.data.role,
        },
      });
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-fit p-16 flex-col">
      {error && (
        <Alert role={"error"} message={"Please check your credentials."} />
      )}
      <form className="form" onSubmit={logInUser}>
        <span className="input-span">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleChange}
          />
        </span>
        <span className="input-span">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={user.password}
            onChange={handleChange}
          />
        </span>
        <button
          className="submit flex justify-center"
          type="submit"
          disabled={isDisabled}
        >
          Log In
        </button>
        <span className="span">
          {"Don't have an account?"} <Link href="signup">Sign Up</Link>
        </span>
      </form>
    </div>
  );
}

export default LogIn;
