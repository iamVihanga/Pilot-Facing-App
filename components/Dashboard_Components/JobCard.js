import React, { useState } from 'react'
import { HomeModernIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setActiveJob } from '../../redux/activeJobSlice';
import { useRouter } from "next/router";

const JobCard = ({ data }) => {
    const state = useSelector(state => state.activeJob.activeJob)
    const router = useRouter()
    const dispatch = useDispatch()


    const handleOnClick = () => {
        dispatch(setActiveJob(data))

        if (typeof window !== "undefined" && data.state !== 'Available') {
            // Client-side-only code
            let screenWidth = window.screen.width
            if (screenWidth < 1024) {
                router.push(`/${data.id}`)
            }
        }
    }

    return (
        <div className={`job-card ${state.id == data.id && 'active'}`} onClick={handleOnClick}>
            <HomeModernIcon strokeWidth={.7} className='h-12 max-w-12 text-primaryBlue' />
            <div>
                <p className="text-sm font-semibold text-black">{data?.title}</p>
                <div className="flex flex-row gap-6 items-center">
                    <div className="">
                        <p className="mt-2 sm:text-sm text-xs font-normal text-gray-400">{data?.shortAddress}, {data?.distance}</p>
                    </div>
                    <p className="mt-2 lg:block hidden text-sm font-normal text-gray-400">{new Date(data?.startDateTime).toDateString()}</p>
                    <p className="mt-2 lg:block hidden text-sm font-semibold text-black">{data?.area}m<sup>2</sup></p>
                </div>
            </div>
            <div className="">
                <p className="block sm:hidden text-center mb-5 text-sm font-semibold text-black">{data?.area}m<sup>2</sup></p>
                <button className={`px-4 py-2 text-sm font-medium ${data.state == 'Live' && 'bg-red-100 text-red-500'} ${data.state == 'Completed' && 'bg-blue-100 text-blue-500'} ${data.state == 'Available' && 'bg-green-100 text-green-500'} rounded-md`}>{data?.state}</button>
            </div>
        </div>
    )
}

export default JobCard