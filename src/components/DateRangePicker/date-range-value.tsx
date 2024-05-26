import { SelectedDate } from "../../types/selected-date";
import moment from "moment";
type DateRangeValueProps = {
  selectedDate: SelectedDate;
};

const DateRangeValue = ({ selectedDate }: DateRangeValueProps) => {
  return (
    <p>
      From {selectedDate?.startDate ? moment(selectedDate?.startDate).format("DD/MM/YYYY") : "___"} - To{" "}
      {selectedDate?.endDate ? moment(selectedDate?.endDate).format("DD/MM/YYYY") : "___"}
    </p>
  );
};

export default DateRangeValue;
