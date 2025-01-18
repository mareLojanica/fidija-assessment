import { createContext } from "react";
import { HomepageState } from "../types/poviders.types";

const defaultHomepageState: HomepageState = {
  selectedDate: new Date().toISOString().split("T")[0],
  setSelectedDate: () => {},
  data: [],
  isLoading: false,
  error: null,
  pageCount: 0,
  currentPage: 0,
  setCurrentPage: () => {},
};

export const HomepageContext =
  createContext<HomepageState>(defaultHomepageState);
