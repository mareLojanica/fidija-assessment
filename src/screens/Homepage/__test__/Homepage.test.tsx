import React from "react";
import { render, screen } from "@testing-library/react";
import Homepage from "../Homepage.screen";
import "@testing-library/jest-dom";
import useHomepage from "../../../hooks/useHomepageHook";

jest.mock("../../../hooks/useHomepageHook", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../ui-components/SuspenseLoader/", () =>
  jest.fn(() => <div data-testid="suspense-loader">Loading...</div>)
);

jest.mock("../../../ui-components/Header/", () =>
  jest.fn(({ title }) => <header data-testid="header">{title}</header>)
);

jest.mock("../../../ui-components/Main", () =>
  jest.fn(({ children }) => <main data-testid="main">{children}</main>)
);

jest.mock("../../../ui-components/DatePIcker", () =>
  jest.fn(({ selectedDate, onDateChange }) => (
    <div data-testid="date-picker">
      <p>Selected Date: {selectedDate}</p>
      <button onClick={() => onDateChange("2024-01-01")}>Change Date</button>
    </div>
  ))
);

jest.mock("../../../ui-components/ShowCard", () =>
  jest.fn(({ show }) => (
    <div data-testid="show-card">
      <p>{show.name}</p>
    </div>
  ))
);

jest.mock("../../../ui-components/Pagination", () =>
  jest.fn(({ currentPage, pageCount, onPageChange }) => (
    <div data-testid="pagination">
      <p>
        Page {currentPage} of {pageCount}
      </p>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      <button
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  ))
);

describe("Homepage Component", () => {
  beforeEach(() => {
    (useHomepage as jest.Mock).mockReturnValue({
      selectedDate: "2024-01-01",
      setSelectedDate: jest.fn(),
      data: [],
      isLoading: false,
      pageCount: 1,
      currentPage: 1,
      setCurrentPage: jest.fn(),
    });
  });

  test("renders header and main layout", () => {
    render(<Homepage />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("main")).toBeInTheDocument();
  });

  test("renders date picker", () => {
    render(<Homepage />);

    expect(screen.getByTestId("date-picker")).toBeInTheDocument();
    expect(screen.getByText("Selected Date: 2024-01-01")).toBeInTheDocument();
  });

  test("renders loading state", () => {
    (useHomepage as jest.Mock).mockReturnValue({
      selectedDate: "2024-01-01",
      setSelectedDate: jest.fn(),
      data: [],
      isLoading: true,
      pageCount: 1,
      currentPage: 1,
      setCurrentPage: jest.fn(),
    });

    render(<Homepage />);
    expect(screen.getByTestId("suspense-loader")).toBeInTheDocument();
  });

  test("renders show cards when data is available", () => {
    (useHomepage as jest.Mock).mockReturnValue({
      selectedDate: "2024-01-01",
      setSelectedDate: jest.fn(),
      data: [
        {
          id: 1,
          name: "Breaking Bad",
          show: { id: 1, image: { medium: "https://example.com/bb.jpg" } },
          rating: { average: 9.5 },
        },
        {
          id: 2,
          name: "Stranger Things",
          show: { id: 2, image: { medium: "https://example.com/st.jpg" } },
          rating: { average: 8.7 },
        },
      ],
      isLoading: false,
      pageCount: 2,
      currentPage: 1,
      setCurrentPage: jest.fn(),
    });

    render(<Homepage />);
    expect(screen.getAllByTestId("show-card")).toHaveLength(2);
    expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
    expect(screen.getByText("Stranger Things")).toBeInTheDocument();
  });

  test("renders pagination when multiple pages exist", () => {
    (useHomepage as jest.Mock).mockReturnValue({
      selectedDate: "2024-01-01",
      setSelectedDate: jest.fn(),
      data: [
        {
          id: 1,
          name: "Breaking Bad",
          show: { id: 1, image: { medium: "https://example.com/bb.jpg" } },
          rating: { average: 9.5 },
        },
      ],
      isLoading: false,
      pageCount: 2,
      currentPage: 1,
      setCurrentPage: jest.fn(),
    });

    render(<Homepage />);
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });

  test("renders 'No shows available' message when data is empty", () => {
    (useHomepage as jest.Mock).mockReturnValue({
      selectedDate: "2024-01-01",
      setSelectedDate: jest.fn(),
      data: [],
      isLoading: false,
      pageCount: 1,
      currentPage: 1,
      setCurrentPage: jest.fn(),
    });

    render(<Homepage />);
    expect(screen.getByText("No shows available")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<Homepage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
