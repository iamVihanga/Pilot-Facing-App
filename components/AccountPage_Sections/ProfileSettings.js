import React, { useState } from "react";
import { CheckboxTeal } from "../";
import UpdateSkills_Card from "./UpdateSkills_Card";
import UpdateEquipments_Card from "./UpdateEquipments_Card";
import { uploadProofFile, updateUser } from "../../config/supabaseFunctions";
import { successToast, errorToast } from "../UI/Toast";

const ProfileSettings = ({ data, user }) => {
  // ------------- Element States ----------------
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [mobile, setMobile] = useState(user.telNumber);
  const [flyerID, setFlyerID] = useState(user.flyerID);
  const [operatorID, setOperatorID] = useState(user.operatorID);
  const [confirmNoProof, setConfirmNoProof] = useState(user.confirmNoProof);
  const [proofDoc, setProofDoc] = useState(user.proofDoc);
  const [droneInsurance, setDroneInsurance] = useState(user.droneInsurance);
  const [skills, setSkills] = useState(user.userSkills);
  const [drones, setDrones] = useState(user.userDrones);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  // ---------------------------------------------

  const handleUpdate = async () => {
    try {
      setUpdateError(null);
      setUpdating(true);
      let proofDoc_link;
      let insurance_link;
      let confirmNoProof_val = false;

      // ------------------------------------------------------------------------
      // Step 01 - compare previous state of proof doc, upload if file selected
      if (typeof proofDoc === "string") {
        // do nothing if file wasnt changed.
      } else if (proofDoc === null && confirmNoProof) {
        // do nothing if no file and confirmed
        confirmNoProof_val = true;
      } else if (proofDoc === null && !confirmNoProof) {
        throw new Error("You must have upload proof doc or mark as confirmed.");
      } else if (typeof proofDoc === "object") {
        // console.log(proofDoc)
        const { data, error } = await uploadProofFile(proofDoc);

        if (error) throw error;

        if (data) {
          proofDoc_link = `${process.env.NEXT_SUPABASE_STORAGE_BASEURL}/user-data/${data.path}`;
          setProofDoc(proofDoc_link);
          setConfirmNoProof(false);
          confirmNoProof_val = false;
        }
      }
      // ------------------------------------------------------------------------

      // Step 02 - remove file, if confirm without proof check mark
      if (confirmNoProof) {
        proofDoc_link = null;
        confirmNoProof_val = true;
      }

      // ------------------------------------------------------------------------
      // Step 03 - compare previous state of insurance file, upload if file selected
      if (typeof droneInsurance === "string") {
        // do nothing if file wasnt changed.
      } else if (droneInsurance === null) {
        throw new Error("Drone insurance is required.");
      } else if (typeof droneInsurance === "object") {
        // console.log(droneInsurance)
        const { data, error } = await uploadProofFile(droneInsurance);

        if (error) throw error;

        if (data) {
          insurance_link = `${process.env.NEXT_SUPABASE_STORAGE_BASEURL}/user-data/${data.path}`;
          setDroneInsurance(insurance_link);
        }
      }
      // ------------------------------------------------------------------------
      const { data, error } = await updateUser(
        {
          firstName,
          lastName,
          telNumber: mobile,
          flyerID,
          operatorID,
          proofDoc: proofDoc_link,
          confirmNoProof: confirmNoProof_val,
          droneInsurance: insurance_link,
          userSkills: skills,
          userDrones: drones,
        },
        user.email
      );

      if (error) throw error;

      setUpdating(false);
      successToast("Profile Updated !");
    } catch (err) {
      setUpdateError(err.message);
      setUpdating(false);
      errorToast("Error: Profile Update Failed");
    }
  };

  return (
    <div>
      <p className="mt-8 text-black font-bold">Profile Settings</p>
      <div className="bg-white rounded-xl w-full px-4 py-8 mt-6">
        <p className="">
          Here you can change your personal details and terrotory
        </p>

        {updateError && (
          <p className="text-red-500 text-xs my-2">{updateError}</p>
        )}

        <div className="flex sm:flex-row flex-col gap-6">
          <div>
            {/* First name, last name & mobile number row */}
            <div className="flex flex-row gap-4 pt-4 pb-4">
              <div>
                <p className="text-gray-400 sm:text-base text-sm">First Name</p>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="sm:w-32 w-full mt-2 form-input px-3 py-3 text-base"
                  placeholder="Jaime"
                />
              </div>
              <div>
                <p className="text-gray-400 sm:text-base text-sm">Last Name</p>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="sm:w-32 w-full mt-2 form-input px-3 py-3 text-base"
                  placeholder="Harris"
                />
              </div>
              <div className="sm:block hidden">
                <p className="text-gray-400 sm:text-base text-sm">
                  Mobile Number
                </p>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  type="text"
                  className="mt-2 form-input px-3 py-3 w-52 text-base"
                  placeholder="07840774043"
                />
              </div>
            </div>
            <div className="sm:hidden block w-full ">
              <p className="text-gray-400 text-sm">Mobile Number</p>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="text"
                className="mt-2 form-input px-3 py-3 sm:w-52 w-full text-base"
                placeholder="07840774043"
              />
            </div>

            {/* Certificate update form  */}
            <div>
              <p className="mt-4 mb-3 text-gray-400 sm:text-base text-sm">
                CAA Information &amp; Certificates
              </p>
              <div className="flex gap-4">
                <input
                  value={flyerID}
                  onChange={(e) => setFlyerID(e.target.value)}
                  type="text"
                  className="form-input sm:w-auto w-full px-3 py-3 text-base"
                  placeholder="Flyer ID"
                />
                <input
                  value={operatorID}
                  onChange={(e) => setOperatorID(e.target.value)}
                  type="text"
                  className="form-input sm:w-auto w-full px-3 py-3 text-base"
                  placeholder="Operator ID"
                />
              </div>

              {/* Proof Doc Upload */}
              <div className="mt-4 flex max-w-fit sm:flex-row flex-col items-center justify-between w-full h-12 gap-x-2 sm:gap-y-0 gap-y-2">
                <div className="sm:w-min-w-[200px] w-full">
                  <label
                    htmlFor="file1"
                    className={`form-input ${
                      proofDoc && "success"
                    } sm:w-auto w-full text-small flex flex-row flex-1 items-center justify-start h-12 cursor-pointer`}
                  >
                    {proofDoc
                      ? '"A2 CofC" or GVC Proof Uploaded'
                      : 'Upload "A2 CofC" or GVC Proof'}
                    <input
                      type="file"
                      id="file1"
                      className="hidden"
                      onChange={(e) => setProofDoc(e.target.files[0])}
                    />
                  </label>
                </div>

                <p className="text-primaryBlue">OR</p>

                <div className="flex items-center w-full">
                  <CheckboxTeal
                    checked={confirmNoProof}
                    setChecked={setConfirmNoProof}
                  />
                  <p className="text-[10px] ml-2 text-teal-500">
                    I can confirm my drone(s) are under 250g and will not
                    operate a drone that is 250g or over.
                  </p>
                </div>
              </div>

              {/* Drone insurance  */}
              <label
                htmlFor="file2"
                className={`sm:mt-4 mt-28 form-input ${
                  droneInsurance && "success"
                } flex flex-1 flex-row items-center justify-start h-12 cursor-pointer`}
              >
                {droneInsurance
                  ? "Drone Insurance Uploaded"
                  : "Upload Drone Insurance"}
                <input
                  type="file"
                  id="file2"
                  className="hidden"
                  onChange={(e) => setDroneInsurance(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          {/* Update skills and drone equipments */}
          <div className="flex-1 mt-4">
            <p className="text-gray-400 sm:text-base text-sm">My Capabilties</p>
            <UpdateSkills_Card skills={skills} setSkills={setSkills} />

            <p className="mt-4 text-gray-400 sm:text-base text-sm">My Drones</p>
            <UpdateEquipments_Card drones={drones} setDrones={setDrones} />
          </div>
        </div>

        <div className="sm:mt-3 mt-5 w-full flex flex-row justify-end">
          <button
            onClick={handleUpdate}
            className="w-36 h-12 flex items-center justify-center bg-primaryBlue rounded-md text-white"
          >
            {!updating ? (
              "Update"
            ) : (
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
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
