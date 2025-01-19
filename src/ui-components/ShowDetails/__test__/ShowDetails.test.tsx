import React from "react";
import { render, screen } from "@testing-library/react";
import ShowDetails from "../";
import "@testing-library/jest-dom";

jest.mock("../../ShowImage", () =>
  jest.fn(({ image, name }) => (
    <div data-testid="show-image">
      <img src={image?.original || ""} alt={name} />
    </div>
  ))
);

jest.mock("../../StarRating", () =>
  jest.fn(({ rating }) => (
    <div data-testid="star-rating">{`Rating: ${rating} / 10`}</div>
  ))
);

describe("ShowDetails Component", () => {
  const mockShow = {
    image: {
      medium: "https://example.com/show-medium.jpg",
      original: "https://example.com/show.jpg",
    },
    name: "Breaking Bad",
    rating: 9,
    summary: "<p>A high school chemistry teacher turned meth kingpin.</p>",
  };

  test("renders show name", () => {
    render(<ShowDetails {...mockShow} />);

    expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
  });

  test("renders show image using ShowImage component", () => {
    render(<ShowDetails {...mockShow} />);

    const img = screen.getByTestId("show-image").querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/show.jpg");
    expect(img).toHaveAttribute("alt", "Breaking Bad");
  });

  test("renders star rating correctly", () => {
    render(<ShowDetails {...mockShow} />);

    expect(screen.getByTestId("star-rating")).toHaveTextContent(
      "Rating: 9 / 10"
    );
  });

  test("handles missing rating properly", () => {
    render(<ShowDetails {...mockShow} rating={0} />);

    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  test("renders summary with HTML content", () => {
    render(<ShowDetails {...mockShow} />);

    expect(
      screen.getByText("A high school chemistry teacher turned meth kingpin.")
    ).toBeInTheDocument();
  });

  test("renders default summary when summary is missing", () => {
    render(<ShowDetails {...mockShow} summary={"Lorem Ipsum!"} />);

    expect(screen.getByText("Lorem Ipsum!")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<ShowDetails {...mockShow} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
