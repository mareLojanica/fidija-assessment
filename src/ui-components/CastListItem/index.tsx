import React from "react";
import styles from "./CastListItem.module.scss";
import { CastListItemProps } from "../../types/ui-component.types";
import ResponsiveImage from "../ResponsiveImage";

const CastListItem: React.FC<CastListItemProps> = ({ actor }) => {
  return (
    <li className={styles["cast-list-item"]} data-testid="cast-list-item">
      <article
        aria-labelledby={`actor-${actor.person.id}`}
        className={styles["cast-list-item__article"]}
      >
        <div className={styles["cast-list-item__wrapper"]}>
          <figure
            className={styles["cast-list-item__img-wrapper"]}
            data-testid="img-wrapper"
            aria-labelledby={`actor-${actor.person.id}-figcaption`}
          >
            <ResponsiveImage
              alt={`Portrait of ${actor.person.name}`}
              src={actor.person.image?.medium || ""}
              className={styles["cast-list-item__img"]}
              fallbackComponent={
                <div
                  className={styles["account-icon"]}
                  data-testid="placeholder-icon"
                  role="img"
                  aria-label="No image available"
                />
              }
            />
          </figure>
        </div>

        <div
          className={styles["cast-list-item__details"]}
          data-testid="details"
        >
          <h3
            className={styles["cast-list-item__name"]}
            data-testid="actor-name"
            id={`actor-${actor.person.id}`}
          >
            {actor.person.name}
          </h3>
          <p
            className={styles["cast-list-item__character"]}
            data-testid="character-name"
          >
            {actor.character.name}
          </p>
        </div>
      </article>
    </li>
  );
};

export default CastListItem;
