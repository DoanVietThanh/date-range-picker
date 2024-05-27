import moment from "moment";
import { CSSProperties, Dispatch, SetStateAction } from "react";
import { DATE_FORMAT, DATE_VALUE_FORMAT, dayHeader } from "../../constanst/days";
import { useMonth } from "../../hooks/useMonth";
import { v4 as uuidv4 } from "uuid";

type MonthCalendarProps = {
  monthValue: number;
  yearValue: number;
  cusColor: string;
  selectedDate: { startDate: string; endDate: string; selectingStartDate: boolean };
  setSelectedDate: Dispatch<
    SetStateAction<{
      startDate: string;
      endDate: string;
      selectingStartDate: boolean;
    }>
  >;
};

const MonthCalendar = ({ monthValue, yearValue, selectedDate, setSelectedDate, cusColor }: MonthCalendarProps) => {
  const { weekList } = useMonth(monthValue, yearValue);

  const activeSelect = (dateValue: number | null, monthValue: number, yearValue: number) => {
    let customStyle: CSSProperties = {};
    if (dateValue === null) return { customStyle };
    const startDate = selectedDate.startDate;
    const endDate = selectedDate.endDate;

    const dateTime = moment(new Date(yearValue, monthValue - 1, dateValue)).format(DATE_FORMAT);
    // Style Current Date
    if (dateTime == moment(new Date()).format(DATE_FORMAT)) {
      customStyle = { borderColor: cusColor, borderWidth: 2 };
    }

    if (startDate || endDate) {
      // Style Ranged Date
      if (dateTime > startDate && dateTime < endDate) {
        customStyle = { ...customStyle, backgroundColor: "#a4c9f1" };
      }
      // Style Start Date, End Date
      if (dateTime == startDate || dateTime == endDate) {
        customStyle = { ...customStyle, backgroundColor: "#1565C0", color: "white" };
      }
    }
    return { customStyle };
  };

  const handleSelectDate = (dateValue: number | null, monthValue: number, yearValue: number) => {
    if (dateValue === null) return;
    const dateTime = moment(new Date(yearValue, monthValue - 1, dateValue)).format(DATE_FORMAT);
    if (dateTime == selectedDate.startDate || dateTime == selectedDate.endDate) return;

    if (selectedDate.selectingStartDate) {
      if (selectedDate.endDate && dateTime > selectedDate.endDate) {
        setSelectedDate({
          startDate: dateTime,
          endDate: "",
          selectingStartDate: false,
        });
        return;
      }
      setSelectedDate((prev) => ({
        ...prev,
        startDate: dateTime,
        selectingStartDate: false,
      }));
    }

    if (!selectedDate.selectingStartDate) {
      if (selectedDate.startDate && dateTime < selectedDate.startDate) {
        setSelectedDate({
          startDate: dateTime,
          endDate: "",
          selectingStartDate: false,
        });
        return;
      }
      setSelectedDate((prev) => ({
        ...prev,
        endDate: dateTime,
        selectingStartDate: true,
      }));
    }
  };

  return (
    <div className="flex-1 w-full bg-slate-200 p-4 rounded-lg overflow-hidden">
      <div className="text-center mb-4 font-semibold text-xl text-orange-700">
        {moment(new Date(yearValue, monthValue - 1)).format(DATE_VALUE_FORMAT)}
      </div>

      <table className="w-full table-fixed">
        <thead>
          <tr>
            {dayHeader.map((day) => (
              <th key={uuidv4()} className="text-center px-2 py-1">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weekList.map((week) => (
            <tr key={uuidv4()}>
              {week.map((day) => {
                const { customStyle } = activeSelect(day, monthValue, yearValue);
                return (
                  <td
                    key={uuidv4()}
                    style={customStyle}
                    onClick={() => handleSelectDate(day, monthValue, yearValue)}
                    className={`text-center px-2 py-1 cursor-pointer hover:bg-blue-300 hover:font-semibold hover:text-white`}
                  >
                    {day !== null ? day : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthCalendar;
