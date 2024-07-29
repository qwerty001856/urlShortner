"use client";
import React, { useState } from "react";
import "./style.css"; // Import your CSS file
import Alert from "@/components/error/error";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

function SignUp() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const createUser = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      const response = await axios.post("/api/auth/register", user);
      console.log("response of created user", response);
      if (response.status === 201) {
        setUser({
          userName: "",
          email: "",
          password: "",
        });
        router.push("/login");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="flex justify-center items-center  min-h-fit p-16 flex-col">
      {error && <Alert role={"error"} message={error} />}
      <form className="form" onSubmit={createUser}>
        <span className="input-span">
          <label htmlFor="userName" className="label">
            User Name
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={user.userName}
            onChange={handleChange}
          />
        </span>
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
        {/* <span className="span">
          <a href="#">Forgot password?</a>
        </span> */}
        <button
          className="submit flex justify-center"
          type="submit"
          disabled={isDisabled}
        >
          Sign up
        </button>{" "}
        <span className="span">
          {"Already have an account?"} <Link href="login">Log In</Link>
        </span>
      </form>
    </div>
  );
}

export default SignUp;
