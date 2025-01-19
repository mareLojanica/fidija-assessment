import React, { FC } from "react";
import styles from "./ShowSection.module.scss";
import { ShowSectionProps } from "../../types/ui-component.types";

const ShowSection: FC<ShowSectionProps> = ({
  children,
  title,
}): JSX.Element => {
  return (
    <div className={styles["show-info"]}>
      <h2 className={styles["show-info__title"]}>{title}</h2>
      <div className={styles["show-info__content"]}>{children}</div>
    </div>
  );
};

export default ShowSection;
