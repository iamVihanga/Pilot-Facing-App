import React, { useEffect, useState } from 'react'

const AcceptJob_DetailsBar = ({ timestamp }) => {
    const [finish, setFinish] = useState(false)
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        const target = new Date(timestamp)

        const interval = setInterval(() => {
            const now = new Date()
            const difference = target.getTime() - now.getTime()
            setFinish(false)

            const d = Math.floor(difference / (1000 * 60 * 60 * 24))
            setDays(d)

            const h = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )
            setHours(h)

            const m = Math.floor(
                (difference % (1000 * 60 * 60)) / (1000 * 60)
            )
            setMinutes(m)

            const s = Math.floor(
                (difference % (1000 * 60)) / 1000
            )
            setSeconds(s)

            if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
                setFinish(true)
            }

        }, 1000);

        return () => clearInterval(interval)
    }, [timestamp])

    return (
        <div className='cursor-pointer bg-teal-300 rounded-md w-full min-h-5 px-3 py-2 flex items-center justify-between'>
            {/* Remaining Time */}
            <div className="flex items-center gap-x-1">
                <p className={`bg-white rounded-md h-14 flex text-xl items-center justify-center font-semibold w-10 ${finish && 'text-red-500'}`}>{finish ? '00' : minutes}</p>
                <p className="text-white font-semibold text-xl">:</p>
                <p className={`bg-white rounded-md h-14 flex text-xl items-center justify-center font-semibold w-10 ${finish && 'text-red-500'}`}>{finish ? '00' : seconds}</p>
            </div>

            {/* Accept Job */}
            <p className="text-2xl text-white uppercase pr-5">Accept Job</p>
        </div>
    )
}

export default AcceptJob_DetailsBar