import { Outlet } from "react-router-dom";
import styles from "./BaseLayout.module.scss";

const BaseLayout: React.FC = () => {
  return (
    <>
      <div className={styles["homepage__gray-background"]}></div>
      <Outlet />
      {/* FOOTER */}
      <footer className={styles["homepage__footer"]}></footer>
    </>
  );
};

export default BaseLayout;
