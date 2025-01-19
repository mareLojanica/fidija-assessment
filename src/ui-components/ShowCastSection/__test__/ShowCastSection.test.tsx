import React from "react";
import { render, screen } from "@testing-library/react";
import ShowCastSection from "../";
import "@testing-library/jest-dom";
import { usePagination } from "../../../hooks/usePagination";
jest.mock("../../../hooks/usePagination", () => ({
  usePagination: jest.fn(),
}));

jest.mock("../../CastListItem", () =>
  jest.fn(({ actor }) => (
    <div data-testid="cast-list-item">
      <p>{actor.person.name}</p>
      <p>{actor.character.name}</p>
    </div>
  ))
);

jest.mock("../../Pagination", () =>
  jest.fn(({ currentPage, pageCount, onPageChange }) => (
    <div data-testid="pagination">
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

describe("ShowCastSection Component", () => {
  const mockCast = [
    {
      person: {
        id: 1,
        name: "Bryan Cranston",
        url: "https://example.com/bryan",
        country: { name: "USA", code: "US", timezone: "America/New_York" },
        birthday: "1956-03-07",
        deathday: null,
        gender: "Male",
        image: {
          medium: "https://example.com/bryan-medium.jpg",
          original: "https://example.com/bryan.jpg",
        },
        updated: 1678900000,
        _links: { self: { href: "https://example.com/bryan" } },
      },
      character: {
        id: 101,
        url: "https://example.com/walter-white",
        name: "Walter White",
        image: {
          medium: "https://example.com/walter-medium.jpg",
          original: "https://example.com/walter.jpg",
        },
        _links: { self: { href: "https://example.com/walter-white" } },
      },
      self: false,
      voice: false,
    },
    {
      person: {
        id: 2,
        name: "Aaron Paul",
        url: "https://example.com/aaron",
        country: { name: "USA", code: "US", timezone: "America/Los_Angeles" },
        birthday: "1979-08-27",
        deathday: null,
        gender: "Male",
        image: {
          medium: "https://example.com/aaron-medium.jpg",
          original: "https://example.com/aaron.jpg",
        },
        updated: 1678900001,
        _links: { self: { href: "https://example.com/aaron" } },
      },
      character: {
        id: 102,
        url: "https://example.com/jesse-pinkman",
        name: "Jesse Pinkman",
        image: {
          medium: "https://example.com/jesse-medium.jpg",
          original: "https://example.com/jesse.jpg",
        },
        _links: { self: { href: "https://example.com/jesse-pinkman" } },
      },
      self: false,
      voice: false,
    },
  ];

  beforeEach(() => {
    (usePagination as jest.Mock).mockReturnValue({
      paginatedData: mockCast,
      currentPage: 1,
      pageCount: 2,
      goToNextPage: jest.fn(),
      goToPrevPage: jest.fn(),
      goToPage: jest.fn(),
      setCurrentPage: jest.fn(),
    });
  });

  test("renders cast section title", () => {
    render(<ShowCastSection cast={mockCast} />);

    expect(screen.getAllByText("Starring")[0]).toBeInTheDocument();
  });

  test("renders cast list when data is available", () => {
    render(<ShowCastSection cast={mockCast} />);

    expect(screen.getAllByTestId("cast-list-item")).toHaveLength(2);
    expect(screen.getByText("Bryan Cranston")).toBeInTheDocument();
    expect(screen.getByText("Walter White")).toBeInTheDocument();
    expect(screen.getByText("Aaron Paul")).toBeInTheDocument();
    expect(screen.getByText("Jesse Pinkman")).toBeInTheDocument();
  });

  test("renders 'No cast information available' when cast list is empty", () => {
    (usePagination as jest.Mock).mockReturnValue({
      paginatedData: [],
      currentPage: 1,
      pageCount: 1,
      goToNextPage: jest.fn(),
      goToPrevPage: jest.fn(),
      goToPage: jest.fn(),
      setCurrentPage: jest.fn(),
    });

    render(<ShowCastSection cast={[]} />);

    expect(
      screen.getByText("No cast information available.")
    ).toBeInTheDocument();
  });

  test("renders pagination when more than one page exists", () => {
    render(<ShowCastSection cast={mockCast} />);

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<ShowCastSection cast={mockCast} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
