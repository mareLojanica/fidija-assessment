import { TVEpisode } from "./mazeTvApi.types";

export interface HomepageState {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  data: TVEpisode[];
  isLoading: boolean;
  error: string | null;
  pageCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
