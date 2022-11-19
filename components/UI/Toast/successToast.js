import toast from "react-hot-toast";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

const successToast = (text) =>
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-sm w-full bg-teal-200 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-teal-600 ring-opacity-5 py-3 px-3 items-center justify-between`}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-md bg-teal-300 flex items-center justify-center mr-3">
          <CheckIcon className="w-5 h-5 text-teal-500" strokeWidth={3} />
        </div>

        <p className="text-teal-600">{text}</p>
      </div>
      <XMarkIcon
        onClick={() => toast.dismiss(t.id)}
        className="cursor-pointer w-5 h-5 text-teal-600"
      />
    </div>
  ));

export default successToast;
