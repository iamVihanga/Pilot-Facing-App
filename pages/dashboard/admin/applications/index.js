import React, { useState, useEffect } from "react";
import {
  AdminProvider,
  DashboardLayout,
  DropdownSelector,
  ApplicationCard,
  LoadingSpinner,
  ApplicationSidebar,
} from "../../../../components";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { getAllEmployees } from "../../../../config/supabaseFunctions";
import { Toaster } from "react-hot-toast";

const Index = () => {
  const [allApplications_Solid, setAllApplications_Solid] = useState([]);
  const [allApplications, setAllApplications] = useState([]);
  const [activeApplication, setActiveApplication] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState(filterItems[0]);
  const [triggerRefresh, setTriggerRefresh] = useState("");

  // Initialize Application data
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const { data, error } = await getAllEmployees();

        if (error) throw new Error("Fetch applications failed !");

        setAllApplications(data);
        setAllApplications_Solid(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [triggerRefresh]);

  // Filter list
  useEffect(() => {
    let filteredList = filterList(activeFilter, allApplications_Solid);
    setAllApplications(filteredList);
  }, [activeFilter]);

  return (
    <AdminProvider>
      <DashboardLayout>
        <Toaster position="top-center" />
        {/* =============================== */}
        <div className="w-full flex">
          <div className="flex-1 w-full min-h-screen px-3 py-8 mr-[370px]">
            {/* Top Bar Content */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="font-semibold text-lg mr-3">
                  Pilots Applications
                </p>

                {/* ------------ Filter ------------  */}
                <DropdownSelector
                  filterItems={filterItems}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
              </div>

              <div className="flex items-center gap-2">
                <Link href="/dashboard/myJobs" legacyBehavior>
                  <a className="font-medium text-xs text-gray-400">
                    Go to My Jobs
                  </a>
                </Link>
                <ArrowRightIcon className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            {/* ------------------------------------- */}

            {/* Job List Layout */}
            {loading && (
              <div className="my-3 w-full h-full flex items-center justify-center">
                <LoadingSpinner width={9} height={9} color="teal-400" />
              </div>
            )}

            {!loading && (
              <div className="mt-3 bg-white rounded-lg w-full min-h-[70vh] mb-5 sm:p-5 p-3 flex flex-col gap-y-6">
                {allApplications.length !== 0 &&
                  allApplications.map((employee) => (
                    <ApplicationCard
                      key={employee.id}
                      item={employee}
                      activeApplication={activeApplication}
                      setActiveApplication={setActiveApplication}
                    />
                  ))}
              </div>
            )}
            {/* ------------------------------------- */}
          </div>

          {/* ============= SIDE BAR ============= */}
          <div className="fixed right-0 w-[370px] bg-white p-5 h-full rounded-l-[30px] overflow-y-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-medium">
            {Object.keys(activeApplication).length !== 0 && (
              <ApplicationSidebar
                item={activeApplication}
                triggerRefresh={setTriggerRefresh}
              />
            )}
          </div>
        </div>
        {/* =============================== */}
      </DashboardLayout>
    </AdminProvider>
  );
};

export default Index;

const filterItems = [
  { id: 1, label: "Every Status" },
  { id: 2, label: "New" },
  { id: 3, label: "Approved" },
  { id: 4, label: "Decliened" },
];

const filterList = (term, list) => {
  let activeFilterTerm = term.label;

  switch (activeFilterTerm) {
    case "Every Status":
      return list;

    case "New":
      return list.filter(
        (application) => !application.approved && !application.declined
      );

    case "Approved":
      return list.filter(
        (application) => application.approved && !application.declined
      );

    case "Decliened":
      return list.filter(
        (application) => !application.approved && application.declined
      );

    default:
      return list;
  }
};
