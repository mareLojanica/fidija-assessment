import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  PropsWithChildren,
} from "react";
import { TVEpisode } from "../types/mazeTvApi.types";
import { mazeTvApi } from "../api/axiosInstance";
import { EPISODES_PER_PAGE } from "../constants";
import { HomepageContext } from "./HomepageContext";

export const HomepageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [data, setData] = useState<TVEpisode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchShowsByDate = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await mazeTvApi.get(`schedule?date=${selectedDate}`);
      setData(data);
      setCurrentPage(0);
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

  const pageCount = useMemo(
    () => Math.ceil(data.length / EPISODES_PER_PAGE),
    [data]
  );

  const paginatedData = useMemo(
    () =>
      data.slice(
        currentPage * EPISODES_PER_PAGE,
        (currentPage + 1) * EPISODES_PER_PAGE
      ),
    [data, currentPage]
  );

  const contextValue = useMemo(
    () => ({
      selectedDate,
      setSelectedDate,
      data: paginatedData,
      isLoading,
      error,
      pageCount,
      currentPage,
      setCurrentPage,
    }),
    [selectedDate, paginatedData, isLoading, error, pageCount, currentPage]
  );

  return (
    <HomepageContext.Provider value={contextValue}>
      {children}
    </HomepageContext.Provider>
  );
};
