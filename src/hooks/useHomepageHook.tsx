import { useContext } from "react";
import { HomepageContext } from "../context/HomepageContext";
import { HomepageState } from "../types/poviders.types";

const useHomepage = (): HomepageState => {
  const context = useContext(HomepageContext);
  if (!context) {
    throw new Error("useHomepage must be used within a HomepageProvider");
  }
  return context;
};

export default useHomepage;
