import React from "react";
import { render, screen } from "@testing-library/react";
import ShowInfoSection from "../";
import "@testing-library/jest-dom";

describe("ShowInfoSection Component", () => {
  const mockShowInfo = {
    network: "RTS",
    schedule: ["Ponedeljak", "Utorak", "Sreda", "Cetvrtak", "Petak"],
    status: "Daje se",
    genres: ["Najbolja Serija Ikada"],
  };
  test("renders all show information correctly", () => {
    render(<ShowInfoSection {...mockShowInfo} />);

    expect(screen.getByText("Streamed on:")).toBeInTheDocument();
    expect(screen.getByText("RTS")).toBeInTheDocument();

    expect(screen.getByText("Schedule:")).toBeInTheDocument();
    expect(
      screen.getByText("Ponedeljak, Utorak, Sreda, Cetvrtak, Petak")
    ).toBeInTheDocument();

    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("Daje se")).toBeInTheDocument();

    expect(screen.getByText("Genres:")).toBeInTheDocument();
    expect(screen.getByText("Najbolja Serija Ikada")).toBeInTheDocument();
  });

  test("handles missing network information", () => {
    render(<ShowInfoSection {...mockShowInfo} network={undefined} />);

    expect(screen.getByText("Streamed on:")).toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  test("handles missing schedule", () => {
    render(<ShowInfoSection {...mockShowInfo} schedule={[]} />);

    expect(screen.getByText("Schedule:")).toBeInTheDocument();
    expect(screen.getByText("Not Available")).toBeInTheDocument();
  });

  test("handles missing genres", () => {
    render(<ShowInfoSection {...mockShowInfo} genres={[]} />);

    expect(screen.getByText("Genres:")).toBeInTheDocument();
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<ShowInfoSection {...mockShowInfo} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
