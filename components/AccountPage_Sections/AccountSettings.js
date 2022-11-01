import React, { useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { updateAuthEmail } from "../../config/supabaseFunctions";
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const AccountSettings = () => {
    const user = useUser()

    const [emailToUpdate, setEmailToUpdate] = useState(user?.new_email || user?.email || '')

    return (
        <div>
            <div className="flex flex-1 h-fit items-center justify-between ">
                <p className="text-black font-bold">Account Settings</p>
                <div className="flex items-center gap-2">
                    <Link href='/'>
                        <a className='font-medium text-xs text-gray-400'>Go to Job Listing</a>
                    </Link>
                    <ArrowRightIcon className='w-4 h-4 text-gray-400' />
                </div>
            </div>

            <div className="bg-white rounded-xl w-full p-4 pb-8 mt-6">
                {/* Row 1 */}
                <p className="sm:hidden flex font-normal sm:text-base text-xs break-words mb-4">Here you can change the credential on which you access the drone pilot dashbaord</p>
                <div className="flex flex-row gap-2 sm:items-end items-start">
                    <div className="flex-1">
                        <p className="sm:flex hidden font-normal sm:text-base text-xs break-words">Here you can change the credential on which you access the drone pilot dashbaord</p>

                        <p className="text-gray-400 mt-4 sm:text-base text-sm">Email Address</p>
                        <div className="flex flex-row sm:gap-5 gap-2 mt-2">
                            <input value={emailToUpdate} onChange={e => setEmailToUpdate(e.target.value)} type="text" className='form-input sm:w-72 w-32 sm:py-3 py-3 px-3 text-xs' placeholder='Jaime@hysurv.com' />
                            <button onClick={() => updateAuthEmail(emailToUpdate)} className='sm:py-3 py-3 sm:px-9 px-3 bg-skyBlue sm:text-sm text-xs font-semibold text-white rounded-md'>Change</button>
                        </div>
                    </div>
                    <img src="/assets/avatar.jpg" alt="" className='sm:w-36 w-24' />
                </div>

                {/* Row 2 */}
                <div className="flex lg:flex-row flex-col mt-2 gap-2 sm:items-end items-start w-full">
                    <div className="flex-1 lg:max-w-none w-full">
                        <p className="text-gray-400 mt-4 sm:text-base text-sm">Current Password</p>
                        <input type="password" className='mt-2 form-input sm:w-72 w-full py-3 px-3 sm:text-sm text-xs' placeholder='You current password' />
                    </div>
                    <div className="flex-1  lg:max-w-none w-full">
                        <p className="text-gray-400 mt-4 sm:text-base text-sm">New Password</p>
                        <input type="password" className='mt-2 form-input sm:w-72 w-full py-3 px-3 sm:text-sm text-xs' placeholder='' />
                    </div>
                    <div className="flex-1  lg:max-w-none w-full">
                        <p className="text-gray-400 mt-4 sm:text-base text-sm">Repeat Password</p>
                        <input type="password" className='mt-2 form-input sm:w-72 w-full py-3 px-3 sm:text-sm text-xs' placeholder='' />
                    </div>

                    <div className="sm:mt-0 mt-3">
                        <button className='py-3 px-12 bg-skyBlue text-sm font-semibold text-white rounded-md'>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings