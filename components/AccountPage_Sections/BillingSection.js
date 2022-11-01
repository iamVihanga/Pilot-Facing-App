import React, { useState, useEffect } from 'react'
import { LightCheckbox } from '../'
import { useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { getUserByEmail } from "../../config/supabaseFunctions";

const BillingSection = () => {
    const user = useUser()
    const { supabaseClient } = useSessionContext()
    // ----------------- Element States ---------------------
    const [userID, setUserID] = useState(null)

    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const [bankSortCode, setBankSortCode] = useState('')
    const [bankAccountNumber, setBankAccountNumber] = useState('')
    const [bankName, setBankName] = useState('')
    const [bankBranch, setBankBranch] = useState('')
    const [tradeType, setTradeType] = useState('')
    const [NIC, setNIC] = useState('')

    const [soleTrader, setSoleTrader] = useState(false)
    const [limited, setLimited] = useState(false)

    const [loading, setLoading] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [error, setError] = useState(null)
    // ------------------------------------------------------

    useEffect(() => {
        if (soleTrader) {
            setLimited(false)
            setTradeType('sole')
        }
        if (limited) {
            setSoleTrader(false)
            setTradeType('limited')
        }
    }, [soleTrader, limited])


    useEffect(() => {
        const initializeData = async () => {
            setLoading(true)
            try {
                const { data: userID_arr, error: getIdError } = await supabaseClient
                    .from('Employees')
                    .select('id')
                    .eq('email', user.email)

                if (getIdError) throw getIdError
                if (userID_arr) setUserID(userID_arr[0].id)

                // -------------------------------------------
                // GET USER DETAILS
                const { data, error } = await supabaseClient
                    .from('EmployeeBilling')
                    .select()
                    .eq('userId', userID_arr[0].id)

                if (error) throw error

                if (data) {
                    setStreet(data[0].street)
                    setCity(data[0].city)
                    setPostalCode(data[0].postCode)
                    setCountry(data[0].country)
                    setBankSortCode(data[0].bankSortCode)
                    setBankAccountNumber(data[0].bankAccountNumber)
                    setBankName(data[0].bankName)
                    setBankBranch(data[0].bankBranch)
                    setTradeType(data[0].tradeType)
                    setNIC(data[0].NIC)
                }
                // -------------------------------------------

                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }

        initializeData()
    }, [])

    useEffect(() => {
        if (tradeType === 'sole') {
            setSoleTrader(true)
        }
        if (tradeType === 'limited') {
            setLimited(true)
        }
    }, [tradeType])



    const handleUpdate = async () => {
        try {
            setUpdating(true)
            if (userID) {
                const { data: checkExits, error: checkExitsErr } = await supabaseClient.from('EmployeeBilling').select('*').eq('userId', userID)
                if (checkExitsErr) throw checkExitsErr

                // Insert first record
                if (checkExits.length <= 0) {
                    const { data: insertData, error: insertErr } = await supabaseClient
                        .from('EmployeeBilling')
                        .insert([{
                            userId: userID,
                            street,
                            city,
                            postCode: postalCode,
                            country,
                            bankSortCode,
                            bankAccountNumber,
                            bankName,
                            bankBranch,
                            tradeType,
                            NIC
                        }])

                    if (insertErr) throw insertErr
                    console.log(insertData)
                } else {
                    const { data: updateData, error: updateErr } = await supabaseClient
                        .from('EmployeeBilling')
                        .update({
                            userId: userID,
                            street,
                            city,
                            postCode: postalCode,
                            country,
                            bankSortCode,
                            bankAccountNumber,
                            bankName,
                            bankBranch,
                            tradeType,
                            NIC
                        })
                        .eq('userId', userID)

                    if (updateErr) throw updateErr

                    console.log(updateData)
                }
            }
            setUpdating(false)
        } catch (err) {
            console.log(err)
            setUpdating(false)
            setError(err)
        }
    }

    if (loading) {
        return <div className='bg-white rounded-xl w-full flex items-center justify-center px-4 py-12 mt-8'>
            <svg className="h-5 w-5 animate-spin text-skyBlue text-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    }

    return (
        <div>
            <p className="mt-8 text-black font-bold">Billing Details</p>
            <div className="bg-white rounded-xl w-full px-4 py-8 mt-6">
                <p className="sm:text-base text-sm">Here you can edit your billing detail on which you get paid by us</p>

                {error && <p className='text-red-500 text-xs my-2'>{error.message}</p>}

                {/* Row 1 */}
                <div className='mt-5'>
                    <p className="text-gray-400 sm:text-base text-sm">Billing Address</p>
                    <input value={street} onChange={e => setStreet(e.target.value)} type="text" className='sm:hidden flex mt-4 w-full form-input text-xs py-3' placeholder='59 Washbrook Road' />
                    <div className="flex flex-row gap-3 mt-3">
                        <input value={street} onChange={e => setStreet(e.target.value)} type="text" className='sm:flex hidden w-full form-input text-xs py-3' placeholder='Street' />
                        <input value={city} onChange={e => setCity(e.target.value)} type="text" className='form-input w-full text-xs py-3' placeholder='City' />
                        <input value={postalCode} onChange={e => setPostalCode(e.target.value)} type="text" className='form-input w-full text-xs py-3' placeholder='Postal Code' />
                        <input value={country} onChange={e => setCountry(e.target.value)} type="text" className='sm:flex hidden w-full form-input text-xs py-3' placeholder='Country' />
                    </div>
                    <input value={country} onChange={e => setCountry(e.target.value)} type="text" className='sm:hidden flex mt-3 w-full form-input text-xs py-3' placeholder='Country' />
                </div>

                {/* Row 2 */}
                <div className='mt-5'>
                    <p className="text-gray-400 sm:text-base text-sm">Bank Details</p>
                    <div className="flex flex-row sm:flex-nowrap flex-wrap justify-between gap-3 mt-3">
                        <input value={bankSortCode} onChange={e => setBankSortCode(e.target.value)} type="text" className='form-input sm:w-full w-[48%] text-xs py-3' placeholder='Sort Code' />
                        <input value={bankAccountNumber} onChange={e => setBankAccountNumber(e.target.value)} type="text" className='form-input sm:w-full w-[48%] text-xs py-3' placeholder='Account Number' />
                        <input value={bankName} onChange={e => setBankName(e.target.value)} type="text" className='form-input sm:w-full w-[48%] text-xs py-3' placeholder='Bank Name' />
                        <input value={bankBranch} onChange={e => setBankBranch(e.target.value)} type="text" className='form-input sm:w-full w-[48%] text-xs py-3' placeholder='Bank Branch' />
                    </div>
                </div>

                {/* row 3 */}
                <div className="mt-5 w-full">
                    <p className="text-gray-400">Trading Details</p>
                    <div className="flex sm:flex-row flex-col mt-3 gap-6">
                        <div className="flex flex-row gap-4">
                            <LightCheckbox isChecked={soleTrader} setChecked={setSoleTrader} text={<p className='text-sm text-primaryBlue'>Sole Trader</p>} />
                            <LightCheckbox isChecked={limited} setChecked={setLimited} text={<p className='text-sm text-primaryBlue'>Limited</p>} />
                        </div>

                        <input value={NIC} onChange={e => setNIC(e.target.value)} type="text" className='sm:ml-3 ml-0 w-full form-input text-xs py-3' placeholder='NIC Number' />

                        <div className="w-full flex flex-row justify-end">
                            <button onClick={handleUpdate} className="w-36 h-12 flex items-center justify-center bg-primaryBlue rounded-md text-white">
                                {!updating ? 'Update' : <svg className="h-5 w-5 animate-spin text-white text-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BillingSection