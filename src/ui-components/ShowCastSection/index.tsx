import React from "react";
import styles from "./ShowCastSection.module.scss";
import Pagination from "../../ui-components/Pagination";
import { ShowCastSectionProps } from "../../types/ui-component.types";
import ShowSection from "../ShowSection";
import { usePagination } from "../../hooks/usePagination";
import CastListItem from "../CastListItem";
import { ACTORS_PER_PAGE } from "../../constants";

const ShowCastSection: React.FC<ShowCastSectionProps> = ({ cast }) => {
  const { paginatedData, currentPage, pageCount, goToPage } = usePagination({
    data: cast,
    itemsPerPage: ACTORS_PER_PAGE,
  });

  return (
    <ShowSection title="Starring">
      <article data-testid="show-cast-section">
        {paginatedData.length > 0 ? (
          paginatedData.map((actor) => (
            <React.Fragment key={actor.person.id}>
              <CastListItem
                actor={{
                  person: {
                    id: actor.person.id,
                    name: actor.person.name,
                    image: actor.person.image,
                  },
                  character: {
                    name: actor.character.name,
                  },
                }}
              />
            </React.Fragment>
          ))
        ) : (
          <p className={styles["cast-list__empty"]}>
            No cast information available.
          </p>
        )}
        {pageCount > 1 && (
          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={goToPage}
          />
        )}
      </article>
    </ShowSection>
  );
};

export default ShowCastSection;
