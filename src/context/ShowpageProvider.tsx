import React, {
  useState,
  useCallback,
  PropsWithChildren,
  useEffect,
} from "react";
import { ShowPageContext } from "./ShowPageContext";
import { TVShow } from "../types/mazeTvApi.types";
import { mazeTvApi } from "../api/axiosInstance";
import { useParams } from "react-router-dom";

export const ShowPageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { showId } = useParams<string>();
  const [show, setShow] = useState<TVShow | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShow = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await mazeTvApi.get(`/shows/${showId}?embed=cast`);
      setShow(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load show data.");
    } finally {
      setIsLoading(false);
    }
  }, [showId]);

  useEffect(() => {
    fetchShow();
  }, [showId, fetchShow]);

  return (
    <ShowPageContext.Provider value={{ show, isLoading, error, fetchShow }}>
      {children}
    </ShowPageContext.Provider>
  );
};
