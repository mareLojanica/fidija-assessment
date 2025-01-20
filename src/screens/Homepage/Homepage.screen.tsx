import React from "react";
import useHomepage from "../../hooks/useHomepageHook";
import styles from "./Homepage.module.scss";
import SuspenseLoader from "../../ui-components/SuspenseLoader";
import Header from "../../ui-components/Header";
import Main from "../../ui-components/Main";
import ShowCard from "../../ui-components/ShowCard";
import Pagination from "../../ui-components/Pagination";
import DatePicker from "../../ui-components/DatePIcker";

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
      <Header
        title="TV Blend"
        description={
          <>
            <p>TV Show and web series database.</p>
            <p>
              Create personalized schedules. Episode guide, cast, crew, and
              character information.
            </p>
          </>
        }
      />
      <Main>
        <section className={styles["homepage"]}>
          <div className={styles["homepage__header"]}>
            <h2 className={styles["homepage__title"]}>Last Added Shows</h2>
            <DatePicker
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>

          {isLoading ? (
            <div className={styles["homepage__loader"]}>
              <SuspenseLoader />
            </div>
          ) : data.length ? (
            <>
              <div className={styles["homepage__grid"]}>
                {data.map((show) => (
                  <ShowCard
                    key={`${show.name}_${show.id}`}
                    show={{
                      id: show.show.id,
                      name: show.name,
                      image: show.image?.medium || "",
                      rating: show.rating.average ?? 0,
                    }}
                  />
                ))}
              </div>
              <Pagination
                pageCount={pageCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div className={styles["homepage__empty"]}>
              <p>No shows available</p>
            </div>
          )}
        </section>
      </Main>
    </>
  );
};

export default Homepage;
