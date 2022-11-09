import { DashboardLayout, JobListLayout, Mobile_AvailableJob, FullScreenLoading } from "../../components";
import { useSelector } from 'react-redux'
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getJobListing } from "../../config/supabaseFunctions";

export default function Home({ jobListing }) {
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
    if (!isLoading && user === null) router.push('/auth/login')
  }, [isLoading])

  return (
    <>
      {/* {(isLoading || !user) ? <FullScreenLoading /> : */}
      <>
        {(screenWidth < 1024 && Object.keys(activeJob).length !== 0) && <Mobile_AvailableJob />}
        <DashboardLayout
          className={(screenWidth < 1024 && Object.keys(activeJob).length !== 0) && 'hidden'}
          headerComponent={
            <div className="lg:hidden w-full z-10 fixed flex items-center justify-center bg-white shadow-md">
              <img src={'/assets/Duber logo.svg'} alt='logo' className='w-32 mt-4 mb-4' />
            </div>
          }
        >

          <JobListLayout data={jobListing} />
        </DashboardLayout>
      </>
      {/* } */}
    </>
  )
}

export async function getServerSideProps() {
  const { data, error } = await getJobListing()

  return {
    props: {
      jobListing: data
    }
  }
}