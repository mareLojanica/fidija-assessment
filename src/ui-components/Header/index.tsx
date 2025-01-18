import { FC, ReactNode } from "react";
import styles from "./Header.module.scss";

const Header: FC<{ title: string; children?: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <header className={styles["homepage__header"]}>
      <div className={styles["homepage__header-content"]}>
        <h1 className={styles["homepage__title"]}>{title}</h1>
        <div className={styles["homepage__subtitle"]}>{children}</div>
      </div>
    </header>
  );
};

export default Header;
