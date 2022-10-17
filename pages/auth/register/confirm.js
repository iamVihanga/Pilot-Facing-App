import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { setActiveForm } from "../../../redux/registerSlice";
import { useRouter } from 'next/router'
import { Checkbox } from "../../../components";
import Link from 'next/link'

const Confirm = () => {
    const state = useSelector(state => state.register)
    const dispatch = useDispatch()
    const router = useRouter()
    const [checked, setChecked] = useState(false)

    const handleSubmit = () => {

    }

    return (
        <div className='w-screen h-screen'>
            {/* Logo */}
            <div className="sm:w-[800px] mx-auto sm:px-2 px-5 py-5">
                <img src="/assets/logo.jpg" className='sm:w-[30%] sm:h-[30%] w-[65%] w-[65%]' alt="" />
            </div>

            <div className="max-w-[620px] sm:px-0 px-6 mx-auto flex flex-col mt-16 pb-16 justify-center">
                <div className="">
                    <p className="text-3xl font-normal">Confirm</p>
                </div>

                {/* Contact form Confirmation */}
                <div className="cofirm-card mt-5">
                    <div className="flex flex-1 flex-row gap-16">
                        <div>
                            <p className="text-primaryBlue sm:text-base text-sm font-medium">Name</p>
                            <p className="text-primaryBlue text-xs mt-1">{state.firstName} {state.lastName}</p>

                            <p className="text-primaryBlue sm:text-base text-sm font-medium mt-3">Email Address</p>
                            <p className="text-primaryBlue text-xs mt-1">{state.email}</p>
                        </div>
                        <div>
                            <p className="text-primaryBlue sm:text-base text-sm font-medium">Telephone Number</p>
                            <p className="text-primaryBlue text-xs mt-1">{state.telNumber}</p>

                            <p className="text-primaryBlue sm:text-base text-sm font-medium mt-3">Company</p>
                            <p className="text-primaryBlue text-xs mt-1">{state.company}</p>
                        </div>
                    </div>

                    <PencilSquareIcon
                        className='w-7 text-primaryBlue cursor-pointer'
                        onClick={() => {
                            dispatch(setActiveForm(1))
                            router.push('/auth/register')
                        }}
                    />
                </div>


                {/* Certificate form Confirmation */}
                <div className="cofirm-card mt-5">
                    <div className="flex flex-1 flex-row gap-16">
                        <div>
                            <p className="text-primaryBlue sm:text-base text-sm font-medium">CAA Information</p>
                            <p className="text-primaryBlue text-xs mt-1">Flyer ID: {state.flyerID} &nbsp; Operator ID: {state.operatorID}</p>

                            <p className="text-primaryBlue sm:text-base text-sm font-medium mt-4">Qualifications &amp; Insurances</p>
                            <p className="text-primaryBlue text-xs mt-1">{state.proofDoc !== '' && 'A2CofC Uploaded'} &nbsp; &nbsp; {state.droneInsurance !== '' && 'Insurance Uploaded'}</p>
                        </div>
                    </div>

                    <PencilSquareIcon
                        className='w-7 text-primaryBlue cursor-pointer'
                        onClick={() => {
                            dispatch(setActiveForm(2))
                            router.push('/auth/register')
                        }}
                    />
                </div>


                {/* Equipment form Confirmation */}
                <div className="cofirm-card mt-5">
                    <div className=' flex-1 flex-nowrap'>
                        <p className="text-primaryBlue sm:text-base text-sm font-medium">Skills / Experiences</p>
                        <div className="flex flex-row gap-2 mt-2 flex-wrap">
                            {state.skills.map(skill => (
                                <p className="text-primaryBlue text-xs w-fit" key={skill.id}>{skill.text}, </p>
                            ))}
                        </div>

                        <p className="text-primaryBlue sm:text-base text-sm font-medium mt-4">Equipment</p>
                        <div className="flex flex-row gap-2  mt-2 flex-wrap">
                            {state.equipments.map(equip => (
                                <p className="text-primaryBlue text-xs w-fit" key={equip.id}>{equip.text}, </p>
                            ))}
                        </div>
                    </div>


                    <PencilSquareIcon
                        className='w-7 text-primaryBlue cursor-pointer'
                        onClick={() => {
                            dispatch(setActiveForm(3))
                            router.push('/auth/register')
                        }}
                    />
                </div>


                <div className="my-5 flex flex-row gap-3 items-center">
                    <Checkbox checked={checked} setChecked={setChecked} />
                    <p className="sm:text-base text-sm">I accept the <Link href="#"><a className="font-semibold">Terms and Conditions</a></Link> and the <Link href="#"><a className="font-semibold">Privacy Policy</a></Link></p>
                </div>

                <button onClick={handleSubmit} className='w-full bg-primaryTeal py-3 rounded-md text-white font-semibold text-lg'>Submit Application</button>
            </div>
        </div>
    )
}

export default Confirm