import React from 'react'
import { RegisterFormArea, RegisterFormNav } from '../../../components';

const Register = () => {
    return (
        <div className='w-screen h-screen'>
            {/* Logo */}
            <div className="sm:w-[800px] mx-auto sm:px-2 px-5 py-5">
                <img src="/assets/logo.jpg" className='sm:w-[30%] sm:h-[30%] w-[65%] w-[65%]' alt="" />
            </div>

            {/* Form */}
            <div className="flex flex-col mt-16 pb-16 justify-center">
                <div className="sm:min-w-[700px] sm:mx-auto mx-4">
                    {/* Form Nav */}
                    <RegisterFormNav />

                    {/* Form Area */}
                    <RegisterFormArea />
                </div>
            </div>
        </div>
    )
}

export default Register