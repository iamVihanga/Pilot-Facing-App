import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClockIcon } from "@heroicons/react/24/outline";
import formatAMPM from "../../utils/formatTime";

const AcceptJob_DetailsBar = () => {
  const [dayStr, setDayStr] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);

  const handleAccept = () => {
    console.log("accepted");
  };

  return (
    <div>
      <div className=" bg-primaryBlueLight rounded-md flex items-center px-3">
        <DatePicker
          selected={dayStr}
          onChange={(date) => {
            setDayStr(date);
            setArrivalTime(formatAMPM(date));
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Select Arrival Time"
          dateFormat="h:mm aa"
          placeholderText="Select Arrival Time"
          className=" text-primaryBlue py-2 w-full font-[400] bg-transparent outline-none cursor-pointer placeholder:text-primaryBlue"
        />
        <ClockIcon className="w-5 h-5 text-primaryBlue" strokeWidth={2} />
      </div>

      <button
        className={`mt-3 ${
          arrivalTime
            ? "bg-primaryTeal cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        } rounded-md sm:w-full lg:w-full h-16 md:w-fit`}
        onClick={handleAccept}
        disabled={!arrivalTime}
      >
        {/* Accept Job */}
        <p className="text-2xl text-center text-white uppercase font-medium">
          Accept Job
        </p>
      </button>
    </div>
  );
};

export default AcceptJob_DetailsBar;
