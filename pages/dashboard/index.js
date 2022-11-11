import { useEffect } from "react";
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from "../../redux/currentUser";

import { DashboardLayout, JobListLayout, Mobile_AvailableJob } from "../../components";
import { getJobListing, getUserByEmail } from "../../config/supabaseFunctions";

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
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading && user === null) router.push('/auth/login')

    // Get current user and save data as global state
    const getUserData = async () => {
      const { data, error } = await getUserByEmail(user.email)
      if (error) return

      dispatch(setCurrentUser(data[0]))
    }

    if (!isLoading && user) {
      getUserData()
    }
  }, [isLoading])


  return (
    <>
    
      {(screenWidth < 1024 && activeJob !== null) && <Mobile_AvailableJob />}
      <DashboardLayout
        className={(screenWidth < 1024 && activeJob !== null) && 'hidden'}
        headerComponent={
          <div className="lg:hidden w-full z-10 fixed flex items-center justify-center bg-white shadow-md">
            <img src={'/assets/Duber logo.svg'} alt='logo' className='w-32 mt-4 mb-4' />
          </div>
        }
      >

        <JobListLayout data={jobListing} />
      </DashboardLayout>
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