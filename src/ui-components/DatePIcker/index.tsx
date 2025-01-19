import React from "react";
import { DatePickerProps } from "../../types/ui-component.types";
import styles from "./DatePicker.module.scss";

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <div className={styles["datepicker"]}>
      <label htmlFor="schedule-date" className={styles["datepicker-label"]}>
        Select Date for Schedule:
      </label>
      <input
        type="date"
        id="schedule-date"
        value={selectedDate}
        onChange={(event) => onDateChange(event.target.value)}
        className={styles["datepicker-input"]}
        data-testid="date-input"
      />
    </div>
  );
};

export default DatePicker;
