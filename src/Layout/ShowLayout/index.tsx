import React from "react";
import { Outlet } from "react-router-dom";
import { ShowPageProvider } from "../../context/ShowpageProvider";

const SingleShowLayout: React.FC = (): JSX.Element => {
  return (
    <ShowPageProvider>
      <Outlet />
    </ShowPageProvider>
  );
};

export default SingleShowLayout;
