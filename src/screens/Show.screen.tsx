import React from "react";
import useShowPage from "../hooks/useShowPageHook";
import styles from "./ShowPage.module.scss";
import SuspenseLoader from "../ui-components/SuspenseLoader";
import Header from "../ui-components/Header";
import Main from "../ui-components/Main";
import StarRating from "../ui-components/StarRating";
import { usePagination } from "../hooks/usePagiantion";
import ReactPaginate from "react-paginate";

const ShowPage: React.FC = () => {
  const { show, isLoading, error } = useShowPage();
  const { paginatedData, currentPage, pageCount, goToPage } = usePagination({
    data: show?._embedded?.cast ?? [],
    itemsPerPage: 5,
  });
  if (isLoading) return <SuspenseLoader />;
  if (error) return <p className={styles["error"]}>{error}</p>;
  if (!show) return <p className={styles["error"]}>Show not found.</p>;

  return (
    <>
      <Header
        title="TV Bland"
        showInfo={
          <div className={styles["show__info"]}>
            <div className={styles["show__image"]}>
              {show.image ? (
                <img
                  src={show.image.medium}
                  alt={show.name}
                  className={styles["show__image-img"]}
                />
              ) : (
                <div className={styles["show__image-placeholder"]}>
                  No Image
                </div>
              )}
            </div>
            <div className={styles["show__content"]}>
              <div className={styles["show__rating"]}>
                <StarRating rating={show.rating?.average ?? 0} />
                <span>
                  {show.rating?.average
                    ? `${show.rating.average / 2} / 5`
                    : "N/A"}
                </span>
              </div>
              <h1 className={styles["show__title"]}>{show.name}</h1>
              <p
                className={styles["show__summary"]}
                dangerouslySetInnerHTML={{
                  __html: show.summary ?? "No summary available.",
                }}
              />
            </div>
          </div>
        }
      />
      <Main>
        <section className={styles["show"]}>
          <section className={styles["show-details"]}>
            <div className={styles["show-details__section"]}>
              <div className={styles["show-section"]}>
                <h2 className={styles["show-section__title"]}>Show Info</h2>
                <div className={styles["show-section__content"]}>
                  {[
                    {
                      label: "Streamed on",
                      value: show.network?.name ?? "Unknown",
                    },
                    {
                      label: "Schedule",
                      value: show.schedule.days.length
                        ? show.schedule.days.join(", ")
                        : "Not Available",
                    },
                    { label: "Status", value: show.status },
                    {
                      label: "Genres",
                      value: show.genres.length
                        ? show.genres.join(", ")
                        : "N/A",
                    },
                  ].map((info, index) => (
                    <div
                      key={index}
                      className={styles["show-section__content__item"]}
                    >
                      <strong>{info.label}:</strong> <span>{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles["show-details__section"]}>
              <div className={styles["show-section"]}>
                <h2 className={styles["show-section__title"]}>Starring</h2>
                <div className={styles["cast-list"]}>
                  <div className={styles["cast-list__content"]}>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((actor) => (
                        <div
                          key={actor.person.id}
                          className={styles["cast-list__item"]}
                        >
                          <img
                            src={
                              actor.person.image?.medium ??
                              "avatar-placeholder.jpg"
                            }
                            alt={actor.person.name}
                            className={styles["cast-list__img"]}
                          />
                          <div className={styles["cast-list__details"]}>
                            <p className={styles["cast-list__name"]}>
                              {actor.person.name}
                            </p>
                            <p className={styles["cast-list__character"]}>
                              {actor.character.name}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className={styles["cast-list__empty"]}>
                        No cast information available.
                      </p>
                    )}
                    {pageCount > 1 && (
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next >"
                        previousLabel="< Previous"
                        pageCount={pageCount}
                        marginPagesDisplayed={0}
                        pageRangeDisplayed={2}
                        onPageChange={({ selected }) => goToPage(selected)}
                        forcePage={currentPage}
                        containerClassName={styles["pagination"]}
                        pageClassName={styles["pagination__page"]}
                        activeClassName={styles["pagination__active"]}
                        previousClassName={styles["pagination__prev"]}
                        nextClassName={styles["pagination__next"]}
                        breakClassName={styles["pagination__break"]}
                        pageLinkClassName={styles["pagination__link"]}
                        disabledClassName={styles["pagination__disabled"]}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </Main>
    </>
  );
};

export default ShowPage;
