"use client";
import { useContext } from "react";
import { DataContext } from "./context/data";

import styles from "./page.module.css";
import Snowfall from "./components/Snowfall";
import SearchBar from "./components/SearchBar";
import Lights from "./components/Lights";
import XmasTree from "./components/XmasTree";

export default function Home() {
  const { isDarkTheme } = useContext(DataContext);
  const mainStyles = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  return (
    <main className={`${styles.main} ${mainStyles}`}>
      <div className={styles.wrapper}>
        <Snowfall>
          <div className={styles.hero}>
            <Lights />
            <SearchBar />
            <XmasTree />
          </div>
        </Snowfall>
      </div>
    </main>
  );
}
