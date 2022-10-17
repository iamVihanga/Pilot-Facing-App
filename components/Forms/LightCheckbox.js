import React, { useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'

const LightCheckbox = ({ text }) => {
    const [checked, setChecked] = useState(false)

    return (
        <div className='flex items-center gap-3'>
            <div
                onClick={() => setChecked(!checked)}
                className={`flex items-center justify-center w-12 h-12 rounded-md ${checked ? 'bg-green-200' : 'bg-primaryBlueLight'} `}
            >
                {checked && <CheckIcon className='w-7 h-7 text-green-500' />}
            </div>
            {text}
        </div>
    )
}

export default LightCheckbox