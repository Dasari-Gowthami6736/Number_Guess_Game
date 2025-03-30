import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const Overview = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Project Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[20px] max-w-4xl leading-[30px]"
      >
        The <span className="font-semibold text-white">Number Guess Game</span>,{" "}
        {/* <span className="font-semibold text-white">CLIENT_SECRET</span>, and a 
        specific <span className="font-semibold text-white">date (YYYY-MM-DD)</span>. On that day,  */}
        is a fun and interactive game where players try to guess a randomly generated number within a predefined range. The game offers three difficulty levels:
        <ul className="list-disc pl-5 mt-1">
          <li>
            <span className="font-semibold text-white">
              Low Level
            </span>
            : Guess a number between 
            <span className="font-semibold text-white">1 and 100</span>
          </li>
          <li>
            <span className="font-semibold text-white">
              Medium Level
            </span>
            : Guess a number between 
            <span className="font-semibold text-white">
              1 and 500
            </span>
          </li>
          <li>
            <span className="font-semibold text-white">
              High Level
            </span>
            : Guess a number between 
            <span className="font-semibold text-white">
              1 and 1000
            </span>
          </li>
        </ul>
      </motion.p>

          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-4 text-secondary text-[20px] max-w-3xl leading-[30px]"
          >
            <span className="text-white font-bold">How to Play?</span>
          </motion.p>

          <motion.ol
      variants={fadeIn("", "", 0.1, 1)}
      className="mt-2 text-secondary text-[18px] max-w-3xl leading-[28px] list-decimal pl-5"
    >
      <li> Enter your GMail</li>
      <li> Select a difficulty level.</li>
      <li>Log in with your Spotify account.</li>
      <li>The system generates a random number within the chosen range.</li>
      <li>
        Enter your guess, and the game provides feedback:
        <ul className="list-disc pl-5 mt-1">
          <li>
            <span className="font-semibold text-white">
              "Too High" 
            </span>
             if your guess is greater than the target number.
          </li>
          <li>
            <span className="font-semibold text-white">
              "Too Low" 
            </span>
             if your guess is smaller than the target number.
          </li>
          <li>
            <span className="font-semibold text-white">
              "Correct!" 
            </span>
             when you guess the right number.
          </li>
        </ul>
      </li>
      <li>Keep guessing until you find the correct number.</li>
      <li>The game records the number of attempts taken to guess correctly.</li>
      
      
      
    </motion.ol>


      {/* Tilt effect for a visual element (optional) */}
      <div className="mt-10 flex justify-center">
        <Tilt className="xs:w-[250px] w-full">
          <motion.div
            variants={fadeIn("up", "spring", 0.3, 0.75)}
            className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
          >
            <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[180px] flex justify-center items-center flex-col">
              <h3 className="text-white text-[20px] font-bold text-center">
                  Let's play a Game and check your luck
              </h3>
            </div>
          </motion.div>
        </Tilt>
      </div>
    </>
  );
};

export default SectionWrapper(Overview, "overview");
