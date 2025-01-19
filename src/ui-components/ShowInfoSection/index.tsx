import React from "react";
import styles from "./ShowInfoSection.module.scss";
import { ShowInfoSectionProps } from "../../types/ui-component.types";
import ShowSection from "../ShowSection";

const ShowInfoSection: React.FC<ShowInfoSectionProps> = ({ show }) => {
  const infoData = [
    { label: "Streamed on", value: show.network?.name ?? "Unknown" },
    {
      label: "Schedule",
      value: show.schedule.days.length
        ? show.schedule.days.join(", ")
        : "Not Available",
    },
    { label: "Status", value: show.status },
    {
      label: "Genres",
      value: show.genres.length ? show.genres.join(", ") : "N/A",
    },
  ];

  return (
    <ShowSection title="Show Info">
      <article className={styles["content"]}>
        {infoData.map((info, index) => (
          <div key={index} className={styles["content__item"]}>
            <strong className={styles["content__label"]}>{info.label}:</strong>
            <span className={styles["content__value"]}>{info.value}</span>
          </div>
        ))}
      </article>
    </ShowSection>
  );
};

export default ShowInfoSection;
