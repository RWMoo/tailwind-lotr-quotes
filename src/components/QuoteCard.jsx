import { AnimatePresence, MotionConfig } from "framer-motion";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { wrap } from "popmotion";
import smoke from "../images/smoke.png";
import gandalf from "../images/Aragorn_3.webp";
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const containerVarients = {
  enter: (direction) => {
    return {
      x: direction < 0 ? -2000 : 2000,
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
      x: direction < 0 ? 2000 : -2000,
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
};

const imageVarients = {
  initial: {
    scale: 1.1,
    opacity: 0.9,
  },
  animate: {
    opacity: 0.5,
    rotate: 90,
    scale: 2,
    transition: {
      scale: {
        duration: 10,
      },
      duration: 40,
      yoyo: Infinity,
    },
  },
};

const QuoteCard = () => {
  const data = [1, 2, 3];
  const swipeConfidenceThreshold = 30000;
  const constraintsRef = useRef(null);
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, data.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <motion.div
      className="flex justify-center h-96 w-full"
      ref={constraintsRef}
    >
      <AnimatePresence exitBeforeEnter custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={containerVarients}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            opacity: { duration: 0.2 },
          }}
          drag
          dragSnapToOrigin
          dragTransition={{ bounceStiffness: 10, bounceDamping: 25 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="w-80 h-96 relative top-0 left-0 bg-gray-700 rounded-sm shadow-xl cursor-pointer overflow-hidden"
        >
          <motion.img
            onClick={(e) => {
              e.stopPropagation();
            }}
            draggable={false}
            variants={imageVarients}
            initial={"initial"}
            animate={"animate"}
            className="w-full absolute z-20 top-0 left-0 object-bottom object-cover h-full "
            src={smoke}
          />
          <div className="relative top-0 left-0 w-full h-full bg-gradient-to-br to-gray-900 from-gray-500 opacity-40 z-30 " />
          <motion.img
            onClick={(e) => {
              e.stopPropagation();
            }}
            draggable={false}
            initial={{ scale: 1.1 }}
            animate={{
              scale: 1.4,
              transition: {
                duration: 30,
              },
            }}
            className="w-full absolute top-0 left-0 object-top object-cover h-full "
            src={gandalf}
          />
          <p className="absolute text-2xl text-white top-20 left-20 z-30">
            {imageIndex}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuoteCard;
