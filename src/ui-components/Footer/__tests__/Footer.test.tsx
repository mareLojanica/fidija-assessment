import React from "react";
import { render } from "@testing-library/react";
import Footer from "../";
import "@testing-library/jest-dom";

test("Footer component matches snapshot", () => {
  const { asFragment } = render(<Footer />);
  expect(asFragment()).toMatchSnapshot();
});
