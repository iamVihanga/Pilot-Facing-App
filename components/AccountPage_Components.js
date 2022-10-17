import React, { useState } from 'react'

export const UpdateSkills_Card = () => {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className="mt-2 w-full min-h-32 p-2 pb-4 rounded bg-primaryBlueLight relative">
            {/* input container */}
            <div className="flex items-center gap-2">
                <div onClick={() => setShowMenu(!showMenu)} className="flex-1 cursor-pointer flex items-center justify-between border border-primaryBlue p-2 rounded-md">
                    <p className="text-xs text-primaryBlue">Select Capabilities</p>
                    <svg className='w-4 h-4 mt-[-6px] text-gray-400' fill='#2263DF' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
                    </svg>
                </div>

                <button className='bg-primaryBlue text-white text-sm px-5 h-full py-2 rounded-md'>Add</button>
            </div>

            {/* Menu */}
            {showMenu && (
                <div className="absolute w-[83%] rounded-md shadow-xl mt-[.5] p-5 bg-white"></div>
            )}

            {/* Items container */}
            <div className="mt-3 flex flex-wrap gap-3 items-start">
                <p className="badge">Building Inspection</p>
            </div>
        </div>
    )
}

export const UpdateEquipments_Card = () => {
    const [showBrandMenu, setBrandMenu] = useState(false)
    const [showModalMenu, setModalMenu] = useState(false)

    return (
        <div className="mt-2 w-full min-h-32 p-2 pb-4 rounded bg-primaryBlueLight relative">
            {/* input container */}
            <div className="flex items-center">
                <div onClick={() => setBrandMenu(!showBrandMenu)} className="flex-1 cursor-pointer flex items-center justify-between border border-primaryBlue p-2 rounded-l-md">
                    <p className="text-xs text-primaryBlue">Select Modal</p>
                    <svg className='w-4 h-4 mt-[-6px] text-gray-400' fill='#2263DF' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
                    </svg>
                </div>
                <div onClick={() => setModalMenu(!showModalMenu)} className="flex-1 cursor-pointer flex items-center justify-between border border-primaryBlue p-2 rounded-r-md">
                    <p className="text-xs text-primaryBlue">Select Modal</p>
                    <svg className='w-4 h-4 mt-[-6px] text-gray-400' fill='#2263DF' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
                    </svg>
                </div>

                <button className='ml-2 bg-primaryBlue text-white text-sm px-5 h-full py-2 rounded-md'>Add</button>
            </div>

            {/* Menu */}
            {(!showModalMenu && showBrandMenu) && (
                <div className="absolute w-[83%] rounded-md shadow-xl mt-[.5] p-5 bg-white"></div>
            )}
            {(!showBrandMenu && showModalMenu) && (
                <div className="absolute w-[83%] rounded-md shadow-xl mt-[.5] p-5 bg-white"></div>
            )}

            {/* Items container */}
            <div className="mt-3 flex gap-2 flex-wrap items-start">
                <p className="badge">DJI, Marvic Mini 2</p>
            </div>
        </div>
    )
}