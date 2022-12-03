import React, { useEffect, useState } from "react";
import {
  AdminProvider,
  DashboardLayout,
  LoadingSpinner,
  DronePilotCard,
} from "../../../../components";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { allDronePilots } from "../../../../config/supabaseFunctions";
import { Toaster } from "react-hot-toast";
import { errorToast } from "../../../../components/UI/Toast";

const Index = () => {
  const [pilotData_Solid, setPilotData_Solid] = useState([]);
  const [pilotData, setPilotData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePilot, setActivePilot] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Intialize pilot data
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        const { data, error } = await allDronePilots();
        if (error) throw error;

        setPilotData(data);
        setPilotData_Solid(data);
        setLoading(false);
      } catch (err) {
        errorToast(err.message);
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm !== "") {
      let filteredList = searchFilter(searchTerm, pilotData_Solid);

      setPilotData(filteredList);
    } else {
      setPilotData(pilotData_Solid);
    }
  }, [searchTerm]);

  // Handle click
  const handleOnClick = (pilot) => {
    setActivePilot(pilot);
  };

  return (
    <AdminProvider>
      <DashboardLayout>
        <Toaster position="top-center" />
        {/* ==================================== */}
        <div className="w-full flex flex-col py-8 px-3">
          {loading ? (
            <div className="w-full h-screen flex items-center justify-center">
              <LoadingSpinner width={9} height={9} color="teal-400" />
            </div>
          ) : (
            <>
              {/* Top Bar Content */}
              <div className="flex w-1/2 items-center justify-between">
                <div className="flex items-center">
                  <p className="font-semibold text-lg mr-3">Drone Pilots</p>

                  {/* ------------ Seach bar ------------  */}
                  <input
                    type="text"
                    className="text-xs bg-transparent text-gray-500 outline-none"
                    placeholder="Search Pilot Name or ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {/* ------------------------------------ */}
                </div>

                <div className="flex items-center gap-2">
                  <Link href="/dashboard/admin/applications" legacyBehavior>
                    <a className="font-medium text-xs text-gray-400">
                      Go to applications
                    </a>
                  </Link>
                  <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              {/* ------------------------------------- */}

              <div className="mt-3 w-full min-h-screen flex gap-x-3">
                {/* Drone pilots List */}
                <div className="flex-1/2 flex flex-col gap-y-5 w-full bg-white rounded-lg p-5">
                  {pilotData.map((pilot) => (
                    <DronePilotCard
                      key={pilot.pilot.id}
                      data={pilot}
                      activePilot={activePilot}
                      setActivePilot={setActivePilot}
                      onClick={() => handleOnClick(pilot)}
                    />
                  ))}
                </div>

                {/* Map Component */}
                <div className="flex-1/2 w-full bg-white"></div>
              </div>
            </>
          )}
        </div>
        {/* ==================================== */}
      </DashboardLayout>
    </AdminProvider>
  );
};

export default Index;

const searchFilter = (term, solidList) => {
  let filteredList = [];

  filteredList = solidList.filter(
    (item) =>
      item.pilot.firstName.startsWith(term) ||
      item.pilot.lastName.startsWith(term) ||
      item.pilot.id.toString().startsWith(term)
  );

  return filteredList;
};
