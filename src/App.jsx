import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import "./styles/global.css";
import { Example } from "./components/Example";
import { Refresh } from "./components/Refresh";
import QuoteCard from "./components/QuoteCard";

const App = () => {
  const [count, setCount] = useState(0);
  return (
     <div className="flex justify-center items-center h-screen overflow-hidden">
        <QuoteCard/>
     </div>
  );
};

export default App;
