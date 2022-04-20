import { AnimatePresence, MotionConfig } from "framer-motion";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { wrap } from "popmotion";
import smoke from "../images/smoke.png";
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const containerVarients = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1500,
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
      x: direction < 0 ? 1000 : -1500,
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
  enter: () => {
    return {
      opacity: 0.7,
      scale: 1.5,
      transition: {
        duration: 2,
      },
    };
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
    },
  },
  exit: () => {
    return {
      opacity: 0.7,
      scale: 1.5,

      transition: {
        duration: 2,
      },
    };
  },
};

const QuoteCard = () => {
  const data = [1, 2, 3];
  const swipeConfidenceThreshold = 20000;
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
      <AnimatePresence exitBeforeEnter initial={false} custom={direction}>
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
          dragElastic={0.2}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="w-1/2 h-56 bg-gradient-to-br from-zinc-700 to-zinc-900 opacity-70 rounded-sm shadow-lg overflow-hidden"
        >
          <motion.img
            onClick={(e) => {
              e.stopPropagation();
            }}
            draggable={false}
            initial={{ scale: 2, opacity: 0.7 }}
            animate={{
              opacity: 0.2,
              rotate: 180,
              scale: 3.5,
              transition: {
                scale: {
                  duration: 10
                },
                duration: 30,
              },
            }}
            className="w-full object-bottom object-cover h-full "
            src={smoke}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuoteCard;
