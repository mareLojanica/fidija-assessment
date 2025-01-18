import { createContext } from "react";
import { TVShow } from "../types/mazeTvApi.types";

interface ShowPageState {
  show: TVShow | null;
  isLoading: boolean;
  error: string | null;
  fetchShow: (showId: string) => void;
}

const defaultState: ShowPageState = {
  show: null,
  isLoading: false,
  error: null,
  fetchShow: () => {},
};

export const ShowPageContext = createContext<ShowPageState>(defaultState);
