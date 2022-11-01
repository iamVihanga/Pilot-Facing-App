import { DashboardLayout, JobListLayout, Mobile_AvailableJob, FullScreenLoading } from "../components";
import { availableJobs } from "../utils/availableJobs_dummy";
import { useSelector } from 'react-redux'
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect } from "react";
import { useRouter } from "next/router";
import extractHash from "../utils/extractHash";

export default function Home() {
  // ----------- screen width -------------
  let screenWidth
  if (typeof window !== "undefined") {
    // Client-side-only code
    screenWidth = window.screen.width
  }
  // ----------------------------------------

  const router = useRouter()
  const activeJob = useSelector(state => state.activeJob.activeJob)
  const { isLoading } = useSessionContext()
  const user = useUser()

  useEffect(() => {
    // console.log(user)
    if (!isLoading && user === null) router.push('/auth/login')
  }, [isLoading])

  return (
    <>
      {(isLoading || !user) ? <FullScreenLoading /> :
        <>
          {(screenWidth < 1024 && Object.keys(activeJob).length !== 0) && <Mobile_AvailableJob />}
          <DashboardLayout
            className={(screenWidth < 1024 && Object.keys(activeJob).length !== 0) && 'hidden'}
            headerComponent={
              <div className="lg:hidden w-full z-10 fixed flex items-center justify-center bg-white">
                <img src={'/assets/logo.jpg'} alt='logo' className='w-[50%] mt-4 mb-3' />
              </div>
            }
          >

            <JobListLayout data={availableJobs} />
          </DashboardLayout>
        </>
      }
    </>
  )
}
