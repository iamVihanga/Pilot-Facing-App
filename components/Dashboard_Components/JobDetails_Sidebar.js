import React from 'react'
import { useSelector } from 'react-redux'
import AcceptJob_DetailsBar from './AcceptJob_DetailsBar'
import { useRouter } from 'next/router'
import formatAMPM from '../../utils/formatTime'
import MapComponent from '../MapComponent'

const JobDetails_Sidebar = () => {
    const state = useSelector(state => state.activeJob.activeJob)
    const router = useRouter()

    return (
        <div className={`fixed lg:block hidden right-0 w-[370px] p-5 h-full bg-white rounded-l-[30px] overflow-y-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-medium`}>
            {Object.keys(state).length === 0 ?
                <div className='flex items-center justify-center h-full'>
                    <p className="font-semibold text-gray-300">Select a job</p>
                </div>
                : <>
                    <div className="">
                        <MapComponent />
                    </div>

                    <p className="mt-5 text-black font-semibold text-2xl">{state.title} <span className='text-gray-300 font-normal'>#{state.id}</span></p>

                    <p className=" text-gray-400 mt-5 font-normal text-xl break-words">{state.fullAddress}</p>

                    <p className=" text-black mt-5 font-semibold text-xl break-words">Customers Notes:</p>
                    <p className=" text-black mt-2 font-normal text-base break-words">{state.customerNotes}</p>

                    <p className=" text-black mt-5 font-normal text-xl break-words"><span className='font-semibold'>Start Date:</span> {new Date(state.startDateTime).toDateString()}</p>

                    <p className=" text-black mt-6 font-semibold text-xl break-words">Customers Details:</p>
                    <div className={`${state.state === 'Available' && 'blur-sm'}`}>
                        <p className="text-black mt-3 font-normal text-base"><span className="font-semibold">Name: </span>{state.customerDetails.name}</p>
                        <p className="text-black mt-3 font-normal text-base"><span className="font-semibold">Email Address: </span>{state.customerDetails.email}</p>
                        <p className="text-black mt-3 font-normal text-base"><span className="font-semibold">Phone Number: </span>{state.customerDetails.phoneNumber}</p>
                        <p className="text-black mt-3 font-normal text-base"><span className="font-semibold">Company: </span>{state.customerDetails.company}</p>
                    </div>

                    {state.state === 'Available' ?
                        <div className='mt-16 mb-7'>
                            <AcceptJob_DetailsBar timestamp={state.startDateTime} />
                        </div>
                        :
                        <div className='mt-10 mb-7' onClick={() => router.push(`/${state.id}`)}>
                            <p className="text-2xl font-semibold text-gray-700">Arrival Time {formatAMPM(new Date(state.startDateTime))}</p>

                            <div className='mt-3 cursor-pointer bg-teal-300 rounded-md w-full px-3 py-5 flex items-center justify-center'>
                                {/* Accept Job */}
                                <p className="text-2xl font-semibold text-white uppercase">View Job</p>
                            </div>
                        </div>
                    }
                </>}
        </div>
    )
}

export default JobDetails_Sidebar