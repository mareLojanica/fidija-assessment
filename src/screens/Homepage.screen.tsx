import React from "react";
import useHomepage from "../hooks/useHomepageHook";
import ReactPaginate from "react-paginate";
import styles from "./Homepage.module.scss";
import SuspenseLoader from "../ui-components/SuspenseLoader";
import { Link } from "react-router-dom";
import StarRating from "../ui-components/StarRating";
import Header from "../ui-components/Header";
import Main from "../ui-components/Main";

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
    <>
      <Header title="TV Blend">
        {
          <>
            <p>TV Show and web series database. </p>
            <p>
              Create personalized schedules. Episode guide, cast, crew and
              character information.
            </p>
          </>
        }
      </Header>
      <Main>
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
                  <article key={show.id}>
                    <Link to={`/show/${show.show.id}`}>
                      <div className={styles["show-card"]}>
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
                        <p className={styles["show-card__title"]}>
                          {show.name}
                        </p>
                      </div>
                    </Link>
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
      </Main>
    </>
  );
};

export default Homepage;
