import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className='max-w-screen-md container w-full h-full sm:mx-auto mx-0 lg:px-0 px-5 mb-12'>
            {/* Logo */}
            <img src="/assets/Duber logo.svg" alt="" className='mt-5 w-36' />

            <div className="sm:mt-28 mt-16">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout