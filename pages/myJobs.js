import React from 'react'
import { DashboardLayout, JobListLayout } from '../components'
import { myJobs_dummy } from "../utils/myJobs_dummy";

const MyJobs = () => {
    return (
        <DashboardLayout
            headerComponent={
                <div className="lg:hidden w-full z-10 fixed flex items-center justify-center bg-white shadow-md">
                    <img src={'/assets/Duber logo.svg'} alt='logo' className='w-32 mt-4 mb-4' />
                </div>
            }
        >
            <JobListLayout data={myJobs_dummy} />
        </DashboardLayout>
    )
}

export default MyJobs