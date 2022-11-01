import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Alert = ({ isError, className, message, setError }) => {
    return (
        <div className={`px-2 py-3 w-full ${isError && 'bg-red-100 text-red-500'} rounded-md text-sm ${className} flex items-center gap-x-3`}>
            <XMarkIcon className={`w-4 h-4 cursor-pointer`} onClick={() => setError(false)} />
            <p>{message}</p>
        </div>
    )
}

export default Alert