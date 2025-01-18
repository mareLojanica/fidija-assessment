import React from "react";
import useShowPage from "../hooks/useShowPageHook";
import styles from "./ShowPage.module.scss";
import SuspenseLoader from "../ui-components/SuspenseLoader";
import Header from "../ui-components/Header";

const ShowPage: React.FC = () => {
  const { show, isLoading, error } = useShowPage();

  if (isLoading) return <SuspenseLoader />;
  if (error) return <p className={styles["error"]}>{error}</p>;
  if (!show) return <p className={styles["error"]}>Show not found.</p>;

  return <Header title="TV Blend" />;
};

export default ShowPage;
