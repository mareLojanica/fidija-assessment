import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TVEpisode } from "../types/mazeTvApi.types";
import { mazeTvApi } from "../api/axiosInstance";
import { usePagination } from "../hooks/usePagination";
import { HomepageContext } from "./HomepageContext";
import { EPISODES_PER_PAGE } from "../constants";

export const HomepageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    () => new Date().toISOString().split("T")[0]
  );
  const [data, setData] = useState<TVEpisode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShowsByDate = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await mazeTvApi.get(`schedule?date=${selectedDate}`);
      setData(data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchShowsByDate();
  }, [fetchShowsByDate]);

  const {
    paginatedData,
    currentPage,
    pageCount,
    goToNextPage,
    goToPrevPage,
    goToPage,
    setCurrentPage,
  } = usePagination({ data, itemsPerPage: EPISODES_PER_PAGE });

  const contextValue = useMemo(
    () => ({
      selectedDate,
      setSelectedDate,
      data: paginatedData,
      isLoading,
      error,
      pageCount,
      currentPage,
      goToNextPage,
      goToPrevPage,
      goToPage,
      setCurrentPage,
    }),
    [
      selectedDate,
      paginatedData,
      isLoading,
      error,
      pageCount,
      currentPage,
      goToNextPage,
      goToPrevPage,
      goToPage,
      setCurrentPage,
    ]
  );

  return (
    <HomepageContext.Provider value={contextValue}>
      {children}
    </HomepageContext.Provider>
  );
};
