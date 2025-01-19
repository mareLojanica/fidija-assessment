import React from "react";
import useShowPage from "../../hooks/useShowPageHook";
import styles from "./ShowPage.module.scss";
import SuspenseLoader from "../../ui-components/SuspenseLoader";
import Header from "../../ui-components/Header";
import Main from "../../ui-components/Main";
import ShowInfoSection from "../../ui-components/ShowInfoSection";
import ShowCastSection from "../../ui-components/ShowCastSection";
import ShowDetails from "../../ui-components/ShowDetails";

const ShowPage: React.FC = () => {
  const { show, isLoading, error } = useShowPage();

  return (
    <>
      <Header
        title="TV Blend"
        showInfo={
          show && (
            <ShowDetails
              image={show.image}
              name={show.name}
              rating={show.rating?.average ?? 0}
              summary={show.summary}
            />
          )
        }
      />
      <Main>
        {isLoading && <SuspenseLoader />}
        {error && (
          <p className={styles["placeholder"]}>Ooops something went wrong!</p>
        )}
        {!isLoading && !error && show ? (
          <div className={styles["show__details"]}>
            <ShowInfoSection
              network={show.network?.name}
              genres={show.genres}
              status={show.status}
              schedule={show.schedule.days}
            />
            <ShowCastSection cast={show?._embedded?.cast ?? []} />
          </div>
        ) : (
          !isLoading &&
          !error && <p className={styles["placeholder"]}>Show not found.</p>
        )}
      </Main>
    </>
  );
};

export default ShowPage;
