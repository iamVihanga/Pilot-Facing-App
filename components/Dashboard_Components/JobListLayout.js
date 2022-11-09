import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowRightIcon, HomeModernIcon } from "@heroicons/react/24/outline";
import JobCard from './JobCard';
import DropdownSelector from './DropdownSelector';

const JobListLayout = ({ data }) => {
    const router = useRouter()
    const isHome = router.pathname === '/'
    const isMyJobs = router.pathname === '/myJobs'
    let dataSet = data

    // Filtering for My Jobs section
    const filterItems = [
        { id: 1, label: 'Every Status' },
        { id: 2, label: 'Live' },
        { id: 3, label: 'Completed' }
    ]
    const [activeFilter, setActiveFilter] = useState(filterItems[0])

    useEffect(() => {
        // Implement API Request for filtering
        // console.log(activeFilter.label)
        // -----------------------------------
    }, [activeFilter])

    // -----------------------------------


    return (
        <div className='w-full  flex flex-row h-full'>
            {/* Job List Area */}
            <div className="flex-1 mx-4 py-7">
                {/* Head */}
                <div className=" flex flex-row w-full justify-between items-center">
                    <div className="flex flex-row gap-3 items-center">
                        <p className="text-black font-bold">Available Jobs</p>
                        <div className="sm:block hidden">
                            {isMyJobs && <DropdownSelector filterItems={filterItems} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />}
                        </div>
                    </div>

                    <div>
                        {isHome &&
                            <div className="flex items-center gap-2">
                                <Link href='/myJobs'>
                                    <a className='font-medium text-xs text-gray-400'>Go to My Jobs</a>
                                </Link>
                                <ArrowRightIcon className='w-4 h-4 text-gray-400' />
                            </div>
                        }
                        {isMyJobs &&
                            <div className="flex items-center gap-2">
                                <Link href='/'>
                                    <a className='font-medium text-xs text-gray-400'>Go to Job Listing</a>
                                </Link>
                                <ArrowRightIcon className='w-4 h-4 text-gray-400' />
                            </div>
                        }

                        <div className="sm:hidden block mt-3">
                            {isMyJobs && <DropdownSelector filterItems={filterItems} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />}
                        </div>
                    </div>
                </div>

                {/* Area */}
                <div className="mt-4 bg-white rounded-lg w-full sm:p-5 p-3 flex flex-col gap-6">
                    {/* Card List */}
                    {dataSet.length !== 0 && dataSet.map(item => <JobCard data={item} key={item.JobID} />)}
                </div>

                {isHome &&
                    <div className="mt-4 grid grid-cols-2 h-36 gap-4">
                        <div className="rounded-md w-full h-full bg-white flex flex-col items-center justify-center">
                            <p className="sm:text-sm text-xs text-gray-400">Total Live Jobs</p>
                            <p className="text-2xl mt-2 text-black font-semibold">3</p>
                            <div className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-500">Live</div>
                        </div>
                        <div className="rounded-md w-full h-full bg-white flex flex-col items-center justify-center">
                            <p className="sm:text-sm text-xs text-gray-400">Total Completed Jobs</p>
                            <p className="text-2xl mt-2 text-black font-semibold">3</p>
                            <div className="px-8 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-500">Completed</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default JobListLayout