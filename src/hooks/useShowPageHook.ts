import { useContext } from "react";
import { ShowPageContext } from "../context/ShowPageContext";

export const useShowPage = () => {
  const context = useContext(ShowPageContext);
  if (!context) {
    throw new Error("useShowPage must be used within a ShowPageProvider");
  }
  return context;
};

export default useShowPage;
