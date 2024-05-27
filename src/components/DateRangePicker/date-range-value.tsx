import moment from "moment";
import { DATE_VALUE_FORMAT } from "../../constanst/days";
import { SelectedDate } from "../../types/selected-date";
type DateRangeValueProps = {
  selectedDate: SelectedDate;
};

const DateRangeValue = ({ selectedDate }: DateRangeValueProps) => {
  return (
    <p>
      From {selectedDate?.startDate ? moment(selectedDate?.startDate).format(DATE_VALUE_FORMAT) : "___"} - To{" "}
      {selectedDate?.endDate ? moment(selectedDate?.endDate).format(DATE_VALUE_FORMAT) : "___"}
    </p>
  );
};

export default DateRangeValue;
