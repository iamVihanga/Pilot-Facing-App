import React, { useState } from 'react'


const DropdownSelector = ({ filterItems, activeFilter, setActiveFilter }) => {
    const [menuShow, setMenuShow] = useState(false)

    const handleSelect = (item) => {
        setActiveFilter(item)
        setMenuShow(false)
    }

    return (
        <div className='relative'>
            {/* element */}
            <div className="cursor-pointer flex items-center gap-2 ml-2 px-3 py-1 border border-gray-300 rounded-full" onClick={() => setMenuShow(!menuShow)}>
                <p className="text-xs text-gray-400">{activeFilter.label}</p>
                <svg className='w-4 h-4 mt-[-6px] text-gray-400' fill='lightgray' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
                </svg>
            </div>

            {/* dropdown menu */}
            {menuShow && <div className='absolute bg-white rounded-md py-3 w-36 shadow-xl'>
                {filterItems.map(item =>
                    <p
                        className={`py-2 px-3 w-full ${item.id === activeFilter.id && 'bg-gray-100'} cursor-pointer text-sm ${item.id === activeFilter.id ? 'text-gray-600' : 'text-gray-500'} hover:bg-gray-50`} key={item.label}
                        onClick={() => handleSelect(item)}
                    >{item.label}</p>
                )}
            </div>}
        </div>
    )
}

export default DropdownSelector