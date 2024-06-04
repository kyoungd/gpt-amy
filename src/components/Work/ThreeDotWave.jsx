import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

export default function ThreeDotWave({ size, color }) {
  const loadingContainer = {
    width: size,
    height: size,
    display: "flex",
    justifyContent: "space-around",
  };

  const loadingCircle = {
    display: "block",
    width: "1rem",
    height: "1rem",
    backgroundColor: color,
    borderRadius: "0.5rem",
  };

  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const loadingCircleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <motion.div
      style={loadingContainer}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
  );
}

ThreeDotWave.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

ThreeDotWave.defaultProps = {
  size: "4rem",
  color: "black",
};