import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

const CheckboxTeal = ({ checked, setChecked, className, isDisabled }) => {
  const handleCheck = () => {
    if (!isDisabled) setChecked(!checked);
  };

  return (
    <div
      onClick={handleCheck}
      className={`${className} ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      } min-w-[48px] min-h-[48px] ${
        checked ? "bg-primaryTealLight text-white" : "bg-gray-200"
      } rounded-md flex items-center justify-center`}
    >
      {checked && (
        <CheckIcon className="w-6 h-6 text-teal-600" strokeWidth={3} />
      )}
    </div>
  );
};

export default CheckboxTeal;
