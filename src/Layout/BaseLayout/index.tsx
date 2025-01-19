import { Outlet } from "react-router-dom";
import styles from "./BaseLayout.module.scss";
import { FC } from "react";
import Footer from "../../ui-components/Footer";

const BaseLayout: FC = (): JSX.Element => {
  return (
    <div className={styles["app-layout"]}>
      <div className={styles["homepage__gray-background"]}></div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default BaseLayout;
