import styles from "./styles.module.css";

export default function Snowflake({ size, style, pos }) {
  return (
    <span className={styles.snowflakeWrapper} style={style} pos={pos}>
      <svg
        className={styles.snowflakeSvg}
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="200" rx="100" fill="white" />
      </svg>
    </span>
  );
}
