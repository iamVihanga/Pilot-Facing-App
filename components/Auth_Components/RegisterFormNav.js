import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { CheckIcon, PhoneIcon, PhotoIcon, UserIcon } from "@heroicons/react/24/outline";
import { setActiveForm, switchForm } from "../../redux/registerSlice";

const RegisterFormNav = () => {
    return (
        <div className="">
            <div className="sm:flex hidden w-full items-center justify-center gap-3">
                {/* Form Nav => Item */}
                <FormNavItem text={'Contact Details'} formRefId={1} />
                <FormNavItem text={'CAA Info & Certificates'} formRefId={2} />
                <FormNavItem text={'Skills & Equipments'} formRefId={3} />
            </div>

            {/* Mobile */}
            <div className="sm:hidden grid grid-cols-3 gap-x-3 items-end">
                <FormNavItem icon={<PhoneIcon className='w-6 h-6' />} formRefId={1} />
                <FormNavItem icon={<PhotoIcon className='w-6 h-6' />} formRefId={2} />
                <FormNavItem icon={<UserIcon className='w-6 h-6' />} formRefId={3} />
            </div>
        </div>
    )
}

const FormNavItem = ({ text, formRefId, icon }) => {
    let barColor;
    let iconColor;
    const dispatch = useDispatch()
    const state = useSelector(state => state.register[`form${formRefId}_state`])
    const isUpdateMode = useSelector(state => state.register[`form${formRefId}_updateMode`])

    const handleClick = () => {
        if (isUpdateMode || state === 'active') {
            dispatch(switchForm(formRefId))
        }
    }

    if (state == 'active') {
        barColor = 'bg-primaryBlue'
        iconColor = 'text-primaryBlue'
    } else if (state == 'completed') {
        barColor = 'bg-primaryTeal'
        iconColor = 'text-primaryTeal'
    } else {
        barColor = 'bg-primaryBlueLight'
        iconColor = 'text-primaryBlueLight'
    }

    return (
        <div className={`md:flex-1 flex-1 ${state == 'active' || state == 'completed' ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={handleClick}>
            <p className={`sm:hidden flex items-center justify-center ${iconColor} mb-3`}>{state !== 'completed' ? icon : <CheckIcon className='w-6 h-6' />}</p>
            <p className={`sm:flex hidden text-base whitespace-pre-wrap mb-2 ${state !== 'active' ? 'text-gray-300' : 'text-black'}`}>{text}</p>
            <div className={`w-full h-[5px] rounded-full ${barColor}`}></div>
        </div>
    )
}


export default RegisterFormNav