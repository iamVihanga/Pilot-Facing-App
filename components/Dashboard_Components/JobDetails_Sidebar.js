import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AcceptJob_DetailsBar from './AcceptJob_DetailsBar'
import { useRouter } from 'next/router'
import formatAMPM from '../../utils/formatTime'
import MapComponent from '../MapComponent'
import { getSingleJob } from "../../config/supabaseFunctions";

const JobDetails_Sidebar = () => {
    const activeJobID = useSelector(state => state.activeJob.activeJob)
    const router = useRouter()
    const [activeJob, setActiveJob] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchActiveJob = async () => {
            try {
                setLoading(true)
                const { data, error } = await getSingleJob(activeJobID)
                if (error) throw new Error('Fetching job details failed !')
                
                setActiveJob(data[0])
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }

        activeJobID !== null && fetchActiveJob()
    }, [activeJobID])
    
    
    return (
        <div className={`fixed lg:block hidden right-0 w-[370px] p-5 h-full bg-white rounded-l-[30px] overflow-y-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-medium`}>
            {(activeJobID !== null && loading) ? (
                <div className="w-full h-full flex items-center justify-center">
                    <svg className="h-8 w-8 animate-spin text-teal-400 text-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            ) :   
            Object.keys(activeJob).length === 0 ?
                <div className='flex items-center justify-center h-full'>
                    <p className="font-semibold text-gray-300">Select a job</p>
                </div>
                : <>
                    <div className="">
                        <MapComponent 
                            center={activeJob.mapData.center} 
                            zoom={activeJob.mapData.zoom}
                            polygon={activeJob.mapData.polygon}
                            area={activeJob.area} 
                        />
                    </div>

                    <p className="mt-5 text-black font-semibold text-2xl">{activeJob.pilotExpertize} <span className='text-gray-300 font-normal'>#{activeJob.id}</span></p>

                    <p className=" text-gray-400 mt-5 font-normal text-xl break-words">{activeJob.address}</p>

                    <p className=" text-black mt-5 font-semibold text-xl break-words">Customers Notes:</p>
                    <p className=" text-black mt-2 font-normal text-sm break-words">{activeJob.customerNote}</p>

                    <p className=" text-black mt-5 font-normal text-xl break-words"><span className='font-semibold'>Start Date:</span> {new Date(activeJob.date).toDateString()}</p>

                    <p className=" text-black mt-6 font-semibold text-xl break-words">Customers Details:</p>
                    <div className={`${activeJob.status === 'Available' && 'blur-sm'}`}>
                        <p className="text-black mt-3 font-normal text-base"><span className="font-semibold">Name: </span>{activeJob.customerID.firstName} {activeJob.customerID.lastName}</p>
                        <p className="text-black mt-3 font-normal text-base"><span className="font-semibold">Email Address: </span>{activeJob.customerID.email}</p>
                        <p className="text-black mt-3 font-normal text-base"><span className="font-semibold">Phone Number: </span>{activeJob.customerID.phoneNumber}</p>
                        <p className="text-black mt-3 font-normal text-base"><span className="font-semibold">Company: </span>{activeJob.customerID.companyName}</p>
                    </div>

                    {console.log(activeJob.status)}
                    {activeJob.status === 'Available' ?
                        <div className='mt-16 mb-7'>
                            <AcceptJob_DetailsBar timestamp={activeJob.date} />
                        </div>
                        :
                        <div className='mt-10 mb-7' onClick={() => router.push(`/${activeJob.id}`)}>
                            <p className="text-2xl font-semibold text-gray-700">Arrival Time {formatAMPM(new Date(activeJob.date))}</p>

                            <div className='mt-3 cursor-pointer bg-teal-300 rounded-md w-full px-3 py-5 flex items-center justify-center'>
                                <p className="text-2xl font-semibold text-white uppercase">View Job</p>
                            </div>
                        </div>
                    }
                </>}
        </div>
    )
}

export default JobDetails_Sidebar