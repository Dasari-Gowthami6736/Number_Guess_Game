import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import UserList from "./UserList";

const NumberGuessGame = () => {
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("low");
  const [gameStarted, setGameStarted] = useState(false);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Start guessing...");
  const [attempts, setAttempts] = useState(0);

  const startGame = async () => {
    if (!email.endsWith("@gmail.com")) {
      setMessage("Please enter a valid Gmail address (e.g., example@gmail.com).");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/game/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, level }),
      });

      const data = await response.json();
      if (response.ok) {
        setGameStarted(true);
        setMessage("Game started! Make a guess.");
        setAttempts(0);
        setGuess("");
      } else {
        setMessage(data.message || "Error starting game.");
      }
    } catch (error) {
      console.error("Error starting game:", error);
      setMessage("Failed to connect to server.");
    }
  };

  const handleGuess = async () => {
    const numGuess = parseInt(guess, 10);
    if (isNaN(numGuess)) {
      setMessage("Please enter a valid number.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/game/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, guess: numGuess }),
      });

      const data = await response.json();
      if (response.ok) {
        setAttempts(attempts + 1);
        setMessage(data.message);

        if (data.message.includes("Correct!")) {
          setGameStarted(false);
        }
      } else {
        setMessage(data.message || "Error processing guess.");
      }
    } catch (error) {
      console.error("Error checking guess:", error);
      setMessage("Failed to connect to server.");
    }
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.3, 0.75)}
      className="flex flex-col items-center bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto"
    >
      <motion.h2 variants={textVariant()} className="text-white text-2xl font-bold mb-6">
        Number Guess Game
      </motion.h2>

      <div className="flex flex-col gap-4 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Gmail"
          className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={gameStarted}
        >
          <option value="low">Low (1-100)</option>
          <option value="medium">Medium (1-500)</option>
          <option value="high">High (1-1000)</option>
        </select>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300"
          disabled={gameStarted}
        >
          Start Game
        </motion.button>

        {gameStarted && (
          <>
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter your guess"
              className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGuess}
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300"
            >
              Submit Guess
            </motion.button>
          </>
        )}

        <p className="text-white mt-4">{message}</p>
      </div>
    </motion.div>
  );
};

export default SectionWrapper(NumberGuessGame, "number-guess-game");
