import Link from "next/link";

export default function Home(){
  return (
    <div className="bg-black text-white font-mono min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-4">Welcome to the Home Page</h1>
      <Link href="/signin" className="bg-blue-500 p-2 rounded-lg mb-4">Sign In</Link>
      <Link href="/signup" className="bg-blue-500 p-2 rounded-lg ">Sign Up</Link>
    </div>
  )
}