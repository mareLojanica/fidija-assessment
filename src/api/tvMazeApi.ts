import axios from "axios";

const api = axios.create({
  baseURL: "https://api.tvmaze.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSchedule = async (date: string = "2025-01-17") => {
  const response = await api.get(`/schedule?country=US&date=${date}`);
  return response.data;
};

export const getShow = async (showId: number) => {
  const response = await api.get(`/shows/${showId}?embed=cast`);
  return response.data;
};
