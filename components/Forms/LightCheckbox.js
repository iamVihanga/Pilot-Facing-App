import React, { useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'

const LightCheckbox = ({ text, setChecked, isChecked, disabled }) => {
    // const [checked, setChecked] = useState(false)
    const nullFunction = () => {
        return
    }

    return (
        <div className='flex items-center gap-3'>
            <div
                onClick={() => !disabled ? setChecked(!isChecked) : nullFunction()}
                className={`${!disabled ? 'cursor-pointer' : 'cursor-not-allowed'} flex items-center justify-center w-12 h-12 rounded-md ${isChecked ? 'bg-green-200' : 'bg-primaryBlueLight'} `}
            >
                {isChecked && <CheckIcon className='w-7 h-7 text-green-500' />}
            </div>
            {text}
        </div>
    )
}

export default LightCheckbox