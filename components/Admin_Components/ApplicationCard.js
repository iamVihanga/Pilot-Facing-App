import React, { useState, useEffect } from "react";

const ApplicationCard = ({ item, activeApplication, setActiveApplication }) => {
  const [status, setStatus] = useState(null);

  const pilotSkillsCount = item.userSkills.length;
  const pilotDronesCount = item.userDrones.length;

  useEffect(() => {
    //   Modify status
    if (!item.approved && !item.declined) setStatus("new");
    if (item.approved && !item.declined) setStatus("approved");
    if (!item.approved && item.declined) setStatus("declined");
  }, []);

  return (
    <div
      className={`job-card ${activeApplication?.id === item.id && "active"}`}
      onClick={() => setActiveApplication(item)}
    >
      <div className="flex flex-1 max-w-md items-center justify-between">
        {/* Col 1 */}
        <div>
          <p className="text-sm font-semibold">
            {item.firstName} {item.lastName}
          </p>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>

        {/* Col 2 */}
        <div>
          <p className="text-sm font-semibold">Pilot Expertise</p>
          <p className="text-xs text-gray-500">
            {item.userSkills.slice(0, 1).map((skill) => (
              <span key={skill.id} className="text-xs">
                {trimSkillName(skill.text)} &nbsp;
              </span>
            ))}
            {pilotSkillsCount > 1 && (
              <span className="text-xs">+{pilotSkillsCount - 1}</span>
            )}
          </p>
        </div>

        {/* Col 3 */}
        <div>
          <p className="text-sm font-semibold">Pilot Equipment</p>
          <p className="text-xs text-gray-500">
            {item.userDrones.slice(0, 1).map((drone) => (
              <span key={drone.id} className="text-xs">
                {drone.brand.name} {drone.model} &nbsp;
              </span>
            ))}
            {pilotDronesCount > 1 && (
              <span className="text-xs">+{pilotDronesCount - 1}</span>
            )}
          </p>
        </div>
      </div>
      <StatusButton status={status} />
    </div>
  );
};

export default ApplicationCard;

const StatusButton = ({ status }) => {
  switch (status) {
    case "new":
      return (
        <button className="status-button bg-blue-100 text-blue-500">New</button>
      );

    case "approved":
      return (
        <button className="status-button bg-green-100 text-green-500">
          Approved
        </button>
      );

    case "declined":
      return (
        <button className="status-button bg-red-100 text-red-500">
          Declined
        </button>
      );

    default:
      return "";
  }
};

const trimSkillName = (name) => {
  switch (name) {
    case "Building / Roof Inspections":
      return "Building";

    case "Photography (Weddings)":
      return "Photography";

    case "Thermal Imaging":
      return "Thermal";

    case "Videography (Films, Docs)":
      return "Videography";

    default:
      return "";
  }
};
