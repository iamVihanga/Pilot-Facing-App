import React from "react";

const ColumnTwo_Form = ({ data }) => {
  return (
    <div>
      <p className="mb-1 text-sm">Pilot Capabilities</p>
      <div className="w-full rounded-md h-32 bg-primaryBlueLight p-3 flex flex-wrap gap-x-2 gap-y-2">
        {data.pilotData.userSkills.map((skill) => (
          <div
            className="text-sm p-2 bg-red-400 text-white rounded-md w-fit h-fit"
            key={skill.id}
          >
            {skill.text}
          </div>
        ))}
      </div>

      <p className="mt-6 mb-1 text-sm">Pilot Drones</p>
      <div className="w-full rounded-md h-32 bg-primaryBlueLight p-3 flex flex-wrap gap-x-2 gap-y-2">
        {data.pilotData.userDrones.map((drone) => (
          <div
            className="text-sm p-2 bg-red-400 text-white rounded-md w-fit h-fit"
            key={drone.id}
          >
            {drone.brand.name} {drone.model}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnTwo_Form;
