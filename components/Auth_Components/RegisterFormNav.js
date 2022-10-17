import React from 'react'
import { useSelector } from "react-redux";

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
                <FormNavItem text={'Contact Details'} formRefId={1} />
                <FormNavItem text={'CAA Info & Certificates'} formRefId={2} />
                <FormNavItem text={'Skills & Equipments'} formRefId={3} />
            </div>
        </div>
    )
}

const FormNavItem = ({ text, formRefId }) => {
    let barColor;
    const state = useSelector(state => state.register[`form${formRefId}_state`])
    if (state == 'active') {
        barColor = 'bg-primaryBlue'
    } else if (state == 'completed') {
        barColor = 'bg-primaryTeal'
    } else {
        barColor = 'bg-primaryBlueLight'
    }

    return (
        <div className="md:flex-1 flex-1">
            <p className={`sm:text-base text-xs whitespace-pre-wrap mb-2 ${state !== 'active' ? 'text-gray-300' : 'text-black'}`}>{text}</p>
            <div className={`w-full h-[5px] rounded-full ${barColor}`}></div>
        </div>
    )
}


export default RegisterFormNav