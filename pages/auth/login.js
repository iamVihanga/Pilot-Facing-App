import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from 'next/link'
import { useRouter } from "next/router";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        console.log(email, password)
    }

    return (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-screen'>
            <div className="hidden md:block lg:col-span-2">
                <img className='w-full h-full object-cover' src="/assets/loginBG.jpg" />
            </div>

            <div className='flex items-center justify-center px-12'>
                <form>
                    {/* <h2 className='text-logoText font-light'><span className="font-bold">Onthefly</span> DronePilots</h2> */}
                    <img src="/assets/logo.jpg" className='w-[60%] h-[60%]' />
                    <h2 className="mt-12 mb-5 text-xl text-black font-bold">Nice to see you again</h2>

                    <InputItem
                        label={"Login"}
                        inputType="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email or Phone number"
                        value={email}
                    />
                    <InputItem
                        label={"Password"}
                        inputType="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="mt-5"
                        value={password}
                    />

                    <div className="w-full flex items-center flex-nowrap justify-between mt-6 mb-8">
                        <ToggleButton />

                        <Link href='#'>
                            <a className="text-skyBlue text-xs font-semibold">Forgot Password ?</a>
                        </Link>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className='w-full bg-skyBlue py-3 rounded-md text-white font-semibold text-sm'
                    >
                        Sign in
                    </button>

                    <div className='border-t border-gray-200 my-9' />

                    <p className="text-center text-xs">Dont have an account? <Link href='/auth/register'><a className='text-skyBlue font-semibold'>Sign up now</a></Link></p>
                </form>
            </div>
        </div>
    )
}

const InputItem = ({ label, leftComponent, inputType, ...props }) => {
    const [passwordShow, setPasswordShow] = useState(false)

    if (inputType == 'password') {
        // Set show/hide function
        inputType = passwordShow ? 'text' : 'password'

        // Set left Component
        leftComponent = passwordShow ?
            <div onClick={() => setPasswordShow(false)} className="cursor-pointer">
                <EyeSlashIcon width={18} height={18} className="text-gray-600" />
            </div>
            :
            <div onClick={() => setPasswordShow(true)} className="cursor-pointer">
                <EyeIcon width={18} height={18} className="text-gray-600" />
            </div>
    }

    return (
        <div className={`flex flex-col ${props?.className}`}>
            <label htmlFor={props?.id} className="text-xs ml-3 mb-2">{label}</label>
            <div className='flex items-center p-3 px-4 bg-[#F2F2F2] border-1-gray-600 rounded-md'>
                <input
                    type={inputType}
                    onChange={props?.onChange}
                    placeholder={props?.placeholder}
                    className={"flex-1 text-sm placeholder:text-gray-600 placeholder:font-light bg-transparent outline-none"}
                    value={props?.value}
                />
                {leftComponent}
            </div>
        </div>
    )
}

const ToggleButton = () => {
    return (
        <div>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                    {/* <!-- toggle --> */}
                    <div className="relative">
                        {/* <!-- input --> */}
                        <input type="checkbox" id="toggleB" className="sr-only" />
                        {/* <!-- line --> */}
                        <div className="block bg-[#F2F2F2] w-12 h-6 rounded-full"></div>
                        {/* <!-- dot --> */}
                        <div className="dot absolute left-1 top-1 bg-white shadow-lg w-4 h-4 rounded-full transition"></div>
                    </div>
                    {/* <!-- label --> */}
                    <div className="ml-3 text-xs text-gray-700 font-normal">
                        Remember Me
                    </div>
                </label>
            </div>
        </div>
    )
}

export default Login