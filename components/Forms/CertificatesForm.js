import React, { useState, useRef } from "react";
import { Input, CheckboxTeal, Button, ErrorMessage } from "../";
import { useSelector, useDispatch } from "react-redux";
import {
  submitCertificateForm,
  completeForm,
  setActiveForm,
  switchUpdateMode,
  setProofFileName,
  setInsuranceFileName,
} from "../../redux/registerSlice";
import { XCircleIcon } from "@heroicons/react/24/solid";

const CertificatesForm = ({
  proofDoc,
  insuranceDoc,
  setProofDoc,
  setInsuranceDoc,
}) => {
  const state = useSelector((state) => state.register);
  const dispatch = useDispatch();

  const [flyerID, setFlyerID] = useState(state.flyerID);
  const [operatorID, setOperatorID] = useState(state.operatorID);
  const [confirm, setConfirm] = useState(state.confirmNoProof);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // References
  const flyerID_Ref = useRef(null);
  const operatorID_Ref = useRef(null);
  const proofFile_Ref = useRef(null);
  const insurance_Ref = useRef(null);

  // -------------------------------------------
  const validateForm = () => {
    let validateError = false;

    if (flyerID === "") {
      setError("Flyer ID is required !");
      flyerID_Ref.current.classList.add("border");
      flyerID_Ref.current.classList.add("border-red-500");
      validateError = true;
    } else {
      flyerID_Ref.current.classList.remove("border");
      flyerID_Ref.current.classList.remove("border-red-500");
    }

    if (operatorID === "") {
      setError("Flyer ID is required !");
      operatorID_Ref.current.classList.add("border");
      operatorID_Ref.current.classList.add("border-red-500");
      validateError = true;
    } else {
      operatorID_Ref.current.classList.remove("border");
      operatorID_Ref.current.classList.remove("border-red-500");
    }

    if (proofDoc === null && !confirm) {
      setError("Proof file is required !");
      proofFile_Ref.current.classList.add("border");
      proofFile_Ref.current.classList.add("border-red-500");
      validateError = true;
    } else {
      proofFile_Ref.current.classList.remove("border");
      proofFile_Ref.current.classList.remove("border-red-500");
    }

    if (insuranceDoc === null) {
      setError("Drone insurance is required !");
      insurance_Ref.current.classList.add("border");
      insurance_Ref.current.classList.add("border-red-500");
      validateError = true;
    } else {
      insurance_Ref.current.classList.remove("border");
      insurance_Ref.current.classList.remove("border-red-500");
    }

    if (!validateError) setError(null);
    return validateError;
  };

  const handleNext = async () => {
    try {
      const isError = validateForm();
      if (isError) throw new Error("Please fill all required fields !");

      setLoading(true);

      dispatch(
        submitCertificateForm({
          flyerID,
          operatorID,
          confirmNoProof: confirm,
        })
      );
      dispatch(completeForm(2));

      if (
        state.form1_updateMode &&
        state.form2_updateMode &&
        state.form3_updateMode
      )
        return dispatch(setActiveForm(4));

      dispatch(setActiveForm(3));

      dispatch(switchUpdateMode(2));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  // -------------------------------------------

  return (
    <div className="mt-8">
      {error && <ErrorMessage error={error} setError={setError} />}

      {/* Row 1 */}
      <p className="sm:text-base text-sm">
        CAA Information{" "}
        <span className="italic text-skyBlue">{`(Obtain Flyer & Operator ID)`}</span>
      </p>
      <div className="mt-5 grid sm:grid-cols-3 grid-cols-1 sm:h-12 h-28 gap-x-4 gap-y-4">
        <Input refItem={flyerID_Ref}>
          <input
            type="text"
            className="w-full bg-transparent outline-none sm:text-sm text-[16px] text-primaryBlue placeholder:text-primaryBlue"
            placeholder="Flyer ID"
            value={flyerID}
            onChange={(e) => setFlyerID(e.target.value)}
          />
        </Input>
        <Input
          refItem={operatorID_Ref}
          className={"sm:col-span-2 col-span-full"}
        >
          <input
            type="text"
            className="w-full bg-transparent outline-none sm:text-sm text-[16px] text-primaryBlue placeholder:text-primaryBlue"
            placeholder="Operator ID"
            value={operatorID}
            onChange={(e) => setOperatorID(e.target.value)}
          />
        </Input>
      </div>

      {/* Row 2 */}
      <p className="mt-9 sm:text-base text-sm">Qualification &amp; Insurance</p>
      <div className="mt-5 flex sm:flex-row flex-col items-center justify-between">
        <div className="w-full relative">
          <label className={`cursor-pointer`}>
            <Input
              refItem={proofFile_Ref}
              className={`${confirm && "cursor-not-allowed"} ${
                proofDoc !== null && "bg-teal-100 text-teal-500"
              } cursor-pointer h-12 sm:text-sm text-[16px]`}
              htmlFor={"file1"}
            >
              <div className="flex items-center justify-between">
                <p
                  className={`${
                    proofDoc === null ? "text-primaryBlue" : "text-teal-500"
                  }`}
                >
                  {proofDoc?.name || `Upload "A2 CofC" or GVC Proof`}
                </p>
                <input
                  type="file"
                  id="file1"
                  className="hidden"
                  onChange={(e) => setProofDoc(e.target.files[0])}
                  disabled={confirm}
                />
              </div>
            </Input>
          </label>

          {proofDoc !== null && (
            <XCircleIcon
              className="w-5 h-5 text-teal-500 cursor-pointer absolute top-4 right-3"
              onClick={() => setProofDoc(null)}
            />
          )}
        </div>

        <div className="mx-4 text-primaryBlue sm:my-0 my-3">OR</div>
        <div className="flex items-center">
          <CheckboxTeal
            checked={confirm}
            setChecked={setConfirm}
            className="mr-3"
            isDisabled={proofDoc !== null ? true : false}
          />
          <p className="text-xs text-green-400">
            {`I can confirm my drone(s) are under 250g and will not operate a drone that is 250g or over.`}
          </p>
        </div>
      </div>

      <div className="mt-5 w-full">
        <div className="w-full relative">
          <label className={`cursor-pointer`}>
            <Input
              refItem={insurance_Ref}
              className={`${
                insuranceDoc !== null && "bg-teal-100 text-teal-500"
              } cursor-pointer h-12 sm:text-sm text-[16px]`}
              htmlFor="file2"
            >
              <p
                className={`${
                  insuranceDoc === null ? "text-primaryBlue" : "text-teal-500"
                }`}
              >
                {insuranceDoc?.name || "Upload Drone Insurance"}
              </p>
              <input
                type="file"
                id="file2"
                className="hidden"
                onChange={(e) => setInsuranceDoc(e.target.files[0])}
              />
            </Input>
          </label>

          {insuranceDoc !== null && (
            <XCircleIcon
              className="w-5 h-5 text-teal-500 cursor-pointer absolute top-4 right-3"
              onClick={() => setInsuranceDoc(null)}
            />
          )}
        </div>
      </div>

      <Button onClick={handleNext} className="mt-9" isLoading={loading}>
        {state.form2_updateMode ? "Save" : "Next"}
      </Button>
    </div>
  );
};

export default CertificatesForm;
