"use client";
import { useState } from "react";
import axios from "axios";
export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const signUp = async () => {
    const res = await axios.post("http://localhost:3000/api/signup", {
      email: email,
      password: password,
    });
    setMsg(res.data.message);
    setTimeout(() => {
      return setMsg("");
    }, 4000);
  };
  const googleSignUp = async () => {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-700 to-gray-950 text-white font-mono">
      <h1 className="fixed top-7 bg-pink-500 font-mono bg-clip-text text-transparent text-6xl">
        Auth
      </h1>

      <div className="flex flex-col p-4 py-10 border border-gray-300 rounded-xl  bg-black ">
        <h1 className="text-2xl mb-4 text-gray-400 ">Sign-Up</h1>
        {msg && (
          <h3 className="bg-green-500 opacity-70 rounded-lg p-3">{msg}</h3>
        )}
        <input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="border mt-4 p-3 rounded-lg"
        ></input>
        <input
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="border mt-4 p-3 rounded-lg"
          type="password"
        ></input>
        <button
          onClick={signUp}
          className="mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer"
        >
          Sign-Up
        </button>
        <button
          className="mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer"
          onClick={googleSignUp}
        >
          Sign-Up With Google
        </button>
      </div>
    </div>
  );
}
