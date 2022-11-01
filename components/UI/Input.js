import React from 'react'

const Input = ({ className, children, onClick, refItem, ...props }) => {
    return (
        <div {...props} ref={refItem} onClick={onClick} className={`${className} flex items-center justify-start px-3 rounded-md w-full h-12 bg-primaryBlueLight text-primaryBlue`}>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}

export default Input