import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { Checkbox, ErrorMessage } from "../index";
import Link from "next/link";
import { insertToUsers, uploadProofFile } from "../../config/supabaseFunctions";
import { setActiveForm, setUpdateMode } from "../../redux/registerSlice";

const Confirm = ({ proofDoc, insuranceDoc }) => {
  const state = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // ###################################################
      // ------------- IMPLEMENT FILE UPLOAD ---------------
      let baseURL = process.env.NEXT_SUPABASE_STORAGE_BASEURL;

      let proofFileDoc = null;
      if (!state.confirmNoProof && proofDoc !== null) {
        const { data, error: proofFileErr } = await uploadProofFile(
          proofDoc,
          state.email
        );

        if (proofFileErr) throw new Error("Proof file upload failed.!");
        proofFileDoc = `${baseURL}/proof-files/${data.path}`;
      }

      let insuranceFileLink = null;
      const { data: insuranceDocRes, error: insuranceErr } =
        await uploadProofFile(insuranceDoc, state.email);
      if (insuranceErr) throw new Error("Drone Insurance upload failed.!");
      insuranceFileLink = `${baseURL}/proof-files/${insuranceDocRes.path}`;
      // --------------------------------
      // ###################################################

      // Insert user
      const { data, error } = await insertToUsers([
        {
          title: state.title,
          firstName: state.firstName,
          lastName: state.lastName,
          telNumber: state.telNumber,
          company: state.company,
          flyerID: state.flyerID,
          operatorID: state.operatorID,
          confirmNoProof: state.confirmNoProof,
          proofDoc: proofFileDoc,
          droneInsurance: insuranceFileLink,
          userSkills: state.skills,
          userDrones: state.equipments,
          email: state.email,
        },
      ]);
      if (error) throw new Error(error.message);

      alert(
        "Register successfully.! admin will send you an invitation with generated password"
      );

      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="mt-4">
      <div className="mb-5">
        <p className="text-3xl font-normal">Confirm</p>
      </div>

      {error && <ErrorMessage error={error} setError={setError} />}
      {/* Contact form Confirmation */}
      <div className="cofirm-card ">
        <div className="flex flex-1 flex-row">
          <div>
            <p className="text-primaryBlue sm:text-base text-sm font-medium">
              Name
            </p>
            <p className="text-primaryBlue text-xs mt-1">
              {state.firstName} {state.lastName}
            </p>

            <p className="text-primaryBlue sm:text-base text-sm font-medium mt-3">
              Email Address
            </p>
            <p className="text-primaryBlue text-xs mt-1">{state.email}</p>
          </div>
          <div className="ml-6">
            <p className="text-primaryBlue sm:text-base text-sm font-medium">
              Telephone Number
            </p>
            <p className="text-primaryBlue text-xs mt-1">{state.telNumber}</p>

            <p className="text-primaryBlue sm:text-base text-sm font-medium mt-3">
              Company
            </p>
            <p className="text-primaryBlue text-xs mt-1">{state.company}</p>
          </div>
        </div>

        <PencilSquareIcon
          className="w-7 text-primaryBlue cursor-pointer"
          onClick={() => {
            dispatch(setUpdateMode(true));
            dispatch(setActiveForm(1));
          }}
        />
      </div>

      {/* Certificate form Confirmation */}
      <div className="cofirm-card mt-5">
        <div className="flex flex-1 flex-row gap-16">
          <div>
            <p className="text-primaryBlue sm:text-base text-sm font-medium">
              CAA Information
            </p>
            <p className="text-primaryBlue text-xs mt-1">
              Flyer ID: {state.flyerID} &nbsp; Operator ID: {state.operatorID}
            </p>

            <p className="text-primaryBlue sm:text-base text-sm font-medium mt-4">
              Qualifications &amp; Insurances
            </p>
            <p className="text-primaryBlue text-xs mt-1">
              {proofDoc !== null ? "A2CofC Uploaded" : "A2CofC not Uploaded"}{" "}
              &nbsp; &nbsp;{" "}
              {insuranceDoc !== null
                ? "Insurance Uploaded"
                : "Insurance not Uploaded"}
            </p>
          </div>
        </div>

        <PencilSquareIcon
          className="w-7 text-primaryBlue cursor-pointer"
          onClick={() => {
            dispatch(setUpdateMode(true));
            dispatch(setActiveForm(2));
          }}
        />
      </div>

      {/* Equipment form Confirmation */}
      <div className="cofirm-card mt-5">
        <div className=" flex-1 flex-nowrap">
          <p className="text-primaryBlue sm:text-base text-sm font-medium">
            Skills / Experiences
          </p>
          <div className="flex flex-row gap-2 mt-2 flex-wrap">
            {state.skills.map((skill) => (
              <p className="text-primaryBlue text-xs w-fit" key={skill.id}>
                {skill.text},{" "}
              </p>
            ))}
          </div>

          <p className="text-primaryBlue sm:text-base text-sm font-medium mt-4">
            Equipment
          </p>
          <div className="flex flex-row gap-2  mt-2 flex-wrap">
            {state.equipments.map((equip) => (
              <p className="text-primaryBlue text-xs w-fit" key={equip.id}>
                {equip.brand.name}, {equip.model} /
              </p>
            ))}
          </div>
        </div>

        <PencilSquareIcon
          className="w-7 text-primaryBlue cursor-pointer"
          onClick={() => {
            dispatch(setUpdateMode(true));
            dispatch(setActiveForm(3));
          }}
        />
      </div>

      <div className="my-5 flex flex-row gap-3 items-center">
        <Checkbox checked={checked} setChecked={setChecked} />
        <p className="sm:text-base text-sm">
          I accept the{" "}
          <Link href="#">
            <a className="font-semibold">Terms and Conditions</a>
          </Link>{" "}
          and the{" "}
          <Link href="#">
            <a className="font-semibold">Privacy Policy</a>
          </Link>
        </p>
      </div>

      {/* <button disabled={!checked} onClick={handleSubmit} className={`w-full ${!checked ? 'bg-gray-400 cursor-not-allowed' : 'bg-primaryTeal'} py-3 rounded-md text-white font-semibold text-lg`}>Submit Application</button> */}
      <button
        disabled={!checked}
        onClick={handleSubmit}
        className={`w-full flex items-center justify-center ${
          !checked ? "bg-gray-400 cursor-not-allowed" : "bg-primaryTeal"
        } h-12 rounded-md text-white font-semibold text-lg`}
      >
        {loading ? (
          <>
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
          </>
        ) : (
          <span>Submit</span>
        )}
      </button>
    </div>
  );
};

export default Confirm;
