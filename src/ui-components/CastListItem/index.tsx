import React from "react";
import styles from "./CastListItem.module.scss";
import { CastListItemProps } from "../../types/ui-component.types";

const CastListItem: React.FC<CastListItemProps> = ({ actor }) => {
  return (
    <div className={styles["cast-list-item"]} data-testid="cast-list-item">
      <div
        className={styles["cast-list-item__img-wrapper"]}
        data-testid="img-wrapper"
      >
        {actor.person.image?.medium ? (
          <img
            src={actor.person.image?.medium}
            alt={actor.person.name}
            className={styles["cast-list-item__img"]}
            data-testid="actor-image"
          />
        ) : (
          <div
            className={styles["account-icon"]}
            data-testid="placeholder-icon"
          />
        )}
      </div>
      <div className={styles["cast-list-item__details"]} data-testid="details">
        <p className={styles["cast-list-item__name"]} data-testid="actor-name">
          {actor.person.name}
        </p>
        <p
          className={styles["cast-list-item__character"]}
          data-testid="character-name"
        >
          {actor.character.name}
        </p>
      </div>
    </div>
  );
};

export default CastListItem;
