import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClockIcon } from "@heroicons/react/24/outline";
import formatAMPM from "../../utils/formatTime";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

const AcceptJob_DetailsBar = ({ jobID }) => {
  const router = useRouter();
  const [dayStr, setDayStr] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const serverBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_BASEURL ||
    "https://duber-server.herokuapp.com";
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    try {
      setLoading(true);

      console.log(jobID, arrivalTime, currentUser.id);

      const { data } = await axios({
        method: "POST",
        baseURL: serverBaseUrl,
        url: "/pilots/accept-job",
        headers: {},
        data: {
          jobID: jobID,
          arrivalTime: arrivalTime,
          pilotID: currentUser.id,
        },
      });

      setLoading(false);
      if (data.success)
        router.push(
          {
            pathname: `/dashboard/myJobs/${jobID}`,
            query: {
              isNew: true,
            },
          },
          `/dashboard/myJobs/${jobID}`
        );
    } catch (err) {
      setLoading(false);
    }
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
        } rounded-md w-full md:w-fit lg:w-full h-16 md:px-3 flex items-center justify-center`}
        onClick={handleAccept}
        disabled={!arrivalTime || loading}
      >
        {/* Accept Job */}
        <p className="text-2xl text-center text-white uppercase font-medium">
          {!loading ? (
            "Accept Job"
          ) : (
            <svg
              className="h-5 w-5 animate-spin text-white text-center"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </p>
      </button>
    </div>
  );
};

export default AcceptJob_DetailsBar;
