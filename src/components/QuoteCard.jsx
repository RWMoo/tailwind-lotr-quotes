import { AnimatePresence, MotionConfig } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { wrap } from "popmotion";
import quotes from "../data/quotes.json";
import smoke from "../images/smoke2.png";
import gandalf from "../images/Aragorn_3.webp";
import useWidth from "../hooks/useWidth";

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const containerVariants = (screenWidth) => ({
  enter: (direction) => {
    return {
      x: direction < 0 ? -Math.abs(screenWidth) : screenWidth,
      opacity: 0.7,
      scale: 1.5,
      rotateZ: 20,
      rotateY: -25,
      rotateX: -25,
      transition: {
        duration: 2,
      },
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateZ: 0,
    rotateY: 0,
    rotateX: 0,
    transition: {
      duration: 2,
    },
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? screenWidth : -Math.abs(screenWidth),
      opacity: 0.7,
      scale: 1.5,
      rotateZ: -20,
      rotateY: 25,
      rotateX: 25,
      transition: {
        duration: 2,
      },
    };
  },
});

const smokeVariants = {
  initial: {
    scale: 2.5,
    opacity: 0.2,
  },
  animate: {
    opacity: 0,
    rotate: 120,
    scale: 3.5,
    transition: {
      scale: {
        duration: 20,
      },
      duration: 40,
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const imageVariants = {
  initial: { scale: 1.1 },
  animate: {
    scale: 1.4,
    transition: {
      duration: 30,
    },
  },
};

const QuoteCard = () => {
  const width = useWidth();
  const swipeConfidenceThreshold = 40000;
  const constraintsRef = useRef(null);
  const [[page, direction], setPage] = useState([0, 0]);
  const quoteIndex = wrap(0, quotes.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const onDragEnd = (_, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const transition = {
    opacity: { duration: 0.2 },
  };

  const dragTransition = { bounceStiffness: 220, bounceDamping: 20 };

  return (
    <motion.div
      className="flex justify-center h-96 w-full"
      ref={constraintsRef}
    >
      <AnimatePresence exitBeforeEnter custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={containerVariants(width)}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          drag
          dragSnapToOrigin
          dragTransition={dragTransition}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={onDragEnd}
          className="w-80 h-96 relative top-0 left-0 bg-gray-700 rounded-sm shadow-xl cursor-pointer overflow-hidden"
        >
          <Overlay />
          <SmokeLayer />
          <ImageLayer src={quotes[quoteIndex].image} />
          <TextLayer quote={quotes[quoteIndex]} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const Overlay = () => {
  return (
    <div className="relative top-0 left-0 w-full h-full bg-gradient-to-br to-gray-900 from-gray-500 opacity-40 z-30" />
  );
};

const SmokeLayer = () => {
  return (
    <motion.img
      onClick={(e) => {
        e.stopPropagation();
      }}
      draggable={false}
      variants={smokeVariants}
      initial={"initial"}
      animate={"animate"}
      className="w-full absolute z-30 top-0 left-0 object-bottom  object-cover h-full"
      src={smoke}
    />
  );
};

const ImageLayer = ({ src }) => {
  return (
    <motion.img
      onClick={(e) => {
        e.stopPropagation();
      }}
      draggable={false}
      variants={imageVariants}
      initial="initial"
      animate="animate"
      className="w-full absolute top-0 left-0 object-top object-cover h-full "
      src={src}
    />
  );
};

const TextLayer = ({ quote }) => {
  return (
    <div className="absolute text-white top-0 left-0 z-30 h-full">
      <div className="flex flex-col justify-between h-full p-8">
        <div>
          <p className="font-cormorant mb-2">{quote.movie}</p>
          <p className="font-ringbearer text-3xl">{quote.char}</p>
        </div>

        <p className="font-cormorant-light text-xl leading-snug">{quote.dialog}</p>
      </div>
    </div>
  );
};

export default QuoteCard;
