import { CSSProperties, Dispatch, SetStateAction } from "react";
import { dayHeader } from "../../constanst/days";
import { useMonth } from "../../hooks/useMonth";
import moment from "moment";
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
  console.log("🚀 ~ MonthCalendar ~ selectedDate:", selectedDate);
  const { weekList } = useMonth(monthValue, yearValue);

  const activeSelect = (dateValue: number | null, monthValue: number, yearValue: number) => {
    let customStyle: CSSProperties = {};
    if (dateValue === null) return { customStyle };
    const startDate = selectedDate.startDate;
    const endDate = selectedDate.endDate;

    const dateTime = moment(new Date(yearValue, monthValue - 1, dateValue)).format("YYYY-MM-DD");
    // Style Current Date
    if (dateTime == moment(new Date()).format("YYYY-MM-DD")) {
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
    const dateTime = moment(new Date(yearValue, monthValue - 1, dateValue)).format("YYYY-MM-DD");
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
        {moment(new Date(yearValue, monthValue - 1)).format("MM/YYYY")}
      </div>

      <table className="w-full table-fixed">
        <thead>
          <tr>
            {dayHeader.map((day) => (
              <th key={day} className="text-center px-2 py-1">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weekList.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                const { customStyle } = activeSelect(day, monthValue, yearValue);
                return (
                  <td
                    key={dayIndex}
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
