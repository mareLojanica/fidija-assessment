import React from "react";
import styles from "./CastListItem.module.scss";
import { CastListItemProps } from "../../types/ui-component.types";

const CastListItem: React.FC<CastListItemProps> = ({ actor }) => {
  return (
    <div className={styles["cast-list-item"]}>
      <div className={styles["cast-list-item__img-wrapper"]}>
        {actor.person.image?.medium ? (
          <img
            src={actor.person.image?.medium}
            alt={actor.person.name}
            className={styles["cast-list-item__img"]}
          />
        ) : (
          <div className={styles["account-icon"]} />
        )}
      </div>
      <div className={styles["cast-list-item__details"]}>
        <p className={styles["cast-list-item__name"]}>{actor.person.name}</p>
        <p className={styles["cast-list-item__character"]}>
          {actor.character.name}
        </p>
      </div>
    </div>
  );
};

export default CastListItem;
