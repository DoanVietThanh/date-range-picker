import moment from "moment";
import { ChangeEvent, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Separator from "../Separator";
import MonthCalendar from "./month-calendar";
import { SelectedDate } from "../../types/selected-date";
import DateRangeValue from "./date-range-value";

const DateRangePicker = () => {
  const [monthValue, setMonthValue] = useState(new Date().getMonth() + 1);
  const [yearValue, setYearValue] = useState(new Date().getFullYear());
  const [cusColor, setCusColor] = useState<string>(localStorage.getItem("cusColor") || "#00000");
  const [tableName, setTableName] = useState<string>(localStorage.getItem("tableName") || "Custom Date Range Picker");

  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    startDate: "",
    endDate: "",
    selectingStartDate: true,
  });

  const handleIncrementMonth = () => {
    if (monthValue < 12) {
      setMonthValue(monthValue + 2);
    } else {
      setMonthValue(1);
      setYearValue(yearValue + 1);
    }
  };

  const handleDecrementMonth = () => {
    if (monthValue > 1) {
      setMonthValue(monthValue - 2);
    } else {
      setMonthValue(12);
      setYearValue(yearValue - 1);
    }
  };

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const colorValue = e.target.value;
    setCusColor(colorValue);
    localStorage.setItem("cusColor", colorValue);
  };

  const handleChangeTableName = (e: ChangeEvent<HTMLInputElement>) => {
    const newTableName = e.target.value;
    setTableName(newTableName);
    localStorage.setItem("tableName", newTableName);
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center overflow-hidden bg-gray-500">
      <div className="h-[80vh] w-[90vw] rounded-md p-8 bg-white overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">
            <input
              type="text"
              value={tableName}
              placeholder="Enter table name..."
              className="border w-[360px] mr-4 p-2 rounded-md"
              onChange={(e) => handleChangeTableName(e)}
            />
            {moment(new Date()).format("DD/MM/YYYY (dddd)")}
          </div>
          <DateRangeValue selectedDate={selectedDate} />
        </div>
        <div className="h-full flex flex-col justify-between">
          <div className="flex items-center border-t-2 w-full py-4 mt-2 gap-4">
            <FaArrowAltCircleLeft size={40} color="blue" className="cursor-pointer" onClick={handleDecrementMonth} />
            <div className="w-full h-full flex gap-4 justify-between mx-4">
              <MonthCalendar
                monthValue={monthValue}
                yearValue={yearValue}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                cusColor={cusColor}
              />
              <Separator color="gray-500" />
              <MonthCalendar
                monthValue={monthValue == 12 ? 1 : monthValue + 1}
                yearValue={monthValue == 12 ? yearValue + 1 : yearValue}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                cusColor={cusColor}
              />
            </div>
            <FaArrowAltCircleRight size={40} color="blue" className="cursor-pointer" onClick={handleIncrementMonth} />
          </div>

          <div className="mb-4 p-4">
            <div className="flex items-center gap-4">
              <label htmlFor="custom-color" className="cursor-pointer font-semibold text-xl">
                Current Date
              </label>
              <input
                type="color"
                id="custom-color"
                value={cusColor}
                onChange={(e) => handleChangeColor(e)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
