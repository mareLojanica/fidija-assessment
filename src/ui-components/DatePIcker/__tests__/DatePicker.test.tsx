import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DatePicker from "../";
import "@testing-library/jest-dom";
import { DatePickerProps } from "../../../types/ui-component.types";

describe("DatePicker Component", () => {
  const mockOnDateChange = jest.fn();

  const renderComponent = (props: Partial<DatePickerProps> = {}) => {
    render(
      <DatePicker
        selectedDate={props.selectedDate || "2024-01-01"}
        onDateChange={props.onDateChange || mockOnDateChange}
      />
    );
  };

  test("renders DatePicker component with label and input field", () => {
    renderComponent();

    const dateInput = screen.getByLabelText("Select Date for Schedule:");
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveValue("2024-01-01");
  });

  test("calls onDateChange when a new date is selected", () => {
    renderComponent();

    const input = screen.getByLabelText("Select Date for Schedule:");
    fireEvent.change(input, { target: { value: "2024-02-15" } });

    expect(mockOnDateChange).toHaveBeenCalledTimes(1);
    expect(mockOnDateChange).toHaveBeenCalledWith("2024-02-15");
  });

  test("renders the correct initial date", () => {
    renderComponent({ selectedDate: "2023-12-25" });

    const input = screen.getByLabelText("Select Date for Schedule:");
    expect(input).toHaveValue("2023-12-25");
  });
});
