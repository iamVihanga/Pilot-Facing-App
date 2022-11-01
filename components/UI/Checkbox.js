import React from 'react'
import { CheckIcon } from "@heroicons/react/24/outline";

const Checkbox = ({ checked, setChecked }) => {
    return (
        <div onClick={() => setChecked(!checked)} className={`cursor-pointer min-w-[35px] min-h-[35px] ${checked ? 'bg-skyBlue text-white' : 'bg-gray-200'} rounded-md flex items-center justify-center`}>
            {checked &&
                <CheckIcon className='w-6 h-6 text-white' strokeWidth={3} />
            }
        </div>
    )
}

export default Checkbox