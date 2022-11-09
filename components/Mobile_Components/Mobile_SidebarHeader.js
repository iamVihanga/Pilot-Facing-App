import React from 'react'
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const Mobile_SidebarHeader = ({ centerComponent, onBackPress }) => {
    return (
        <div className='lg:hidden flex w-full fixed z-[1000] shadow-sm bg-white py-4 px-4 items-center justify-between'>
            <ChevronLeftIcon onClick={onBackPress} className="w-6 h-6" />

            {centerComponent}

            <img src="/assets/Duber Icon.svg" className='w-9 h-9' />
        </div>
    )
}

export default Mobile_SidebarHeader