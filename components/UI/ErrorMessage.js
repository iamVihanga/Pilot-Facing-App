import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline';

const ErrorMessage = ({ error, setError, className, ...props }) => {
    return (
        <div {...props} className={`${className} px-3 py-3 w-full bg-red-100  mb-5 rounded-md flex items-center`}>
            <XMarkIcon onClick={() => setError(null)} className='w-5 h-5 text-red-500 cursor-pointer mr-3' />
            <p className="text-red-500">{error}</p>
        </div>
    )
}

export default ErrorMessage