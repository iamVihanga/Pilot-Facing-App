import React, { useState, useEffect } from "react";
import { LoadingSpinner } from "../";
import { declinePilot, acceptPilot } from "../../config/supabaseFunctions";
import { successToast, errorToast } from "../UI/Toast";

const ApplicationSidebar = ({ item, triggerRefresh }) => {
  const [accepting, setAccepting] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [hideElement, setHideElement] = useState(false);

  const handleAccept = async () => {
    try {
      setAccepting(true);

      const { message, password } = await acceptPilot(item.email);

      successToast(message);
      successToast(`Password: ${password}`);
      triggerRefresh(`Trggier ${message}`);
      setHideElement(true);
      setAccepting(false);
    } catch (err) {
      errorToast(err.message);
      setAccepting(false);
    }
  };

  const handleDecline = async () => {
    try {
      setDeclining(true);

      const { data, error } = await declinePilot(item.id);
      if (error) throw new Error("Pilot Declined Failed !");

      successToast("Pilot Declined Sucessfully !");
      triggerRefresh(`Trggier ${data}`);
      setHideElement(true);
      setDeclining(false);
    } catch (err) {
      setDeclining(false);
      errorToast(err.message);
    }
  };

  return (
    <div className="mt-3 ">
      <p className="font-semibold text-2xl mb-1">
        {item.firstName} {item.lastName}
      </p>

      <p className="text-gray-600">{item.email}</p>
      <p className="text-gray-600">{item.telNumber}</p>
      <p className="text-gray-600">{item.company}</p>

      <div className="mt-5">
        <p className="text-lg font-semibold mb-1">Pilot Expertise</p>
        {item.userSkills.map((skill) => (
          <p key={skill.id} className="text-gray-600">
            {skill.text}
          </p>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-lg font-semibold mb-1">Pilot Equipments</p>
        <div className="flex items-center flex-wrap gap-y-2 gap-x-2">
          {item.userDrones.map((drone) => (
            <p
              key={drone.id}
              className="text-gray-600 text-xs p-2 bg-gray-200 rounded-md"
            >
              {drone.brand.name}, {drone.model}
            </p>
          ))}
        </div>
      </div>

      <p className="mt-5 font-semibold">Flyer ID</p>
      <p className="text-gray-600">{item.flyerID}</p>

      <p className="mt-3 font-semibold">Operator ID</p>
      <p className="text-gray-600">{item.operatorID}</p>

      <p className="mt-5 font-semibold">Drone Training</p>
      {item.proofDoc ? (
        <a className="underline text-blue-500" href={item.proofDoc}>
          Download Proof Document
        </a>
      ) : (
        "Not Uploaded"
      )}

      <p className="mt-5 font-semibold">Drone Insurance</p>
      {item.droneInsurance ? (
        <a className="underline text-blue-500" href={item.droneInsurance}>
          Download Drone Insurance
        </a>
      ) : (
        "Not Uploaded"
      )}

      {/* ------------- ACCEPT & DESCLINE -------------- */}
      {!item.approved && !item.declined && !hideElement && (
        <div className="mt-8">
          <button
            onClick={handleAccept}
            className="flex items-center justify-center w-full h-14 font-semibold text-lg bg-teal-400 text-white rounded-md"
          >
            {accepting ? (
              <LoadingSpinner width={5} height={5} color="white" />
            ) : (
              "Accept Pilot"
            )}
          </button>

          <button
            onClick={handleDecline}
            className="mt-3 flex items-center justify-center w-full h-14 font-semibold text-lg bg-red-400 text-white rounded-md"
          >
            {declining ? (
              <LoadingSpinner width={5} height={5} color="white" />
            ) : (
              "Decline Pilot"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationSidebar;
