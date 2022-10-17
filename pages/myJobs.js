import React from 'react'
import { DashboardLayout, JobListLayout } from '../components'
import { myJobs_dummy } from "../utils/myJobs_dummy";

const MyJobs = () => {
    return (
        <DashboardLayout
            headerComponent={
                <div className="lg:hidden w-full z-10 fixed flex items-center justify-center bg-white">
                    <img src={'/assets/logo.jpg'} alt='logo' className='w-[50%] mt-4 mb-3' />
                </div>
            }
        >
            <JobListLayout data={myJobs_dummy} />
        </DashboardLayout>
    )
}

export default MyJobs