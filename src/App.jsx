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
    repeatType: "mirror",
  },
};

const titleVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: -50
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0
  }
}

const App = () => {
  return (
    <div className="flex relative flex-col justify-center items-center h-screen overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
      <div className="absolute top-8 inset-x-0 text-center">
        <motion.h1 variants={titleVariants} initial="initial" animate="animate" transition={{
          duration: 1.5,
        }} className="font-ringbearer text-base xs:text-lg xs:mt-8 lg:text-2xl text-yellow-600">
          Lord of the Rings
        </motion.h1>
        <h2 className="font-cormorant-light text-4xl xs:text-5xl lg:text-7xl text-white opacity-80">
          Movie Quotes
        </h2>
      </div>
      <div className="flex h-full w-full justify-center mt-8 xl:mt-16 2xl:mt-32">
        <QuoteCard />
      </div>
      <motion.img
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        src={smokeBackground}
        draggable={false}
        className={
          "w-screen h-screen object-center object-cover mix-blend-soft-light bg-blue-200 absolute opacity-70 "
        }
      />
    </div>
  );
};

export default App;
