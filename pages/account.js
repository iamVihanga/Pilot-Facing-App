import React, { useState } from 'react'
import { DashboardLayout, Mobile_SidebarHeader } from '../components'
import { UpdateSkills_Card, UpdateEquipments_Card } from '../components/AccountPage_Components'
import { LightCheckbox } from '../components'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useRouter } from "next/router";

const Account = () => {
    const [proofDoc, setProofDoc] = useState('')
    const [droneInsurance, setDroneInsurance] = useState('')
    const router = useRouter()

    return (
        <DashboardLayout
            headerComponent={
                <Mobile_SidebarHeader onBackPress={() => router.back()} centerComponent={<h2 className="font-semibold">Account</h2>} />
            }
        >
            <div className="w-full h-full px-4 py-8">
                {/* Header */}
                <div className="flex flex-1 h-fit items-center justify-between ">
                    <p className="text-black font-bold">Account Settings</p>
                    <div className="flex items-center gap-2">
                        <Link href='/'>
                            <a className='font-medium text-xs text-gray-400'>Go to Job Listing</a>
                        </Link>
                        <ArrowRightIcon className='w-4 h-4 text-gray-400' />
                    </div>
                </div>

                {/* Card 1 */}
                <div className="bg-white rounded-xl w-full p-4 pb-8 mt-6">
                    {/* Row 1 */}
                    <p className="sm:hidden flex font-normal sm:text-base text-xs break-words mb-4">Here you can change the credential on which you access the drone pilot dashbaord</p>
                    <div className="flex flex-row gap-2 sm:items-end items-start">
                        <div className="flex-1">
                            <p className="sm:flex hidden font-normal sm:text-base text-xs break-words">Here you can change the credential on which you access the drone pilot dashbaord</p>

                            <p className="text-gray-400 mt-4 sm:text-base text-sm">Email Address</p>
                            <div className="flex flex-row sm:gap-5 gap-2 mt-2">
                                <input type="text" className='form-input sm:w-72 w-32 sm:py-3 py-3 px-3 text-xs' placeholder='Jaime@hysurv.com' />
                                <button className='sm:py-3 py-3 sm:px-9 px-3 bg-skyBlue sm:text-sm text-xs font-semibold text-white rounded-md'>Change</button>
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

                {/* Profile Section */}
                <p className="mt-8 text-black font-bold">Profile Settings</p>
                <div className="bg-white rounded-xl w-full px-4 py-8 mt-6">
                    <p className="">Here you can change your personal details and terrotory</p>

                    <div className="flex sm:flex-row flex-col gap-6">
                        <div>
                            {/* First name, last name & mobile number row */}
                            <div className="flex flex-row gap-4 pt-4 pb-4">
                                <div>
                                    <p className="text-gray-400 sm:text-base text-sm">First Name</p>
                                    <input type="text" className='sm:w-32 w-full mt-2 form-input px-3 py-3 text-xs' placeholder='Jaime' />
                                </div>
                                <div>
                                    <p className="text-gray-400 sm:text-base text-sm">Last Name</p>
                                    <input type="text" className='sm:w-32 w-full mt-2 form-input px-3 py-3 text-xs' placeholder='Harris' />
                                </div>
                                <div className='sm:block hidden'>
                                    <p className="text-gray-400 sm:text-base text-sm">Mobile Number</p>
                                    <input type="text" className='mt-2 form-input px-3 py-3 w-52 text-xs' placeholder='07840774043' />
                                </div>
                            </div>
                            <div className='sm:hidden block w-full '>
                                <p className="text-gray-400 text-sm">Mobile Number</p>
                                <input type="text" className='mt-2 form-input px-3 py-3 sm:w-52 w-full text-xs' placeholder='07840774043' />
                            </div>

                            {/* Certificate update form  */}
                            <div>
                                <p className="mt-4 mb-3 text-gray-400 sm:text-base text-sm">CAA Information &amp; Certificates</p>
                                <div className="flex gap-4">
                                    <input type="text" className="form-input sm:w-auto w-full px-3 py-3 text-xs" placeholder='Flyer ID' />
                                    <input type="text" className="form-input sm:w-auto w-full px-3 py-3 text-xs" placeholder='Operator ID' />
                                </div>

                                {/* Proof Doc Upload */}
                                <div className="mt-4 flex max-w-fit sm:flex-row flex-col items-center justify-between w-full h-12 gap-x-2 sm:gap-y-0 gap-y-2">
                                    <div className="whitespace-nowrap sm:w-auto w-full">
                                        <label
                                            htmlFor="file1"
                                            className={`form-input ${proofDoc !== '' && 'success'} sm:w-auto w-full text-xs flex flex-row flex-1 items-center justify-start h-12 cursor-pointer`}>
                                            {proofDoc !== '' ? '"A2 CofC" or GVC Proof Uploaded' : 'Upload "A2 CofC" or GVC Proof'}
                                            <input type="file" id="file1" className="hidden" onChange={(e) => setProofDoc(e.target.files[0])} />
                                        </label>
                                    </div>

                                    <p className="text-primaryBlue">OR</p>

                                    <LightCheckbox text={
                                        <div className=''>
                                            <p className="text-[0.65rem] text-green-500 word-wrap">I can confirm my drone(s) are under 250g and will not operate a drone that is 250g or over.</p>
                                        </div>
                                    } />

                                </div>

                                {/* Drone insurance  */}
                                <label
                                    htmlFor="file2"
                                    className={`sm:mt-4 mt-28 form-input ${droneInsurance !== '' && 'success'} flex flex-1 flex-row items-center justify-start h-12 cursor-pointer`}>
                                    {droneInsurance !== '' ? 'Drone Insurance Uploaded' : 'Upload Drone Insurance'}
                                    <input type="file" id="file2" className="hidden" onChange={(e) => setDroneInsurance(e.target.files[0])} />
                                </label>
                            </div>
                        </div>


                        {/* Update skills and drone equipments */}
                        <div className='flex-1 mt-4'>
                            <p className="text-gray-400 sm:text-base text-sm">My Capabilties</p>
                            <UpdateSkills_Card />

                            <p className="mt-4 text-gray-400 sm:text-base text-sm">My Drones</p>
                            <UpdateEquipments_Card />
                        </div>

                    </div>


                    <div className="sm:mt-3 mt-5 w-full flex flex-row justify-end">
                        <button className="px-6 py-3 bg-primaryBlue rounded-md text-white">Update</button>
                    </div>
                </div>

                {/* Billing Section */}
                <p className="mt-8 text-black font-bold">Billing Details</p>
                <div className="bg-white rounded-xl w-full px-4 py-8 mt-6">
                    <p className="sm:text-base text-sm">Here you can edit your billing detail on which you get paid by us</p>

                    {/* Row 1 */}
                    <div className='mt-5'>
                        <p className="text-gray-400 sm:text-base text-sm">Billing Address</p>
                        <input type="text" className='sm:hidden flex mt-4 w-full form-input text-xs py-3' placeholder='59 Washbrook Road' />
                        <div className="flex flex-row gap-3 mt-3">
                            <input type="text" className='sm:flex hidden w-full form-input text-xs py-3' placeholder='59 Washbrook Road' />
                            <input type="text" className='form-input w-full text-xs py-3' placeholder='Portsmouth' />
                            <input type="text" className='form-input w-full text-xs py-3' placeholder='P06 3SA' />
                            <input type="text" className='sm:flex hidden w-full form-input text-xs py-3' placeholder='United Kingdom' />
                        </div>
                        <input type="text" className='sm:hidden flex mt-3 w-full form-input text-xs py-3' placeholder='United Kingdom' />
                    </div>

                    {/* Row 2 */}
                    <div className='mt-5'>
                        <p className="text-gray-400 sm:text-base text-sm">Bank Details</p>
                        <div className="flex flex-row sm:flex-nowrap flex-wrap justify-between gap-3 mt-3">
                            <input type="text" className='form-input sm:w-full w-[48%] text-xs py-3' placeholder='Sort Code' />
                            <input type="text" className='form-input sm:w-full w-[48%] text-xs py-3' placeholder='Account Number' />
                            <input type="text" className='form-input sm:w-full w-[48%] text-xs py-3' placeholder='Bank Name' />
                            <input type="text" className='form-input sm:w-full w-[48%] text-xs py-3' placeholder='Bank Branch' />
                        </div>
                    </div>

                    {/* row 3 */}
                    <div className="mt-5 w-full">
                        <p className="text-gray-400">Trading Details</p>
                        <div className="flex sm:flex-row flex-col mt-3 gap-6">
                            <div className="flex flex-row gap-4">
                                <LightCheckbox text={<p className='text-sm text-primaryBlue'>Sole Trader</p>} />
                                <LightCheckbox text={<p className='text-sm text-primaryBlue'>Limited</p>} />
                            </div>

                            <input type="text" className='sm:ml-3 ml-0 w-full form-input text-xs py-3' placeholder='NIC Number' />

                            <div className="w-full flex flex-row justify-end">
                                <button className="px-6 py-3 bg-primaryBlue rounded-md text-white">Update</button>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </DashboardLayout>
    )
}

export default Account