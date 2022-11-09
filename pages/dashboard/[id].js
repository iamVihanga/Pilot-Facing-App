import React, { useEffect, useState } from 'react'
import { DashboardLayout, MapComponent, Mobile_SidebarHeader } from '../components'
import { useRouter } from 'next/router'
import { myJobs_dummy } from '../../utils/myJobs_dummy'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import formatAMPM from '../../utils/formatTime'
import formatBytes from '../../utils/formatBytes'
import { useDropzone } from 'react-dropzone';
import { useDispatch } from "react-redux";
import { setActiveJob } from "../../redux/activeJobSlice";

const SinglePage = () => {
    const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept } = useDropzone();
    const router = useRouter()
    const dispatch = useDispatch()
    const postId = router.asPath.split('/')[1]
    const [currentJob, setCurrentJob] = useState(myJobs_dummy[0])
    const [loading, setLoading] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState([])

    // Data fetching effect
    useEffect(() => {
        // const job = myJobs_dummy.filter(job => job.id === postId)
        return
    }, [])

    // Upload effect
    useEffect(() => {
        if (acceptedFiles.length !== 0) {
            acceptedFiles.map(file => {
                setUploadedFiles(arr => [...arr, file])
            })
        }
    }, [acceptedFiles])


    // Drop zone files
    const files = uploadedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {formatBytes(file.size)}
        </li>
    ));

    // Navigation back button handler
    const handleBackNavigate = () => {
        dispatch(setActiveJob({}))
        router.back()
    }

    return (
        <DashboardLayout headerComponent={
            <Mobile_SidebarHeader
                onBackPress={handleBackNavigate}
                centerComponent={
                    <div className='flex flex-col items-center'>
                        <p className="text-sm font-semibold">{currentJob.title}</p>
                        <p className="text-xs text-gray-400">#{currentJob.id}</p>
                        <button className={`px-2 py-1 mt-1 text-[.6rem] font-medium rounded-md ${currentJob.state == 'Live' && 'bg-red-100 text-red-500'} ${currentJob.state == 'Completed' && 'bg-blue-100 text-blue-500'} ${currentJob.state == 'Available' && 'bg-green-100 text-green-500'}`}>{currentJob?.state}</button>
                    </div>
                }
            />
        }>
            <div className="w-full h-full px-4 py-8">
                {/* Header */}
                <div className="lg:flex hidden flex-1 h-fit items-center justify-between ">
                    <p className="text-black font-semibold text-2xl">{currentJob.title}
                        <span className='ml-2 text-gray-300 font-normal'>#{currentJob.id}</span>
                        <button className={`w-32 ml-4 py-2 text-sm font-medium ${currentJob.state == 'Live' && 'bg-red-100 text-red-500'} ${currentJob.state == 'Completed' && 'bg-blue-100 text-blue-500'} ${currentJob.state == 'Available' && 'bg-green-100 text-green-500'} rounded-md`}>{currentJob?.state}</button>
                    </p>

                    <div className="flex items-center gap-2">
                        <Link href='/myJobs'>
                            <a className='font-medium text-xs text-gray-400'>Go to My Jobs</a>
                        </Link>
                        <ArrowRightIcon className='w-4 h-4 text-gray-400' />
                    </div>
                </div>

                {/* Content */}
                <div className="mt-5 w-full h-full bg-white rounded-2xl">
                    {/* Map */}
                    <div className='lg:pt-6 pt-3 lg:mx-6 mx-3 shadow-lg rounded-2xl'>
                        <MapComponent />
                    </div>
                    {/* --------------------- */}
                    <div className="lg:mx-12 mx-3 pt-9 grid lg:grid-cols-2 grid-cols-1 gap-x-8 gap-y-5">

                        <p className="text-gray-400 sm:text-lg text-sm">{currentJob.fullAddress}</p>

                        <p className="text-black text-lg"><span className='text-black font-semibold'>Start Date:</span> {new Date(currentJob.startDateTime).toDateString()}</p>

                        <div className='flex justify-center flex-col'>
                            <h2 className='text-black sm:text-lg text-base font-semibold'>Customer Notes:</h2>
                            <h2 className='text-black sm:text-base text-sm'>{currentJob.customerNotes}</h2>
                        </div>

                        <div className='flex justify-center flex-col'>
                            <h2 className='text-black sm:text-lg text-base font-semibold'>Customer Details:</h2>
                            <p className="text-black mt-1 font-normal sm:text-base text-sm"><span className="font-semibold">Name: </span>{currentJob.customerDetails.name}</p>
                            <p className="text-black mt-1 font-normal sm:text-base text-sm"><span className="font-semibold">Email Address: </span>{currentJob.customerDetails.email}</p>
                            <p className="text-black mt-1 font-normal sm:text-base text-sm"><span className="font-semibold">Phone Number: </span>{currentJob.customerDetails.phoneNumber}</p>
                            <p className="text-black mt-1 font-normal sm:text-base text-sm"><span className="font-semibold">Company: </span>{currentJob.customerDetails.company}</p>
                        </div>

                        <h2 className='text-black sm:text-lg text-sm font-semibold'>Upload Deliverables <span className='sm:hidden inline-flex'>&#x28; Arrival Time {formatAMPM(new Date(currentJob.startDateTime))} &#x29;</span></h2>
                        <h2 className='sm:block hidden text-gray-600  font-semibold text-2xl'>Arrival Time {formatAMPM(new Date(currentJob.startDateTime))}</h2>
                    </div>

                    {/* File Upload */}
                    <div className="mt-5 sm:mx-12 mx-3">
                        <section className="cursor-pointer">
                            <div {...getRootProps({ className: `dropzone ${isFocused && 'focused'} ${isDragAccept && 'accept'}` })}>
                                <input {...getInputProps()} />
                                <img src="/assets/folder.png" alt="" className='sm:w-20 w-14 mb-3' />
                                <p className='sm:text-xl text-base text-slate-400'>Drag &apos; Drop or Click to Upload</p>
                            </div>
                            {uploadedFiles.length !== 0 && <aside className='mt-3'>
                                <h4 className='my-2 font-semibold'>Files</h4>
                                <ul>{files}</ul>
                            </aside>}
                        </section>

                        <button className={`${uploadedFiles.length === 0 ? 'disabled bg-gray-400' : 'bg-teal-400'} mt-5 w-full py-5 rounded-lg  text-white sm:text-xl text-base font-semibold`}>Upload file to complete job</button>
                    </div>
                </div>

            </div>
        </DashboardLayout>

    )
}

export default SinglePage