import React, { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  signinUser,
  getSession,
  handlePasswordReset,
} from "../../config/supabaseFunctions";
import { LoadingSpinner } from "../../components";
import { Toaster } from "react-hot-toast";
import { successToast, errorToast } from "../../components/UI/Toast";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailToPassword, setEmailToPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forgotPasswordView, setForgotPasswordView] = useState(false);
  const [sendingResetLink, setSendingResetLink] = useState(false);

  // Redirect if auth
  useEffect(() => {
    const getSessionAvailable = async () => {
      try {
        const { data } = await getSession();
        // console.log(data.session)
        if (data.session) router.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    getSessionAvailable();
  }, []);

  const handleSubmit = () => {
    const handleSignIn = async () => {
      try {
        setLoading(true);
        let { data, error } = await signinUser({
          email,
          password,
        });

        if (error) throw error;

        setLoading(false);

        if (data) router.push("/");
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    handleSignIn();
  };

  // Forgot password functions
  const sendPasswordResetLink = async () => {
    try {
      setSendingResetLink(true);

      const { data, error } = await handlePasswordReset(
        emailToPassword,
        "https://pilotdev.duber.uk/auth/forgot-password"
      );
      if (error) throw new Error("Password Reset link send failed !");

      setSendingResetLink(false);
      successToast("Password reset link send !");
    } catch (err) {
      errorToast(err.message);
    }
  };

  // ---------------------------------------------

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-screen">
      <Toaster position="top-right" />
      <div className="hidden md:block lg:col-span-2">
        <img className="w-full h-full object-cover" src="/assets/loginBG.jpg" />
      </div>

      <div className="flex items-center justify-center sm:px-12 px-8">
        {!forgotPasswordView ? (
          <form className="w-full">
            {/* <h2 className='text-logoText font-light'><span className="font-bold">Onthefly</span> DronePilots</h2> */}
            <img src="/assets/Duber logo.svg" className="w-32" />
            <h2 className="mt-12 mb-5 text-xl text-black font-bold">
              Nice to see you again
            </h2>

            {error && <p className="mb-5 text-xs text-red-500">{error}</p>}
            <InputItem
              label={"Login"}
              inputType="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Phone number"
              value={email}
            />
            <InputItem
              label={"Password"}
              inputType="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="mt-5"
              value={password}
            />

            <div className="w-full flex items-center flex-nowrap justify-between mt-6 mb-8">
              <ToggleButton />

              <p
                className="text-skyBlue text-xs font-semibold cursor-pointer"
                onClick={() => setForgotPasswordView(true)}
              >
                Forgot Password ?
              </p>
            </div>

            <button
              onClick={handleSubmit}
              type="button"
              className="w-full flex items-center justify-center bg-skyBlue py-3 rounded-md text-white font-semibold text-sm"
            >
              {!loading ? (
                "Sign in"
              ) : (
                <LoadingSpinner width={5} height={5} color="white" />
              )}
            </button>

            <div className="border-t border-gray-200 my-9" />

            <p className="text-center text-xs">
              Dont have an account?{" "}
              <Link href="/auth/register">
                <a className="text-skyBlue font-semibold">Sign up now</a>
              </Link>
            </p>
          </form>
        ) : (
          <div className="w-full ">
            <h2 className="mt-12 mb-5 text-xl text-black font-bold">
              Forgot Password
            </h2>
            <InputItem
              label={"Email"}
              inputType="email"
              className="mt-3"
              id="email"
              placeholder="Email Address"
              value={emailToPassword}
              onChange={(e) => setEmailToPassword(e.target.value)}
            />

            <div className="mt-4 flex items-center justify-between w-full">
              <button
                className="h-12 w-32 bg-primaryBlue flex items-center justify-center text-white rounded-md"
                onClick={sendPasswordResetLink}
              >
                {sendingResetLink ? (
                  <LoadingSpinner width={5} height={5} color="white" />
                ) : (
                  "Send Link"
                )}
              </button>

              <h2
                className="text-xs cursor-pointer text-gray-400 hover:text-primaryBlue"
                onClick={() => setForgotPasswordView(false)}
              >
                Back to Login
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const InputItem = ({ label, leftComponent, inputType, ...props }) => {
  const [passwordShow, setPasswordShow] = useState(false);

  if (inputType == "password") {
    // Set show/hide function
    inputType = passwordShow ? "text" : "password";

    // Set left Component
    leftComponent = passwordShow ? (
      <div onClick={() => setPasswordShow(false)} className="cursor-pointer">
        <EyeSlashIcon width={18} height={18} className="text-gray-600" />
      </div>
    ) : (
      <div onClick={() => setPasswordShow(true)} className="cursor-pointer">
        <EyeIcon width={18} height={18} className="text-gray-600" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${props?.className}`}>
      <label htmlFor={props?.id} className="text-xs ml-3 mb-2">
        {label}
      </label>
      <div className="flex items-center p-3 px-4 bg-[#eeeeee] border-1-gray-600 rounded-md">
        <input
          type={inputType}
          onChange={props?.onChange}
          placeholder={props?.placeholder}
          className={
            "flex-1 text-sm placeholder:text-gray-600 placeholder:font-light bg-transparent outline-none"
          }
          value={props?.value}
        />
        {leftComponent}
      </div>
    </div>
  );
};

const ToggleButton = () => {
  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label htmlFor="toggleB" className="flex items-center cursor-pointer">
          {/* <!-- toggle --> */}
          <div className="relative">
            {/* <!-- input --> */}
            <input type="checkbox" id="toggleB" className="sr-only" />
            {/* <!-- line --> */}
            <div className="block bg-[#e7e7e7] w-12 h-6 rounded-full"></div>
            {/* <!-- dot --> */}
            <div className="dot absolute left-1 top-1 bg-white shadow-lg w-4 h-4 rounded-full transition"></div>
          </div>
          {/* <!-- label --> */}
          <div className="ml-3 text-xs text-gray-700 font-normal">
            Remember Me
          </div>
        </label>
      </div>
    </div>
  );
};

export default Login;
