import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { wrap } from "popmotion";
import quotes from "../data/quotes.json";
import smoke from "../images/smoke2.png";
import useWidth from "../hooks/useWidth";
import { CaretCircleLeft, CaretCircleRight } from "phosphor-react";
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const containerVariants = (screenWidth) => ({
  enter: (direction) => {
    return {
      x: direction < 0 ? -Math.abs(screenWidth) : screenWidth,
      opacity: 0,
      scale: 1.5,
      rotateZ: 20,
      rotateY: -25,
      rotateX: -25,
      transition: {
        duration: 1,
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
      duration: 1.5,
      delay: 1.2,
    },
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? screenWidth : -Math.abs(screenWidth),
      scale: 1.5,
      rotateZ: -20,
      rotateY: 25,
      rotateX: 25,
      transition: {
        duration: 1.2,
        delay: 0.2,
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
        duration: 30,
      },
      duration: 40,
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const imageVariants = {
  initial: { scale: 1.1, opacity: 0.7 },
  animate: {
    opacity: 0.6,
    scale: 1.4,
    transition: {
      duration: 30,
    },
  },
};

const buttonVariants = {
  initial: {
    opacity: 0,
    scale: 1.2,
  },
  animate: {
    opacity: 0.8,
    scale: 1,
    transition: {
      delay: 2.5,
    },
  },
  exit: {
    scale: 1.2,
    opacity: 0,
  },
  hover: {
    scale: 1.2,
    transition: { ease: "easeOut" },
  },
};

const QuoteCard = () => {
  const width = useWidth();
  const swipeConfidenceThreshold = 40000;
  const constraintsRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
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
  console.log(width)
  const dragTransition = { bounceStiffness: 220, bounceDamping: 20 };

  return (
    <div className="relative flex justify-between items-center h-4/5 xs:h-3/5 self-center z-40 w-full px-6">
      <motion.div className="h-full w-full" ref={constraintsRef}>
        <AnimatePresence className={"w-full"} custom={direction}>
          {width > 640 && (
            <NextButton
              key={`${page}next`}
              paginate={paginate}
              disabled={disabled}
            />
          )}
          <motion.div
            key={page}
            custom={direction}
            variants={containerVariants(width + 200)}
            initial="enter"
            animate={"center"}
            exit={"exit"}
            onAnimationStart={(definition) => {
              if (definition === "exit") {
                setDisabled(true);
              }
            }}
            onAnimationComplete={(definition) => {
              if (definition === "center") {
                setDisabled(false);
              }
            }}
            drag
            dragSnapToOrigin
            dragTransition={dragTransition}
            dragMomentum={false}
            onDragEnd={onDragEnd}
            className="w-full max-w-sm mx-auto md:w-96 h-full relative top-0 left-0 bg-gray-700 rounded-sm shadow-xl cursor-pointer overflow-hidden"
          >
            <SmokeLayer />
            <ImageLayer src={quotes[quoteIndex].image} />
            <TextLayer quote={quotes[quoteIndex]} />
          </motion.div>
          {width > 500 && (
            <PrevButton
              key={`${page}prev`}
              paginate={paginate}
              disabled={disabled}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
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
      className="w-full absolute z-50 top-0 left-0 object-bottom object-cover h-full"
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
      className="w-full absolute top-0 left-0 object-top object-cover h-full bg-zinc-500 z-20"
      src={src}
    />
  );
};

const TextLayer = ({ quote }) => {
  return (
    <div className="absolute text-white top-0 left-0 z-30 h-full">
      <div className="flex flex-col justify-between h-full p-6 md:p-7">
        <div>
          <p className="font-cormorant mb-1 text-lg">{quote.movie}</p>
          <p
            className={`font-ringbearer ${
              quote.char.length > 12 ? "text-2xl" : "text-4xl"
            } md:text-3xl`}
          >
            {quote.char}
          </p>
        </div>
        <p
          className={`font-cormorant-light ${
            quote.dialog.length > 350 ? "text-lg" : "text-2xl"
          }  md:text-2xl leading-snug`}
        >
          {quote.dialog}
        </p>
      </div>
    </div>
  );
};

const NextButton = ({ paginate, disabled }) => {
  return (
    <motion.button
      disabled={disabled}
      className="text-xl xs:text-2xl md:text-3xl lg:text-4xl text-white absolute inset-y-0 left-8 sm:left-16 md:left-32 lg:left-48 xl:left-80 2xl:left-96"
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      whileHover={"hover"}
      exit="exit"
      onClick={() => {
        paginate(1);
      }}
    >
      <CaretCircleLeft />
    </motion.button>
  );
};

const PrevButton = ({ paginate, disabled }) => {
  return (
    <motion.button
      disabled={disabled}
      className="text-xl xs:text-2xl md:text-3xl lg:text-4xl text-white absolute inset-y-0 right-8 sm:right-16 md:right-32 lg:right-48 xl:right-80 2xl:right-96"
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={"hover"}
      onClick={() => {
        paginate(-1);
      }}
    >
      <CaretCircleRight />
    </motion.button>
  );
};
export default QuoteCard;
