"use client"
import { useState } from "react";
import { signIn } from "../auth";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    await signIn("credentials", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-700 to-gray-950 text-white font-mono">
      <h1 className="fixed top-7 bg-pink-500 font-mono bg-clip-text text-transparent text-6xl">
        Sign In
      </h1>

      <div className="flex flex-col p-4 py-10 border border-gray-300 rounded-xl bg-black">
        <h1 className="text-2xl mb-4 text-gray-400">Sign-In</h1>
        <input
          placeholder="Enter your email"
          className="border mt-4 p-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Enter your password"
          className="border mt-4 p-3 rounded-lg"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <button
          className="mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer"
          onClick={() => signIn("google")}
        >
          Sign In With Google
        </button>
      </div>
    </div>
  );
}
