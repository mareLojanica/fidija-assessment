import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { PaginationProps } from "../../types/ui-component.types";

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  if (pageCount <= 1) return <></>;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageCount={pageCount}
      marginPagesDisplayed={0}
      pageRangeDisplayed={2}
      onPageChange={({ selected }) => onPageChange(selected)}
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
  );
};

export default Pagination;
