"use client";
import axios from "axios";
import { useRouter } from "next/navigation"; // 🔥 Use Next.js router

export default function TopBar() {
  const router = useRouter(); // ✅ Initialize router

  const handleSignOut = async () => {
    try {
      await axios.get("/api/signOut"); // 🔥 Call API to sign out
      router.push("/signin"); // ✅ Redirect using Next.js router
    } catch (err) {
      console.error("Sign-out failed", err);
    }
  };

  return (
    <button
      className="bg-blue-600 hover:bg-pink-500 hover:cursor-pointer text-gray-300 p-2 rounded-lg"
      onClick={handleSignOut}
    >
      Sign-Out
    </button>
  );
}
