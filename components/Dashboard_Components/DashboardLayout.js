import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HomeIcon, LifebuoyIcon, BookmarkIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useRouter } from "next/router";
import { JobDetails_Sidebar } from "../";
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { getUserByEmail } from "../../config/supabaseFunctions";

const DashboardLayout = ({ children, className, headerComponent }) => {
  const router = useRouter()
  const activeNav = router.pathname.slice(1)
  const accountPage = router.pathname === '/account'
  const { supabaseClient } = useSessionContext()
  const [loading, setLoading] = useState(true)
  const user = useUser()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  // ----------- screen width -------------
  let screenWidth
  if (typeof window !== "undefined") {
    // Client-side-only code
    screenWidth = window.screen.width
  }
  // ----------------------------------------

  useEffect(() => {
    const getUserInfo = async () => {
      setLoading(true)
      try {
        const { data, error } = await getUserByEmail(user.email)

        if (error) throw error

        if (data) {
          setFirstName(data[0].firstName)
          setLastName(data[0].lastName)
          setLoading(false)
        }
      } catch (err) {
        console.log(err)
      }
    }

    // Avoit data fetching when md, sm screens
    if (screenWidth > 1023) {

      getUserInfo()
    }
  }, [])


  const handlelogout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    if (!error) router.reload('/')
  }

  return (
    <div className={`${className} w-full min-h-screen flex flex-row gap-2 bg-[#F7F9FA]`}>
      {/* Navigation Bar */}
      <div className="fixed lg:flex hidden min-h-screen  overflow-y-hidden bg-white w-[250px] px-7 py-5 flex-col justify-between">
        <div className="">
          <Link href={"/"}>
            <img src={'/assets/logo.jpg'} alt='logo' className='w-[100%] mb-5 cursor-pointer' />
          </Link>
          <div className="flex flex-col gap-3">
            <Link href='/'>
              <a className={`sidenav-item ${activeNav == '' && 'active'}`}>
                <HomeIcon className='w-6 h-6' strokeWidth={2} />
                <p className="text-base font-semibold">Job Listings</p>
              </a>
            </Link>
            <Link href='/myJobs'>
              <a className={`sidenav-item ${activeNav == 'myJobs' && 'active'}`}>
                <BookmarkIcon className='w-6 h-6' strokeWidth={2} />
                <p className="text-base font-semibold">My Jobs</p>
              </a>
            </Link>
          </div>

          <div className="w-full border-t border-1 border-gray-200 mt-6" />
          <Link href='#' className='mt-4'>
            <a className={`sidenav-item ${activeNav == 'support' && 'active'}`}>
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
          <Link href="/account">
            <div className={`cursor-pointer px-2 py-2 ${accountPage ? 'bg-primaryBlueLight' : 'bg-slate-300'} rounded-md flex flex-row items-center gap-2`} >
              <Image src="/assets/avatar.jpg" alt="avatar" width={40} height={40} className='rounded-md' />

              {loading ?
                <div>
                  <div className={`min-w-[115px] min-h-[15px] rounded-full font-semibold text-sm bg-gray-400 opacity-70`}></div>
                  <div className={`min-w-[115px] min-h-[10px] mt-1 rounded-full font-normal text-xs bg-gray-400 opacity-70`}></div>
                </div>
                :
                <div>
                  <p className={`font-semibold text-sm ${accountPage ? 'text-primaryBlue' : 'text-black'}`}>{firstName} {lastName}</p>
                  <p className={`font-normal text-xs ${accountPage ? 'text-primaryBlue' : 'text-gray-500'}`}>Drone Pilot</p>
                </div>
              }
            </div>
          </Link>
        </div>

      </div>


      {/* Mobile Header */}
      {headerComponent && headerComponent}

      <div
        className={`lg:ml-[250px] lg:mt-0 lg:mb-0 ml-0 mt-16 mb-16 ${(router.pathname === '/' || router.pathname === '/myJobs') && 'lg:mr-[370px] mr-0'} min-h-screen w-full bg-[#F7F9FA] flex-1`}
      >
        {children}
      </div>

      {/* Mobile Footer */}
      {(router.pathname === '/' || router.pathname === '/myJobs') &&
        <div className="lg:hidden w-full z-10 py-3 fixed bottom-0 flex items-center justify-around bg-white">
          <Link href='/'>
            <a className={`sidenav-item-mobile ${activeNav == '' && 'active'}`}>
              <HomeIcon className='w-6 h-6' strokeWidth={2} />
              <p className="text-sm font-semibold mt-1">Job Listings</p>
            </a>
          </Link>
          <Link href='/myJobs'>
            <a className={`sidenav-item-mobile ${activeNav == 'myJobs' && 'active'}`}>
              <BookmarkIcon className='w-6 h-6' strokeWidth={2} />
              <p className="text-sm font-semibold mt-1">My Jobs</p>
            </a>
          </Link>
          <Link href='/account'>
            <a className={`sidenav-item-mobile ${activeNav == 'account' && 'active'}`}>
              <UserIcon className='w-6 h-6' strokeWidth={2} />
              <p className="text-sm font-semibold mt-1">Account</p>
            </a>
          </Link>
        </div>
      }

      {/* Job Details Drawer */}
      {(router.pathname === '/' || router.pathname === '/myJobs') && <JobDetails_Sidebar />}
    </div>
  )
}

export default DashboardLayout