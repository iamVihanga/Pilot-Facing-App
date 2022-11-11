import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from "next/router";
import { HomeIcon, LifebuoyIcon, BookmarkIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { JobDetails_Sidebar } from "../";
import { useSelector, useDispatch } from "react-redux";
import { setActiveJob } from "../../redux/activeJobSlice";

const DashboardLayout = ({ children, className, headerComponent }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const activeNav = router.pathname.slice(1)
  const accountPage = router.pathname === '/dashboard/account'
  const currentUser = useSelector(state => state.currentUser.currentUser)
  
  // ----------- screen width -------------
  let screenWidth
  if (typeof window !== "undefined") {
    // Client-side-only code
    screenWidth = window.screen.width
  }
  // ----------------------------------------

  const handlelogout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    localStorage.clear()
    if (!error) router.push('/')
  }

  return (
    <div className={`${className} w-full min-h-screen flex flex-row gap-2 bg-[#F7F9FA]`}>
      {/* Navigation Bar */}
      <div className="fixed lg:flex hidden min-h-screen  overflow-y-hidden bg-white w-[250px] px-7 py-5 flex-col justify-between">
        <div className="">
          <Link href={"/dashboard"}>
            <img src={'/assets/Duber logo.svg'} alt='logo' className='w-32 mb-5 cursor-pointer' />
          </Link>
          <div className="mt-8 flex flex-col gap-3">
            <Link href='/dashboard' legacyBehavior>
              <a onClick={() => dispatch(setActiveJob(null))} className={`sidenav-item ${activeNav == 'dashboard' && 'active'}`}>
                <HomeIcon className='w-6 h-6' strokeWidth={2} />
                <p className="text-base font-semibold">Job Listings</p>
              </a>
            </Link>
            <Link href='/dashboard/myJobs' legacyBehavior>
              <a onClick={() => dispatch(setActiveJob(null))} className={`sidenav-item ${activeNav == 'dashboard/myJobs' && 'active'}`}>
                <BookmarkIcon className='w-6 h-6' strokeWidth={2} />
                <p className="text-base font-semibold">My Jobs</p>
              </a>
            </Link>
          </div>

          <div className="w-full border-t border-1 border-gray-200 mt-6" />
          <Link href='#' className='mt-4'>
            <a className={`sidenav-item ${activeNav == 'dashboard/support' && 'active'}`}>
              <LifebuoyIcon className='w-6 h-6' strokeWidth={2} />
              <p className="text-base font-semibold">Support</p>
            </a>
          </Link>


          <div className={`sidenav-item mt-3`} onClick={handlelogout}>
            <ArrowRightOnRectangleIcon className='w-6 h-6' strokeWidth={2} />
            <p className="text-base font-semibold">Log out</p>
          </div>
        </div>

        <div>
          <Link href="/dashboard/account">
            <div className={`cursor-pointer px-2 py-2 ${accountPage ? 'bg-primaryBlueLight' : 'bg-slate-300'} rounded-md flex flex-row items-center gap-2`} >
              <Image src="/assets/avatar.jpg" alt="avatar" width={40} height={40} className='rounded-md' />
              
              <div>
                <p className={`font-semibold text-sm ${accountPage ? 'text-primaryBlue' : 'text-black'}`}>{currentUser.firstName} {currentUser.lastName}</p>
                <p className={`font-normal text-xs ${accountPage ? 'text-primaryBlue' : 'text-gray-500'}`}>Drone Pilot</p>
              </div>
            </div>
          </Link>
        </div>

      </div>


      {/* Mobile Header */}
      {headerComponent && headerComponent}

      <div
        className={`lg:ml-[250px] lg:mt-0 lg:mb-0 ml-0 mt-16 mb-16 ${(router.pathname === '/dashboard' || router.pathname === '/dashboard/myJobs') && 'lg:mr-[370px] mr-0'} min-h-screen w-full bg-[#F7F9FA] flex-1`}
      >
        {children}
      </div>

      {/* Mobile Footer */}
      {(router.pathname === '/dashboard' || router.pathname === '/dashboard/myJobs') &&
        <div className="lg:hidden w-full z-10 py-3 fixed bottom-0 flex items-center justify-around bg-white">
          <Link href='/dashboard/'>
            <a className={`sidenav-item-mobile ${activeNav == 'dashboard' && 'active'}`}>
              <HomeIcon className='w-6 h-6' strokeWidth={2} />
              <p className="text-sm font-semibold mt-1">Job Listings</p>
            </a>
          </Link>
          <Link href='/dashboard/myJobs'>
            <a className={`sidenav-item-mobile ${activeNav == 'dashboard/myJobs' && 'active'}`}>
              <BookmarkIcon className='w-6 h-6' strokeWidth={2} />
              <p className="text-sm font-semibold mt-1">My Jobs</p>
            </a>
          </Link>
          <Link href='/dashboard/account'>
            <a className={`sidenav-item-mobile ${activeNav == 'dashboard/account' && 'active'}`}>
              <UserIcon className='w-6 h-6' strokeWidth={2} />
              <p className="text-sm font-semibold mt-1">Account</p>
            </a>
          </Link>
        </div>
      }

      {/* Job Details Drawer */}
      {(router.pathname === '/dashboard' || router.pathname === '/dashboard/myJobs') && <JobDetails_Sidebar />}
    </div>
  )
}

export default DashboardLayout