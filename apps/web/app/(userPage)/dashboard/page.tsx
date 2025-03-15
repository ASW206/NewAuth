"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import TopBar from "../../../components/top-bar";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

export default function Dashboard() {
  const session = useSession();
  interface Game {
    name: string;
    description?: string;
    team?: string;
  }

  const [games, setGames] = useState<Game[]>([]);
  const [gameOn, setGameOn] = useState(false);
  const [gameName, setGameName] = useState("");
  const [description, setDescription] = useState("");
  const [teamName, setTeamName] = useState("");
  const [msg, setMsg] = useState("");
  function handleGameOn() {
    setGameOn(!gameOn);
  }

  async function sendOff() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/gameLogic/createGame",
        {
          team: teamName,
          name: gameName,
          description: description,
        }
      );
      console.log("Game Created:", response.data);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  }

  async function handleClick() {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/gameLogic/getGames"
      );
      console.log("API Response:", data);
      setGames(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching games:", error);
      setGames([]);
    }
  }

  if (session.status !== "authenticated") {
    return (
      <div>
        <h1>LOADING.....</h1>
        <Link href="/signin">Go to Sign in Page</Link>
      </div>
    );
  }

  return (
    <div className="bg-black text-white font-mono min-h-screen w-full flex flex-col">
      <div className="flex items-center gap-2 p-6 justify-between border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full p-2"
            src={session.data.user?.image || "/default-image.png"}
            alt="User Image"
            width={50}
            height={50}
          />
          <h1>{session.data.user?.name}</h1>
        </div>
        <TopBar />
      </div>

      <div>
        <button
          className="bg-pink-500 p-2 ml-4 rounded-lg hover:bg-pink-700"
          onClick={handleGameOn}
        >
          + Create Game
        </button>
        <button
          className="bg-blue-500 text-white rounded-lg p-2 mt-4 ml-4 hover:bg-blue-700"
          onClick={handleClick}
        >
          Fetch Games
        </button>
      </div>

      {gameOn && (
        <div className="bg-gradient-to-tr rounded-lg from-pink-500 to-purple-500 mt-20 text-center p-6 flex flex-col items-center shadow-lg w-[70%] sm:w-[50%] md:w-[40%] lg:w-[20%] mx-auto">
          <h1 className="text-white text-lg font-semibold mb-4">
            Enter Game Details
          </h1>
          <input
            className="border border-gray-300 rounded-lg mt-2 p-2 w-[80%] text-white outline-none focus:ring-2 focus:ring-white"
            placeholder="Enter Game Name"
            onChange={(e) => setGameName(e.target.value)}
            value={gameName}
          />
          <input
            className="border border-gray-300 rounded-lg mt-4 p-2 w-[80%] text-white outline-none focus:ring-2 focus:ring-white"
            placeholder="Enter Description (Optional)"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <input
            placeholder="Your team name"
            className="border border-gray-300 rounded-lg mt-4 p-2 w-[80%] text-white outline-none focus:ring-2 focus:ring-white"
            onChange={(e) => setTeamName(e.target.value)}
            value={teamName}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg mt-4"
            onClick={sendOff}
          >
            Submit
          </button>
        </div>
      )}

      {/* Displaying Games */}
      <div className="flex justify-end ">
        <div className="p-4 w-[50%] mr-[5%] flex-col mt-8 border-l ">
          {games.length === 0 ? (
            <p className="text-gray-500">No games available.</p>
          ) : (
            games.map((game, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg my-4 bg-gradient-to-br from-cyan-300 to-neutral-800 from-60% to-40% hover:cursor-pointer"
              >
                <h2 className="text-2xl font-bold ">Game Name : {game.name}</h2>
                <p className="text-black">
                  DESCRIPTION : {game.description || "No description available"}
                </p>
                <p className="text-black">Team: {game.team || "N/A"}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
