import React from "react";
import { Input } from "../../";
import { CheckIcon } from "@heroicons/react/24/outline";

const ColumnOneForm = ({ data: { pilotData, billingData } }) => {
  return (
    <div>
      <div className="flex items-center gap-x-3">
        <div className="flex-1">
          <p className="text-sm mb-1">First Name</p>
          <Input className={"w-full"}>
            <p className="text-primaryBlue">{pilotData.firstName}</p>
          </Input>
        </div>

        <div className="flex-1">
          <p className="text-sm mb-1">Last Name</p>
          <Input className={"w-full"}>
            <p className="text-primaryBlue">{pilotData.lastName}</p>
          </Input>
        </div>

        <div className="flex-1">
          <p className="text-sm mb-1">Mobile Number</p>
          <Input className={"w-full"}>
            <p className="text-primaryBlue">{pilotData.telNumber}</p>
          </Input>
        </div>
      </div>

      <div className="mt-5 w-full">
        <p className="text-sm mb-1">Email</p>
        <Input className={"w-full"}>
          <p className="text-primaryBlue">{pilotData.email}</p>
        </Input>
      </div>

      <p className="mt-8 text-sm mb-2">{`CAA Information & Certificates`}</p>
      <div className="flex items-center gap-x-3">
        <Input className={"w-full"}>
          <p className="text-primaryBlue">{pilotData.flyerID}</p>
        </Input>

        <Input className={"w-full"}>
          <p className="text-primaryBlue">{pilotData.operatorID}</p>
        </Input>
      </div>

      <div className="mt-3 flex items-center gap-x-4">
        <Input className={"w-full"}>
          {pilotData.proofDoc ? (
            <a
              className="text-primaryBlue hover:underline"
              href={pilotData.proofDoc}
            >
              {`Download "A2 CofC" or GVC`}
            </a>
          ) : (
            <p className="text-primaryBlue">{`"A2 CofC" or GVC not Uploaded`}</p>
          )}
        </Input>

        <p className="text-primaryBlue">OR</p>

        <div className="flex items-center gap-x-2">
          <div className="w-12 h-12 rounded-md bg-primaryBlueLight flex items-center justify-center">
            {pilotData.confirmNoProof && (
              <CheckIcon className="w-7 h-7 text-teal-500" strokeWidth={2} />
            )}
          </div>
          <p className="text-xs text-green-500">{`I can confirm my drone(s) are under 250g and will not operate a drone that is under 250g or over`}</p>
        </div>
      </div>

      <Input className={"mt-3 w-full"}>
        {pilotData.droneInsurance ? (
          <a
            className="text-primaryBlue hover:underline"
            href={pilotData.droneInsurance}
          >
            Download Drone Insurance
          </a>
        ) : (
          <p className="text-primaryBlue">Drone Insurance not Uploaded</p>
        )}
      </Input>
    </div>
  );
};

export default ColumnOneForm;
