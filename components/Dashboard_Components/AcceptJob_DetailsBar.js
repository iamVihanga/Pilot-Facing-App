import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

const AcceptJob_DetailsBar = ({ jobID }) => {
  const router = useRouter();
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
    <div className="mt-7">
      <div className="grid grid-cols-3 grid-rows-3 gap-x-5 gap-y-5">
        {arrivalTimesList.map((time) => (
          <button
            key={time.id}
            onClick={() => setArrivalTime(time.text)}
            className={`${
              arrivalTime === time.text ? "bg-primaryTeal" : "bg-primaryBlue"
            } outline-none text-white h-12 rounded-md text-sm`}
          >
            {time.text}
          </button>
        ))}
      </div>

      <button
        className={`mt-5 ${
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

const arrivalTimesList = [
  { id: 1, text: "8:00am" },
  { id: 2, text: "9:00am" },
  { id: 3, text: "10:00am" },
  { id: 4, text: "11:00am" },
  { id: 5, text: "12:00pm" },
  { id: 6, text: "1:00pm" },
  { id: 7, text: "2:00pm" },
  { id: 8, text: "3:00pm" },
  { id: 9, text: "4:00pm" },
];
