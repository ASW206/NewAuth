"use client";
import { signInWithCredentials } from "../auth/actions";
import { googleSignin } from "../auth/actions";
import { useState } from "react";
export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-700 to-gray-950 text-white font-mono">
      <h1 className="fixed top-7 bg-black hover:bg-pink-500 font-mono bg-clip-text text-transparent text-6xl">
        Auth
      </h1>

      <div className="flex flex-col p-4 py-10 border border-gray-300 rounded-xl bg-black">
        <h1 className="text-2xl mb-4 text-gray-400">Sign-In</h1>
        <input
          placeholder="Enter your email"
          className="border mt-4 p-3 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          placeholder="Enter your password"
          className="border mt-4 p-3 rounded-lg"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          className="mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-pink-500 hover:cursor-pointer"
          onClick={() => signInWithCredentials(email, password)}
        >
          Sign-In
        </button>
        <button
          className="mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-pink-500 hover:cursor-pointer"
          onClick={googleSignin}

         >
          Sign-In With Google
        </button>
      </div>
    </div>
  );
}