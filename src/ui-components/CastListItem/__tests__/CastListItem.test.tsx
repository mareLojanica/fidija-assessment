import React from "react";
import { render, screen } from "@testing-library/react";
import CastListItem from "../";
import "@testing-library/jest-dom";

describe("CastListItem Component", () => {
  const mockActor = {
    person: {
      id: 121,
      name: "Bryan Cranston",
      image: { medium: "https://example.com/image.jpg" },
    },
    character: {
      name: "Walter White",
    },
  };

  test("renders actor's name and character name", () => {
    render(<CastListItem actor={mockActor} />);

    expect(screen.getByTestId("actor-name")).toHaveTextContent(
      "Bryan Cranston"
    );
    expect(screen.getByTestId("character-name")).toHaveTextContent(
      "Walter White"
    );
  });

  test("renders placeholder when actor image is missing", () => {
    const mockActorWithoutImage = {
      ...mockActor,
      person: { ...mockActor.person, image: null },
    };

    render(<CastListItem actor={mockActorWithoutImage} />);

    const placeholder = screen.getByTestId("placeholder-icon");
    expect(placeholder).toBeInTheDocument();
  });
});
