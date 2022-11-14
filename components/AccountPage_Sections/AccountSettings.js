import React, { useState } from "react";
import {
  updateAuthEmail,
  updateProfilePicture,
} from "../../config/supabaseFunctions";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { DecryptPassword } from "../../utils/passwordSecure";
import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const AccountSettings = ({ user }) => {
  const [emailToUpdate, setEmailToUpdate] = useState(
    user?.new_email || user?.email || ""
  );
  const current_profilePicUrl = `${process.env.NEXT_SUPABASE_STORAGE_BASEURL}/profile-pics/${user?.profilePic}`;

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState(null);

  const [dpOverlay, setDpOverlay] = useState(false);
  const [profilePic, setProfilePic] = useState(current_profilePicUrl);
  const [uploadingProfilePic, setUploadingProfilePic] = useState(false);

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
        // ***
        // -------------------------------
        setUploadingProfilePic(false);
        setDpOverlay(false);
      } catch (err) {
        console.log(err);
        setUploadingProfilePic(false);
        setDpOverlay(false);
      }
    });
  };

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
                className="form-input sm:w-72 w-32 sm:py-3 py-3 px-3 text-xs"
                placeholder="Jaime@hysurv.com"
              />
              <button
                onClick={() => updateAuthEmail(emailToUpdate)}
                className="sm:py-3 py-3 sm:px-9 px-3 bg-skyBlue sm:text-sm text-xs font-semibold text-white rounded-md"
              >
                Change
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
                className="w-full h-full absolute bg-[#000000a6] rounded-md flex flex-col items-center justify-center"
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
              </div>
            )}

            <img
              src={user.profilePic ? profilePic : "/assets/avatar.jpg"}
              alt=""
              className="rounded-md bg-center"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex lg:flex-row flex-col mt-2 gap-2 sm:items-end items-start w-full">
          <div className="flex-1 lg:max-w-none w-full">
            <p className="text-gray-400 mt-4 sm:text-base text-sm">
              Current Password
            </p>
            <input
              type={showCurrentPassword ? "text" : "password"}
              className="mt-2 form-input sm:w-72 w-full py-3 px-3 sm:text-sm text-xs"
              placeholder="You current password"
              value={DecryptPassword(user.password)}
            />
          </div>
          <div className="flex-1  lg:max-w-none w-full">
            <p className="text-gray-400 mt-4 sm:text-base text-sm">
              New Password
            </p>
            <input
              type="password"
              className="mt-2 form-input sm:w-72 w-full py-3 px-3 sm:text-sm text-xs"
              placeholder=""
            />
          </div>
          <div className="flex-1  lg:max-w-none w-full">
            <p className="text-gray-400 mt-4 sm:text-base text-sm">
              Repeat Password
            </p>
            <input
              type="password"
              className="mt-2 form-input sm:w-72 w-full py-3 px-3 sm:text-sm text-xs"
              placeholder=""
            />
          </div>

          <div className="sm:mt-0 mt-3">
            <button className="py-3 px-12 bg-skyBlue text-sm font-semibold text-white rounded-md">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
