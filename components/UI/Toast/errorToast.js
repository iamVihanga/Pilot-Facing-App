import toast from "react-hot-toast";
import {
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const errorToast = (text) =>
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-sm w-full bg-red-200 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-red-600 ring-opacity-5 py-3 px-3 items-center justify-between`}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-md bg-red-300 flex items-center justify-center mr-3">
          <ExclamationTriangleIcon
            className="w-5 h-5 text-red-500"
            strokeWidth={2}
          />
        </div>

        <p className="text-red-600">{text}</p>
      </div>
      <XMarkIcon
        onClick={() => toast.dismiss(t.id)}
        className="cursor-pointer w-5 h-5 text-red-600"
      />
    </div>
  ));

export default errorToast;
