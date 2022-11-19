import React, { useState } from "react";
import {
  updateAuthEmail,
  updateProfilePicture,
  updateUserPassword,
} from "../../config/supabaseFunctions";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { DecryptPassword } from "../../utils/passwordSecure";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ShowPasswordEye, LoadingSpinner } from "../../components";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../redux/currentUser";
import { successToast, errorToast } from "../UI/Toast";

const AccountSettings = ({ user }) => {
  const dispatch = useDispatch();
  const [emailToUpdate, setEmailToUpdate] = useState(
    user?.new_email || user?.email || ""
  );
  const current_profilePicUrl = `${process.env.NEXT_SUPABASE_STORAGE_BASEURL}/profile-pics/${user?.profilePic}`;

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [dpOverlay, setDpOverlay] = useState(false);
  const [profilePic, setProfilePic] = useState(current_profilePicUrl);
  const [uploadingProfilePic, setUploadingProfilePic] = useState(false);
  const [updatingEmail, setUpdatingEmail] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // ----------------------------------------------------------------
  const handleUpdateAuthEmail = async () => {
    try {
      setUpdatingEmail(true);

      const { data, error } = await updateAuthEmail(emailToUpdate);
      if (error) throw new Error("Email update failed !");

      setUpdatingEmail(false);
      successToast("Email Updated !");
    } catch (err) {
      setUpdatingEmail(false);
      errorToast(`Error: ${err.message}`);
    }
  };

  const handleProfilePicureChange = () => {
    var f = document.createElement("input");
    f.style.display = "none";
    f.type = "file";
    f.name = "file";
    f.accept = "image/x-png,image/jpeg";
    f.click();

    f.addEventListener("change", async (e) => {
      try {
        setDpOverlay(true);
        setUploadingProfilePic(true);
        // -------------------------------
        // ***
        const { data, error } = await updateProfilePicture(
          e.target.files[0],
          user.id
        );
        if (error) throw error;

        const pictureUrl = `${process.env.NEXT_SUPABASE_STORAGE_BASEURL}/profile-pics/${data.path}`;
        setProfilePic(pictureUrl);
        dispatch(setCurrentUser({ ...user, profilePic: data.path }));
        // ***
        successToast("Profile Picture Updated !");
        // -------------------------------
        setUploadingProfilePic(false);
        setDpOverlay(false);
      } catch (err) {
        console.log(err);
        errorToast("Error: Profile Picture Update Failed !");
        setUploadingProfilePic(false);
        setDpOverlay(false);
      }
    });
  };

  const handlePasswordUpdate = async () => {
    try {
      setUpdatingPassword(true);
      const res = await updateUserPassword(newPassword, user.email);

      console.log(res);
      setUpdatingPassword(false);
      successToast("Password Updated !");
    } catch (err) {
      setUpdatingPassword(false);
      errorToast("Error: Password update failed !");
    }
  };
  // ----------------------------------------------------------------

  return (
    <div>
      <div className="flex flex-1 h-fit items-center justify-between ">
        <p className="text-black font-bold">Account Settings</p>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/">
            <a className="font-medium text-xs text-gray-400">
              Go to Job Listing
            </a>
          </Link>
          <ArrowRightIcon className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl w-full p-4 pb-8 mt-6">
        {/* Row 1 */}
        <p className="sm:hidden flex font-normal sm:text-base text-xs break-words mb-4">
          Here you can change the credential on which you access the drone pilot
          dashbaord
        </p>
        <div className="flex flex-row gap-2 sm:items-end items-start">
          <div className="flex-1">
            <p className="sm:flex hidden font-normal sm:text-base text-xs break-words">
              Here you can change the credential on which you access the drone
              pilot dashbaord
            </p>

            <p className="text-gray-400 mt-4 sm:text-base text-sm">
              Email Address
            </p>
            <div className="flex flex-row sm:gap-5 gap-2 mt-2">
              <input
                value={emailToUpdate}
                onChange={(e) => setEmailToUpdate(e.target.value)}
                type="text"
                className="form-input sm:w-72 w-full sm:py-3 py-3 px-3 text-base"
                placeholder="Jaime@hysurv.com"
              />
              <button
                onClick={handleUpdateAuthEmail}
                className="sm:py-3 py-3 sm:w-36 w-32 bg-skyBlue sm:text-sm text-xs font-semibold text-white rounded-md flex items-center justify-center"
              >
                {updatingEmail ? (
                  <LoadingSpinner width={5} height={5} color={"white"} />
                ) : (
                  "Change"
                )}
              </button>
            </div>
          </div>

          <div
            className="sm:w-36 w-24 sm:h-36 h-24 cursor-pointer relative overflow-hidden"
            onMouseEnter={() => setDpOverlay(true)}
            onMouseLeave={() => !uploadingProfilePic && setDpOverlay(false)}
          >
            {dpOverlay && (
              <div
                onClick={handleProfilePicureChange}
                className="w-full h-full absolute z-[1000] bg-[#000000a6] rounded-md flex flex-col items-center justify-center"
              >
                {!uploadingProfilePic ? (
                  <>
                    <PencilSquareIcon
                      className="w-6 h-6 text-white"
                      strokeWidth={2}
                    />
                    <p className="text-white text-sm">Edit</p>
                  </>
                ) : (
                  <LoadingSpinner color={"white"} width={5} height={5} />
                )}
              </div>
            )}

            <Image
              src={user.profilePic ? profilePic : "/assets/avatar.jpg"}
              alt=""
              className="rounded-md bg-center"
              layout="fill"
              placeholder="empty"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex lg:flex-row flex-col mt-2 gap-2 sm:items-end items-start w-full">
          <div className="flex-1 lg:max-w-none w-full">
            <p className="text-gray-400 mt-4 sm:text-base text-sm">
              Current Password
            </p>

            <div className="mt-2 form-input sm:w-72 w-full px-3 flex items-center justify-between">
              <input
                type={showCurrentPassword ? "text" : "password"}
                className="text-base py-3 bg-transparent outline-none"
                placeholder="You current password"
                value={DecryptPassword(user.password)}
                disabled
              />

              <ShowPasswordEye
                isVisible={showCurrentPassword}
                setIsVisible={setShowCurrentPassword}
              />
            </div>
          </div>
          <div className="flex-1  lg:max-w-none w-full">
            <p className="text-gray-400 mt-4 sm:text-base text-sm">
              New Password
            </p>

            <div className="mt-2 form-input sm:w-72 w-full px-3 flex items-center justify-between">
              <input
                type={showNewPassword ? "text" : "password"}
                className="text-base py-3 bg-transparent outline-none"
                placeholder=""
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <ShowPasswordEye
                isVisible={showNewPassword}
                setIsVisible={setShowNewPassword}
              />
            </div>
          </div>
          <div className="flex-1  lg:max-w-none w-full">
            <p className="text-gray-400 mt-4 sm:text-base text-sm">
              Repeat Password
            </p>
            <div
              className={`mt-2 form-input sm:w-72 w-full px-3 flex items-center justify-between ${
                newPassword &&
                newPassword.length !== 0 &&
                repeatPassword &&
                repeatPassword.length !== 0 &&
                repeatPassword !== newPassword &&
                "border border-red-500"
              }`}
            >
              <input
                type={showRepeatPassword ? "text" : "password"}
                placeholder=""
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className={`text-base py-3 bg-transparent outline-none`}
              />

              <ShowPasswordEye
                isVisible={showRepeatPassword}
                setIsVisible={setShowRepeatPassword}
              />
            </div>
          </div>

          <div className="sm:mt-0 mt-3">
            <button
              className="py-3 w-32 sm:w-36 bg-skyBlue text-sm font-semibold text-white rounded-md flex items-center justify-center"
              onClick={handlePasswordUpdate}
            >
              {updatingPassword ? (
                <LoadingSpinner width={5} height={5} color={"white"} />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
