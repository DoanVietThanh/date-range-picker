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
  const { weekList } = useMonth(monthValue, yearValue);

  const activeSelect = (dateValue: number | null, monthValue: number, yearValue: number) => {
    let activeClass: string = "";
    // Tailwind not support dynamic CSS through classname-> use CSSProperties
    let customStyle: CSSProperties = {};

    if (dateValue === null) return { activeClass, customStyle };

    const dateTime = moment(new Date(yearValue, monthValue - 1, dateValue)).format("YYYY-MM-DD");

    if (selectedDate.startDate && selectedDate.endDate) {
      // Style Ranged Date
      if (dateTime >= selectedDate.startDate && dateTime <= selectedDate.endDate) {
        activeClass = "bg-blue-200 font-semibold";
      }

      // Style Start Date, End Date
      if (dateTime == selectedDate.startDate || dateTime == selectedDate.endDate) {
        activeClass += " bg-blue-600 border-2 text-white";
      }

      // Style Current Date
      if (dateTime == moment(new Date()).format("YYYY-MM-DD")) {
        customStyle = { backgroundColor: cusColor, color: "white", border: "2px solid" };
      }
    }

    return { activeClass, customStyle };
  };

  const handleSelectDate = (dateValue: number | null, monthValue: number, yearValue: number) => {
    if (dateValue === null) return;
    const formattedMonth = monthValue.toString().padStart(2, "0");
    const formattedDate = dateValue.toString().padStart(2, "0");
    const dateTime = `${yearValue}-${formattedMonth}-${formattedDate}`;

    if (selectedDate.selectingStartDate) {
      setSelectedDate({
        startDate: dateTime,
        endDate: dateTime,
        selectingStartDate: false,
      });
    } else {
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
                const { activeClass, customStyle } = activeSelect(day, monthValue, yearValue);
                return (
                  <td
                    key={dayIndex}
                    className={`text-center px-2 py-1 border cursor-pointer hover:bg-blue-300 hover:font-semibold ${activeClass}`}
                    style={customStyle}
                    onClick={() => handleSelectDate(day, monthValue, yearValue)}
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
