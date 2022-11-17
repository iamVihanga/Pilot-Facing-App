import React, { useEffect, useState } from "react";
import {
  DashboardLayout,
  MapComponent,
  Mobile_SidebarHeader,
  FullScreenLoading,
} from "../../../components";
import { useRouter } from "next/router";
import {
  ArrowRightIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import formatBytes from "../../../utils/formatBytes";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { setActiveJob } from "../../../redux/activeJobSlice";
import { getSingleJob, completeJob } from "../../../config/supabaseFunctions";
import axios from "axios";

const SinglePage = () => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
  } = useDropzone();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showNotification, setShowNotification] = useState(router.query?.isNew);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(null);
  const [notificationText, setNotificationText] = useState(
    router.query?.isNew ? "Job Accepted Successfully !" : null
  );

  const activeJobID = router.query.id;
  const [currentJob, setCurrentJob] = useState({});

  // Fetch active job function -> this used in effect and time which needs to refetch data
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

  useEffect(() => {
    fetchActiveJob();
  }, []);

  // Upload effect
  useEffect(() => {
    if (acceptedFiles.length !== 0) {
      acceptedFiles.map((file) => {
        setUploadedFiles((arr) => [...arr, file]);
      });
    }
  }, [acceptedFiles]);

  // Drop zone files
  const files = uploadedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {formatBytes(file.size)}
    </li>
  ));

  // Navigation back button handler
  const handleBackNavigate = () => {
    dispatch(setActiveJob(null));
    router.back();
  };

  // Handle submit
  const handleSubmit = async () => {
    try {
      setError(null);
      setUploading("Uploading Files...");
      const res = await completeJob(uploadedFiles, currentJob.id);

      // backend request for complete job
      setUploading("Completing Job...");
      // --------------------------------------
      const serverUrl =
        process.env.NEXT_PUBLIC_BACKEND_BASEURL ||
        "https://duber-server.herokuapp.com/";

      const { data } = await axios({
        method: "POST",
        baseURL: serverUrl,
        url: `/pilots/complete-job`,
        headers: {},
        data: {
          jobID: currentJob.id,
          assetsList: res,
        },
      });

      setNotificationText(data.message);
      setShowNotification(true);
      setUploading(null);

      fetchActiveJob();
    } catch (err) {
      setError(err.message);
      setUploading(null);
    }
  };

  return (
    <>
      {/* --------------Notification-------------- */}
      {!loading && showNotification && (
        <div className="fixed z-40 sm:right-4 sm:top-6 top-28 right-2 py-3 px-4 bg-teal-200 rounded-md flex items-center justify-between shadow-lg shadow-emerald-200 border border-teal-300">
          <div className="mr-8 flex items-center">
            <div className="w-8 h-8 rounded-md bg-teal-300 flex items-center justify-center mr-3">
              <CheckIcon className="w-5 h-5 text-teal-500" strokeWidth={3} />
            </div>

            <p className="text-teal-600">{notificationText}</p>
          </div>
          <XMarkIcon
            onClick={() => setShowNotification(false)}
            className="cursor-pointer w-5 h-5 text-teal-600"
          />
        </div>
      )}
      {/* ----------------------------------------- */}

      {loading && <FullScreenLoading />}

      {!loading && Object.keys(currentJob) !== 0 && (
        <DashboardLayout
          headerComponent={
            <Mobile_SidebarHeader
              onBackPress={handleBackNavigate}
              centerComponent={
                <div className="flex flex-col items-center">
                  <p className="text-sm font-semibold">
                    {currentJob.pilotExpertize}
                  </p>
                  <p className="text-xs text-gray-400">#{currentJob.id}</p>
                  <button
                    className={`px-2 py-1 mt-1 text-[.6rem] font-medium rounded-md ${
                      currentJob.status == "Live" && "bg-red-100 text-red-500"
                    } ${
                      currentJob.status == "Completed" &&
                      "bg-blue-100 text-blue-500"
                    } ${
                      currentJob.status == "Available" &&
                      "bg-green-100 text-green-500"
                    }`}
                  >
                    {currentJob?.status}
                  </button>
                </div>
              }
            />
          }
        >
          <div className="w-full h-full px-4 py-8">
            {/* Header */}
            <div className="lg:flex hidden flex-1 h-fit items-center justify-between ">
              <p className="text-black font-semibold text-2xl">
                {currentJob.pilotExpertize}
                <span className="ml-2 text-gray-300 font-normal">
                  #{currentJob.id}
                </span>
                <button
                  className={`w-32 ml-4 py-2 text-sm font-medium ${
                    currentJob.status == "Live" && "bg-red-100 text-red-500"
                  } ${
                    currentJob.status == "Completed" &&
                    "bg-blue-100 text-blue-500"
                  } ${
                    currentJob.status == "Available" &&
                    "bg-green-100 text-green-500"
                  } rounded-md`}
                >
                  {currentJob?.status}
                </button>
              </p>

              <div className="flex items-center gap-2">
                <Link href="/dashboard/myJobs">
                  <a className="font-medium text-xs text-gray-400">
                    Go to My Jobs
                  </a>
                </Link>
                <ArrowRightIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Content */}
            <div className="mt-5 w-full h-full bg-white rounded-2xl">
              {/* Map */}
              <div className="lg:pt-6 pt-3 lg:mx-6 mx-3 shadow-lg rounded-2xl">
                <MapComponent
                  center={currentJob.mapData.center}
                  zoom={currentJob.mapData.zoom}
                  polygon={currentJob.mapData.polygon}
                  area={currentJob.area}
                />
              </div>
              {/* --------------------- */}
              <div className="lg:mx-12 mx-3 pt-9 grid lg:grid-cols-2 grid-cols-1 gap-x-8 gap-y-5">
                <p className="text-gray-400 sm:text-lg text-sm">
                  {currentJob.address}
                </p>

                <p className="text-black text-lg">
                  <span className="text-black font-semibold">Start Date:</span>{" "}
                  {new Date(currentJob.date).toDateString()}
                </p>

                <div className="flex justify-start flex-col items-start">
                  <h2 className="text-black sm:text-lg text-base font-semibold">
                    Customer Notes:
                  </h2>
                  <h2 className="text-black sm:text-base text-sm">
                    {currentJob.customerNote}
                  </h2>
                </div>

                {currentJob.status !== "Completed" && (
                  <div className="flex justify-center flex-col">
                    <h2 className="text-black sm:text-lg text-base font-semibold">
                      Customer Details:
                    </h2>
                    <p className="text-black mt-1 font-normal sm:text-base text-sm">
                      <span className="font-semibold">Name: </span>
                      {currentJob.customerID.firstName}{" "}
                      {currentJob.customerID.lastName}
                    </p>
                    <p className="text-black mt-1 font-normal sm:text-base text-sm">
                      <span className="font-semibold">Email Address: </span>
                      {currentJob.customerID.email}
                    </p>
                    <p className="text-black mt-1 font-normal sm:text-base text-sm">
                      <span className="font-semibold">Phone Number: </span>
                      {currentJob.customerID.phoneNumber}
                    </p>
                    <p className="text-black mt-1 font-normal sm:text-base text-sm">
                      <span className="font-semibold">Company: </span>
                      {currentJob.customerID.companyName}
                    </p>
                  </div>
                )}

                <h2 className="text-black sm:text-lg text-sm font-semibold">
                  {currentJob.status !== "Completed" && (
                    <span className="sm:hidden inline-flex">
                      Arrival Time {currentJob.arrivalTime}
                    </span>
                  )}
                  {currentJob.status === "Live" && <p>Upload Deliverables</p>}
                </h2>
                {currentJob.status !== "Completed" && (
                  <h2 className="sm:block hidden text-gray-600  font-semibold text-2xl">
                    Arrival Time {currentJob.arrivalTime}
                  </h2>
                )}
              </div>

              {/* File Upload */}
              {currentJob.status === "Live" && (
                <div className="mt-5 sm:mx-12 mx-3">
                  <section className="cursor-pointer mb-5">
                    <div
                      {...getRootProps({
                        className: `dropzone ${isFocused && "focused"} ${
                          isDragAccept && "accept"
                        }`,
                      })}
                    >
                      <input {...getInputProps()} />
                      <img
                        src="/assets/folder.png"
                        alt=""
                        className="sm:w-20 w-14 mb-3"
                      />
                      <p className="sm:text-xl text-base text-slate-400">
                        Drag &apos; Drop or Click to Upload
                      </p>
                    </div>
                    {uploadedFiles.length !== 0 && (
                      <aside className="mt-3">
                        <h4 className="my-2 font-semibold">Files</h4>
                        <ul>{files}</ul>
                      </aside>
                    )}
                  </section>

                  {error && (
                    <p className="text-xs text-red-500 mb-2">{error}</p>
                  )}

                  <button
                    className={`${
                      uploadedFiles.length === 0
                        ? "disabled bg-gray-400"
                        : "bg-teal-400"
                    } w-full py-5 rounded-lg  text-white sm:text-xl text-base font-semibold`}
                    onClick={handleSubmit}
                  >
                    {uploading === null ? (
                      "Upload file to complete job"
                    ) : (
                      <div className="flex items-center w-full justify-center">
                        <svg
                          className="h-7 w-7 animate-spin text-white"
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

                        <p className="ml-3">{uploading}</p>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </DashboardLayout>
      )}
    </>
  );
};

export default SinglePage;

export const getServerSideProps = ({ query }) => {
  if (!query.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard/myJobs",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
