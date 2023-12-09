"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import useRandomInterval from "../../hooks/useRandomInterval";
import Snowflake from "../Snowflake";
import { random, randNumSign } from "../../helpers/functions";
import { v4 as uuidv4 } from "uuid";

export const generateSnowflake = () => {
  const snowflake = {
    id: String(uuidv4()),
    createdAt: Date.now(),
    size: random(10, 20),
    pos: {
      x0: -200,
      x1: random(0, 40) * randNumSign(),
      y: 1200,
    },
    style: {
      top: "-200px",
      left: random(0, 100) + "%",
      animationDelay: random(0, 1000) + "ms",
      animationDuration: random(7000, 10000) + "ms",
      filter: `blur(${random(0, 10) ? "0px" : "1px"})`,
      opacity: random(6, 11) * 0.1,
    },
  };
  return snowflake;
};

const Snowfall = ({ children }) => {
  const [snowflakes, setSnowflakes] = useState([]);

  useRandomInterval(
    () => {
      const now = Date.now();

      // Create a new snowflake
      const snowflake = generateSnowflake();

      // Clean up any expired snowflakes
      const nextSnowflakes = snowflakes.filter((snowflake) => {
        const delta = now - snowflake.createdAt;
        return delta < 10000;
      });

      // Include the new snowflake
      nextSnowflakes.push(snowflake);

      // Update state
      setSnowflakes(nextSnowflakes);
    },
    50,
    1000,
  );

  return (
    <span className={styles.snowfallWrapper}>
      {snowflakes.map((snowflake) => (
        <Snowflake
          key={snowflake.id}
          size={snowflake.size}
          style={snowflake.style}
          pos={snowflake.pos}
        />
      ))}
      {children}
    </span>
  );
};

export default Snowfall;
