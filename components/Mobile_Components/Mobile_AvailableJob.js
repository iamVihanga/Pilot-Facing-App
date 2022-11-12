import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Mobile_SidebarHeader from "./Mobile_SidebarHeader";
import { setActiveJob } from "../../redux/activeJobSlice";
import MapComponent from "../MapComponent";
import AcceptJob_DetailsBar from "../Dashboard_Components/AcceptJob_DetailsBar";
import { getSingleJob } from "../../config/supabaseFunctions";

const AvailableJob_Mobile = () => {
  const dispatch = useDispatch();
  const activeJobID = useSelector((state) => state.activeJob.activeJob);
  const [currentJob, setCurrentJob] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActiveJob = async () => {
      try {
        setLoading(true);
        const { data, error } = await getSingleJob(activeJobID);
        if (error) throw new Error("Fetching job details failed !");

        setCurrentJob(data[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    activeJobID !== null && fetchActiveJob();
  }, [activeJobID]);

  const handleBack = () => {
    dispatch(setActiveJob(null));
  };

  return (
    <div
      className={`lg:hidden absolute z-20 top-0 left-0 bg-[#F7F9FA] w-full h-full`}
    >
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <svg
            className="h-12 w-12 animate-spin text-teal-400 text-center"
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
        </div>
      )}

      {!loading && Object.keys(currentJob).length !== 0 && (
        <>
          <Mobile_SidebarHeader
            onBackPress={handleBack}
            centerComponent={
              <div className="flex flex-col items-center">
                <p className="text-sm font-semibold">
                  {currentJob.pilotExpertize}
                </p>
                <p className="text-xs text-gray-400">#{currentJob.id}</p>
                <button
                  className={`px-2 py-1 mt-1 text-[.6rem] font-medium bg-green-100 text-green-500 rounded-md`}
                >
                  {currentJob?.status}
                </button>
              </div>
            }
          />

          <div className="mt-32">
            <div className="m-3 bg-white rounded-xl p-2">
              <div className="">
                <MapComponent
                  center={currentJob.mapData.center}
                  zoom={currentJob.mapData.zoom}
                  polygon={currentJob.mapData.polygon}
                  area={currentJob.area}
                />
              </div>

              <p className=" text-gray-400 mt-5 font-normal text-base break-words">
                {currentJob.address}
              </p>

              <p className=" text-black mt-5 font-normal text-xl break-words">
                <span className="font-semibold">Start Date:</span>{" "}
                {new Date(currentJob.date).toDateString()}
              </p>

              <p className=" text-black mt-5 font-semibold text-lg break-words">
                Customers Notes:
              </p>
              <p className=" text-black mt-2 font-normal text-sm break-words">
                {currentJob.customerNote}
              </p>

              <p className=" text-black mt-6 font-semibold text-lg break-words">
                Customers Details:
              </p>
              <div
                className={`${currentJob.status === "Available" && "blur-sm"}`}
              >
                <p className="text-black mt-3 font-normal text-sm">
                  <span className="font-semibold">Name: </span>
                  {currentJob.customerID.firstName}{" "}
                  {currentJob.customerID.lastName}
                </p>
                <p className="text-black mt-3 font-normal text-sm">
                  <span className="font-semibold">Email Address: </span>
                  {currentJob.customerID.email}
                </p>
                <p className="text-black mt-3 font-normal text-sm">
                  <span className="font-semibold">Phone Number: </span>
                  {currentJob.customerID.phoneNumber}
                </p>
                <p className="text-black mt-3 font-normal text-sm">
                  <span className="font-semibold">Company: </span>
                  {currentJob.customerID.companyName}
                </p>
              </div>

              <div className=" mt-16 mb-7">
                <AcceptJob_DetailsBar jobID={currentJob.id} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AvailableJob_Mobile;
