import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Mobile_SidebarHeader from './Mobile_SidebarHeader'
import { setActiveJob } from "../../redux/activeJobSlice";
import MapComponent from '../MapComponent'
import AcceptJob_DetailsBar from '../Dashboard_Components/AcceptJob_DetailsBar';

const AvailableJob_Mobile = () => {
  const dispatch = useDispatch()
  const activeJob = useSelector(state => state.activeJob.activeJob)

  const handleBack = () => {
    dispatch(setActiveJob({}))
  }

  return (
    <div className={`lg:hidden absolute z-20 top-0 left-0 bg-[#F7F9FA] w-full h-full`}>
      {/* Header */}
      <Mobile_SidebarHeader
        onBackPress={handleBack}
        centerComponent={
          <div className='flex flex-col items-center'>
            <p className="text-sm font-semibold">{activeJob.title}</p>
            <p className="text-xs text-gray-400">#{activeJob.id}</p>
            <button className={`px-2 py-1 mt-1 text-[.6rem] font-medium bg-green-100 text-green-500 rounded-md`}>{activeJob?.state}</button>
          </div>
        }
      />

      {/* Content */}
      <div className='mt-32'>
        <div className="m-3 bg-white rounded-xl p-2">
          <div className="">
            <MapComponent />
          </div>

          <p className=" text-gray-400 mt-5 font-normal text-base break-words">{activeJob.fullAddress}</p>

          <p className=" text-black mt-5 font-normal text-xl break-words"><span className='font-semibold'>Start Date:</span> {new Date(activeJob.startDateTime).toDateString()}</p>

          <p className=" text-black mt-5 font-semibold text-lg break-words">Customers Notes:</p>
          <p className=" text-black mt-2 font-normal text-sm break-words">{activeJob.customerNotes}</p>


          <p className=" text-black mt-6 font-semibold text-lg break-words">Customers Details:</p>
          <div className={`${activeJob.state === 'Available' && 'blur-sm'}`}>
            <p className="text-black mt-3 font-normal text-sm"><span className="font-semibold">Name: </span>{activeJob.customerDetails.name}</p>
            <p className="text-black mt-3 font-normal text-sm"><span className="font-semibold">Email Address: </span>{activeJob.customerDetails.email}</p>
            <p className="text-black mt-3 font-normal text-sm"><span className="font-semibold">Phone Number: </span>{activeJob.customerDetails.phoneNumber}</p>
            <p className="text-black mt-3 font-normal text-sm"><span className="font-semibold">Company: </span>{activeJob.customerDetails.company}</p>
          </div>

          <div className=' mt-16 mb-7'>
            <AcceptJob_DetailsBar timestamp={activeJob.startDateTime} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default AvailableJob_Mobile