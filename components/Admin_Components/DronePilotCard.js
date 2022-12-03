import React, { useState, useEffect } from "react";

const DronePilotCard = ({ data, activePilot, setActivePilot, onClick }) => {
  const [liveCount, setLiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    // Generate live count
    let liveJobs = 0;
    if (data.jobs.length !== 0) {
      data.jobs.map((job) => {
        if (job.status === "Live") liveJobs += 1;
      });
    }
    setLiveCount(liveJobs);

    // Generate completed count
    let completedJobs = 0;
    if (data.jobs.length !== 0) {
      data.jobs.map((job) => {
        if (job.status === "Completed") completedJobs += 1;
      });
    }
    setCompletedCount(completedJobs);
  }, []);

  const profilePicURL = data.pilot.profilePic
    ? `${process.env.NEXT_SUPABASE_STORAGE_BASEURL}/profile-pics/${data.pilot.profilePic}`
    : "/assets/avatar.jpg";

  return (
    <div
      className={`job-card max-h-fit p-2 ${
        activePilot?.pilot?.id === data.pilot.id && "active"
      }`}
      onClick={onClick}
    >
      <div className="flex gap-x-4 items-center">
        <img src={profilePicURL} className="w-16 h-16 rounded-md" />

        <div className="">
          {/* Name and ID */}
          <p className="">
            <span className="font-semibold">
              {data.pilot.firstName} {data.pilot.lastName}
            </span>
            &nbsp;
            <span className="">#{data.pilot.id}</span>
          </p>

          {/* Sub data */}
          <p className="text-sm text-gray-500">
            {data.billing && (
              <span className="mr-5">
                {data.billing?.city}, {data.billing?.country}
              </span>
            )}

            <span>
              Live: {liveCount}, Completed: {completedCount}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DronePilotCard;
