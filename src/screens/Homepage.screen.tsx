import React from "react";
import useHomepage from "../hooks/useHomepageHook";
import ReactPaginate from "react-paginate";
import styles from "./Homepage.module.scss";
import SuspenseLoader from "../ui-components/SuspenseLoader";
import StarRating from "../ui-components/SuspenseLoader/StarRating";

const Homepage: React.FC = () => {
  const {
    selectedDate,
    setSelectedDate,
    data,
    isLoading,
    pageCount,
    currentPage,
    setCurrentPage,
  } = useHomepage();

  return (
    <div className={styles["homepage"]}>
      {/* HEADER */}
      <header className={styles["homepage__header"]}>
        <div className={styles["homepage__header-content"]}>
          <h1 className={styles["homepage__title"]}>TV Bland</h1>
          <p className={styles["homepage__subtitle"]}>
            TV Show and web series database. <br />
            Create personalised schedules. Episode guide, cast, crew and
            character information.
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className={styles["homepage__content"]}>
        <section className={styles["homepage__shows"]}>
          <div className={styles["homepage__content-row"]}>
            <h2 className={styles["homepage__section-title"]}>
              Last Added Shows
            </h2>

            <div className={styles["homepage__datepicker"]}>
              <label
                htmlFor="schedule-date"
                className={styles["homepage__datepicker-label"]}
              >
                Select Date for Schedule:
              </label>
              <input
                type="date"
                id="schedule-date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className={styles["homepage__datepicker-input"]}
              />
            </div>
          </div>

          {/* LOADING STATE */}
          {isLoading ? (
            <div className={styles["homepage__placeholder-wrapper"]}>
              <SuspenseLoader />
            </div>
          ) : data.length ? (
            <>
              <div className={styles["homepage__grid"]}>
                {data.map((show) => (
                  <article key={show.id} className={styles["show-card"]}>
                    <div className={styles["show-card__image"]}>
                      {show.show.image?.medium ? (
                        <img
                          src={show.show.image.medium}
                          alt={show.name}
                          className={styles["show-card__img"]}
                        />
                      ) : (
                        <div className={styles["show-card__no-image"]}>
                          No Image Available
                        </div>
                      )}
                    </div>
                    <div className={styles["show-card__rating"]}>
                      <StarRating
                        rating={
                          show.rating?.average ?? show.show.rating?.average
                        }
                      />
                    </div>
                    <p className={styles["show-card__title"]}>{show.name}</p>
                  </article>
                ))}
              </div>

              {/* PAGINATION */}
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                previousLabel="< Previous"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                forcePage={currentPage}
                containerClassName={styles["pagination"]}
                pageClassName={styles["pagination__page"]}
                activeClassName={styles["pagination__active"]}
                previousClassName={styles["pagination__prev"]}
                nextClassName={styles["pagination__next"]}
                breakClassName={styles["pagination__break"]}
                pageLinkClassName={styles["pagination__link"]}
                disabledClassName={styles["disabled"]}
              />
            </>
          ) : (
            <div className={styles["homepage__placeholder-wrapper"]}>
              <p>No shows available</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Homepage;
