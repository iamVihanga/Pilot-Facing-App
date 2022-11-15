import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const ShowPasswordEye = ({ isVisible, setIsVisible, ...props }) => {
  return (
    <div
      className={`cursor-pointer ${props.className}`}
      {...props}
      onClick={() => setIsVisible(!isVisible)}
    >
      {!isVisible ? (
        <EyeIcon className="text-primaryBlue w-5 h-5" />
      ) : (
        <EyeSlashIcon className="text-primaryBlue w-5 h-5" />
      )}
    </div>
  );
};

export default ShowPasswordEye;
