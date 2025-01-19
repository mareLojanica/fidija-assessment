import React from "react";
import { render, screen } from "@testing-library/react";
import ShowPage from "../ShowPage.screen";
import "@testing-library/jest-dom";
import useShowPage from "../../../hooks/useShowPageHook";

jest.mock("../../../hooks/useShowPageHook", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../ui-components/SuspenseLoader", () => () => (
  <div data-testid="suspense-loader">Loading...</div>
));

jest.mock("../../../ui-components/Header", () =>
  jest.fn(({ title }) => <header data-testid="header">{title}</header>)
);

jest.mock("../../../ui-components/Main", () =>
  jest.fn(({ children }) => <main data-testid="main">{children}</main>)
);

jest.mock("../../../ui-components/ShowDetails", () =>
  jest.fn(({ image, name, rating, summary }) => (
    <div data-testid="show-details">
      <img src={image?.original || ""} alt={name} />
      <p>{name}</p>
      <p>{rating}</p>
      <p>{summary}</p>
    </div>
  ))
);

jest.mock("../../../ui-components/ShowInfoSection", () =>
  jest.fn(({ network, genres, status, schedule }) => (
    <div data-testid="show-info-section">
      <p>{network}</p>
      <p>{genres?.join(", ")}</p>
      <p>{status}</p>
      <p>{schedule?.join(", ")}</p>
    </div>
  ))
);

jest.mock("../../../ui-components/ShowCastSection", () =>
  jest.fn(({ cast }) => (
    <div data-testid="show-cast-section">
      {cast.length ? <p>Cast Available</p> : <p>No Cast</p>}
    </div>
  ))
);

describe("ShowPage Component", () => {
  beforeEach(() => {
    (useShowPage as jest.Mock).mockReturnValue({
      show: null,
      isLoading: false,
      error: null,
    });
  });

  test("renders header", () => {
    render(<ShowPage />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test("renders loading state", () => {
    (useShowPage as jest.Mock).mockReturnValue({
      show: null,
      isLoading: true,
      error: null,
    });

    render(<ShowPage />);
    expect(screen.getByTestId("suspense-loader")).toBeInTheDocument();
  });

  test("renders error message when there is an error", () => {
    (useShowPage as jest.Mock).mockReturnValue({
      show: null,
      isLoading: false,
      error: "Network Error",
    });

    render(<ShowPage />);
    expect(screen.getByText("Ooops something went wrong!")).toBeInTheDocument();
  });

  test("renders 'Show not found' message when no show is available", () => {
    (useShowPage as jest.Mock).mockReturnValue({
      show: null,
      isLoading: false,
      error: null,
    });

    render(<ShowPage />);
    expect(screen.getByText("Show not found.")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<ShowPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
