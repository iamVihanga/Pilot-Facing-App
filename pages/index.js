import { DashboardLayout, JobListLayout, Mobile_AvailableJob } from "../components";
import { availableJobs } from "../utils/availableJobs_dummy";
import { useSelector } from 'react-redux'

export default function Home() {
  const activeJob = useSelector(state => state.activeJob.activeJob)
  let screenWidth

  if (typeof window !== "undefined") {
    // Client-side-only code
    screenWidth = window.screen.width
  }

  return (
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
  )
}

export const getServerSideProps = async (context) => {
  const token = true
  if (context.res && !token) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login'
      }
    }
  }

  return {
    props: { token }
  }
}
