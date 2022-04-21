import React, { useState } from "react";
import "./styles/global.css";
import smokeBackground from "./images/smoke3.png";
import QuoteCard from "./components/QuoteCard";
import { motion } from "framer-motion";

const backgroundVariants = {
  initial: {
    scale: 1.5,
  },
  animate: {
    scale: 2.5,
    rotate: 45,
    transition: {
      duration: 30,
    },
    repeat: Infinity,
    repeatMode: "mirror",
  },
};

const App = () => {
  return (
    <div className="flex relative justify-center items-center h-screen overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 ">
      <div className="flex flex-col h-full justify-center items-center gap-8 lg:gap-16 -mt-32 lg:-mt-24">
        <div className="text-center">
          <h1 className="font-ringbearer text-lg lg:text-2xl text-yellow-600">
            Lord of the Rings
          </h1>
          <h2 className="font-cormorant-light text-5xl lg:text-7xl text-white opacity-80">
            Movie Quotes
          </h2>
        </div>
        <QuoteCard />
      </div>
      <motion.img
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        src={smokeBackground}
        className={
          "w-screen h-screen object-center object-cover mix-blend-soft-light bg-blue-200 absolute opacity-70 "
        }
      />
    </div>
  );
};

export default App;
