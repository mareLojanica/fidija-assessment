import styles from "./SuspenseLoader.module.scss";
const SuspenseLoader = () => {
  return (
    <div className={styles["suspense-loader"]}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default SuspenseLoader;
