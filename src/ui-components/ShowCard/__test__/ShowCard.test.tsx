import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../../Header";
import "@testing-library/jest-dom";

describe("Header Component", () => {
  test("renders title", () => {
    render(<Header title="TV Blend" />);
    expect(screen.getByText("TV Blend")).toBeInTheDocument();
  });

  test("renders description when provided", () => {
    render(
      <Header
        title="TV Blend"
        description={
          <>
            <p>TV Show and web series database.</p>
            <p>
              Create personalized schedules. Episode guide, cast, crew, and
              character information.
            </p>
          </>
        }
      />
    );

    expect(
      screen.getByText("TV Show and web series database.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Create personalized schedules. Episode guide, cast, crew, and character information."
      )
    ).toBeInTheDocument();
  });

  test("renders showInfo when provided", () => {
    const mockShowInfo = <div data-testid="show-info">Show Details Here</div>;

    render(<Header title="TV Blend" showInfo={mockShowInfo} />);

    expect(screen.getByTestId("show-info")).toBeInTheDocument();
    expect(screen.getByTestId("show-info")).toHaveTextContent(
      "Show Details Here"
    );
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Header
        title="TV Blend"
        description={<p>TV Show and web series database.</p>}
        showInfo={<div data-testid="show-info">Show Details Here</div>}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
