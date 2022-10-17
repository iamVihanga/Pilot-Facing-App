import React, { useState } from 'react'
import { CheckIcon } from "@heroicons/react/24/solid";

const Checkbox = ({ checked, setChecked }) => {
    return (
        <div
            onClick={() => setChecked(!checked)}
            className={`w-9 h-9 flex items-center justify-center ${checked ? 'bg-primaryBlue' : 'bg-gray-300'} cursor-pointer rounded-md transition-all ease-in-out duration-100`
            }>
            {checked && <CheckIcon className={`${checked ? 'text-white' : 'hidden'} w-5 h-5`} strokeWidth={5} />}
        </div>
    )
}

export default Checkbox