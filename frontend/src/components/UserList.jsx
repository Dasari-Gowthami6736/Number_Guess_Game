import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import NumberGuessGame from "./NumberGuessGame";
import { SectionWrapper } from "../hoc";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("low");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/game/users");
      const data = await response.json();

      if (response.ok) {
        setUsers(data);
        filterUsers(data, selectedLevel);
      } else {
        console.error("Error fetching users:", data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filterUsers = (usersList, level) => {
    const filtered = usersList
      .filter((user) => user.level === level)
      .sort((a, b) => a.attempts - b.attempts);
    setFilteredUsers(filtered);
  };

  const handleLevelChange = (e) => {
    const newLevel = e.target.value;
    setSelectedLevel(newLevel);
    filterUsers(users, newLevel);
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.3, 0.75)}
      className="flex flex-col items-center bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-2xl mx-auto"
    >
      <motion.h2 variants={textVariant()} className="text-white text-2xl font-bold mb-6">
        Players Leaderboard
      </motion.h2>

      {/* Level Selection */}
      <select
        value={selectedLevel}
        onChange={handleLevelChange}
        className="p-3 mt-6 mb-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="low">Low (1-100)</option>
        <option value="medium">Medium (1-500)</option>
        <option value="high">High (1-1000)</option>
      </select>

      {/* Display Users */}
      <div className="w-full overflow-x-auto">
        {filteredUsers.length === 0 ? (
          <p className="mt-4 text-white text-center">No users found for this level.</p>
        ) : (
          <table className="w-full text-white border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-600 p-2">Email</th>
                <th className="border border-gray-600 p-2">Level</th>
                <th className="border border-gray-600 p-2">Attempts</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="text-center bg-gray-700">
                  <td className="border border-gray-600 p-2">{user.email}</td>
                  <td className="border border-gray-600 p-2 capitalize">{user.level}</td>
                  <td className="border border-gray-600 p-2">{user.attempts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default SectionWrapper(UserList, "user-list");
