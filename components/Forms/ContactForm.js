import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ErrorMessage } from "../../components";
import { useForm } from "react-hook-form";
import {
  setActiveForm,
  completeForm,
  submitContactForm,
  switchUpdateMode,
} from "../../redux/registerSlice";
import { useRouter } from "next/router";

const ContactForm = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.register);
  const router = useRouter();

  const [title, setTitle] = useState(state.title);
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  const [email, setEmail] = useState(state.email);
  const [telNumber, setTelNumber] = useState(state.telNumber);
  const [company, setCompany] = useState(state.company);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [titleErr, setTitleErr] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // References
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const telNumberRef = useRef(null);
  const companyRef = useRef(null);

  // Find device width
  useEffect(() => {
    let screenWidth;
    // ----------- screen width -------------
    if (typeof window !== "undefined") {
      // Client-side-only code
      screenWidth = window.screen.width;
    }
    // ----------------------------------------

    if (screenWidth < 640) {
      setIsMobile(true);
    }
  }, []);

  // *********************************
  // Form submission
  const validateData = () => {
    let validationError = false;
    const firstNameElem = firstNameRef.current;
    const lastNameElem = lastNameRef.current;
    const emailElem = emailRef.current;
    const telNumElem = telNumberRef.current;
    const companyElem = companyRef.current;
    const errorStyle =
      "w-full bg-primaryBlueLight text-[16px] text-primaryBlue h-12 rounded-md px-4 outline-none placeholder:text-red-400 border border-red-400";

    if (firstName === "") {
      firstNameElem.className = errorStyle;
      validationError = true;
      setError("Please fill all required fields !");
    } else firstNameElem.className = "normal-input";

    if (lastName === "") {
      lastNameElem.className = errorStyle;
      validationError = true;
      setError("Please fill all required fields !");
    } else lastNameElem.className = "normal-input";

    if (email === "") {
      emailElem.className = errorStyle;
      validationError = true;
      setError("Please fill all required fields !");
    } else if (!email.match(re)) {
      // Validate is match to regex
      emailElem.className = `${errorStyle} text-red-500`;
      validationError = true;
      setError("Email is not not valid");
    } else emailElem.className = "normal-input";

    if (telNumber === "") {
      telNumElem.className = errorStyle;
      validationError = true;
      setError("Please fill all required fields !");
    } else telNumElem.className = "normal-input";

    if (title === "") {
      validationError = true;
      setTitleErr(true);
      setError("Please select a title");
    } else setTitleErr(false);

    if (!validationError) setError(null);

    return validationError;
  };
  // *********************************
  const handleNext = async () => {
    try {
      setLoading(true);
      let isValidateError = validateData();
      if (isValidateError) throw new Error("Validation failed.");

      setLoading(false);
      dispatch(
        submitContactForm({
          title,
          firstName,
          lastName,
          email,
          telNumber,
          company,
        })
      );
      dispatch(completeForm(1));

      if (
        state.form1_updateMode &&
        state.form2_updateMode &&
        state.form3_updateMode
      )
        return dispatch(setActiveForm(4));

      dispatch(setActiveForm(2));
      dispatch(switchUpdateMode(1));
    } catch (err) {
      // console.log(err)
      setLoading(false);
    }
  };
  // *********************************

  return (
    <div className="sm:mt-12 mt-8">
      {error && (
        <ErrorMessage error={error} setError={setError} className="mb-5" />
      )}

      {/* // form */}
      <div className="grid sm:grid-rows-3 grid-rows-5 sm:gap-y-7 gap-y-5">
        {/* Row 1 */}
        <div className="h-12 flex justify-between">
          <div className="flex justify-start ">
            <button
              onClick={(e) => setTitle("Mr")}
              className={`${
                title !== "Mr"
                  ? "bg-primaryBlueLight text-primaryBlue"
                  : "bg-primaryTealLight text-primaryTeal"
              } ${
                titleErr && "border border-red-500 text-red-500"
              } title-button`}
            >
              Mr
            </button>
            <button
              onClick={(e) => setTitle("Ms")}
              className={`sm:mx-5 mx-3 ${
                title !== "Ms"
                  ? "bg-primaryBlueLight text-primaryBlue"
                  : "bg-primaryTealLight text-primaryTeal"
              } ${
                titleErr && "border border-red-500 text-red-500"
              } title-button`}
            >
              Ms
            </button>
            <button
              onClick={(e) => setTitle("Mrs")}
              className={`${
                title !== "Mrs"
                  ? "bg-primaryBlueLight text-primaryBlue"
                  : "bg-primaryTealLight text-primaryTeal"
              } ${
                titleErr && "border border-red-500 text-red-500"
              } title-button`}
            >
              Mrs
            </button>
          </div>

          <div className="flex-1 w-full sm:ml-5 ml-3 sm:mr-5 mr-0 ">
            <input
              type="text"
              className=" normal-input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              ref={firstNameRef}
            />
          </div>
          {!isMobile && (
            <div className="flex-1 w-full">
              <input
                type="text"
                className=" normal-input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                ref={lastNameRef}
              />
            </div>
          )}
        </div>
        {/* last name field - Render only for mobile */}
        {isMobile && (
          <div className="h-12 ">
            <input
              type="text"
              className="normal-input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              ref={lastNameRef}
            />
          </div>
        )}

        {/* Row 2 - Desktop View */}
        <div className="h-12 ">
          <input
            type="email"
            className="normal-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
          />
        </div>

        {/* Row 3 - Desktop View */}
        <div className="h-12  grid sm:grid-cols-2 grid-cols-1 gap-x-5">
          <div>
            <input
              type="text"
              className="normal-input"
              placeholder="Telephone Number"
              value={telNumber}
              onChange={(e) => setTelNumber(e.target.value)}
              ref={telNumberRef}
            />
          </div>
          {!isMobile && (
            <div>
              <input
                type="text"
                className="normal-input"
                placeholder="Company (Optional)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                ref={companyRef}
              />
            </div>
          )}
        </div>
        {/* company field - Render only for mobile */}
        {isMobile && (
          <div className="h-12 ">
            <input
              type="text"
              className="normal-input"
              placeholder="Company (Optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              ref={companyRef}
            />
          </div>
        )}
      </div>

      <Button onClick={handleNext} className="mt-9" isLoading={loading}>
        {state.form1_updateMode ? "Save" : "Next"}
      </Button>
    </div>
  );
};

export default ContactForm;

// Email validation regex
const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
