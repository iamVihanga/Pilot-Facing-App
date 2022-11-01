import React, { useState, useRef } from 'react'
import { Input, CheckboxTeal, Button, ErrorMessage } from "../";
import { useSelector, useDispatch } from "react-redux";
import { uploadProofFile } from "../../config/supabaseFunctions";
import {
    submitCertificateForm,
    completeForm,
    setActiveForm,
    switchUpdateMode
} from "../../redux/registerSlice";
import { useRouter } from "next/router";

const CertificatesForm = () => {
    const state = useSelector(state => state.register)
    const dispatch = useDispatch()
    const router = useRouter()

    const [flyerID, setFlyerID] = useState(state.flyerID)
    const [operatorID, setOperatorID] = useState(state.operatorID)
    const [confirm, setConfirm] = useState(state.confirmNoProof)
    const [proofFile, setProofFile] = useState(state.proofDoc)
    const [insurance, setInsurance] = useState(state.droneInsurance)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // References
    const flyerID_Ref = useRef(null)
    const operatorID_Ref = useRef(null)
    const proofFile_Ref = useRef(null)
    const insurance_Ref = useRef(null)

    // -------------------------------------------
    const validateForm = () => {
        let validateError = false

        if (flyerID === '') {
            setError('Flyer ID is required !')
            flyerID_Ref.current.classList.add("border");
            flyerID_Ref.current.classList.add("border-red-500");
            validateError = true
        } else {
            flyerID_Ref.current.classList.remove("border");
            flyerID_Ref.current.classList.remove("border-red-500");
        }

        if (operatorID === '') {
            setError('Flyer ID is required !')
            operatorID_Ref.current.classList.add("border");
            operatorID_Ref.current.classList.add("border-red-500");
            validateError = true
        } else {
            operatorID_Ref.current.classList.remove("border");
            operatorID_Ref.current.classList.remove("border-red-500");
        }

        if (proofFile === null && !confirm) {
            setError('Proof file is required !')
            proofFile_Ref.current.classList.add("border");
            proofFile_Ref.current.classList.add("border-red-500");
            validateError = true
        } else {
            proofFile_Ref.current.classList.remove("border");
            proofFile_Ref.current.classList.remove("border-red-500");
        }

        if (insurance === null) {
            setError('Drone insurance is required !')
            insurance_Ref.current.classList.add("border");
            insurance_Ref.current.classList.add("border-red-500");
            validateError = true
        } else {
            insurance_Ref.current.classList.remove("border");
            insurance_Ref.current.classList.remove("border-red-500");
        }


        if (!validateError) setError(null)
        return validateError
    }

    const handleNext = async () => {
        try {
            const isError = validateForm()
            if (isError) throw new Error('Please fill all required fields !')

            setLoading(true)

            // Upload proof doc
            let baseURL = process.env.NEXT_SUPABASE_STORAGE_BASEURL

            let proofFileDoc = null
            if (!confirm) {
                const { data, error: proofFileErr } = await uploadProofFile(proofFile)
                if (proofFileErr) throw new Error('Proof file upload failed.!')
                proofFileDoc = `${baseURL}/${data.path}`
            }

            const { data: insuranceDoc, error: insuranceErr } = await uploadProofFile(insurance)
            if (insuranceErr) throw new Error('Drone Insurance upload failed.!')
            // --------------------------------

            dispatch(submitCertificateForm({
                flyerID,
                operatorID,
                proofDoc: proofFileDoc,
                droneInsurance: `${baseURL}/${insuranceDoc.path}`,
                confirmNoProof: confirm
            }))
            dispatch(completeForm(2))

            if (state.form1_updateMode && state.form2_updateMode && state.form3_updateMode) return router.push('/auth/register/confirm')


            dispatch(setActiveForm(3))

            dispatch(switchUpdateMode(2))
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }


    }
    // -------------------------------------------

    return (
        <div className='mt-8'>
            {error && <ErrorMessage error={error} setError={setError} />}

            {/* Row 1 */}
            <p className="sm:text-base text-sm">CAA Information <span className="italic text-skyBlue">{`(Obtain Flyer & Operator ID)`}</span></p>
            <div className="mt-5 grid sm:grid-cols-3 grid-cols-1 sm:h-12 h-28 gap-x-4 gap-y-4">
                <Input refItem={flyerID_Ref}>
                    <input
                        type="text"
                        className="w-full bg-transparent outline-none sm:text-sm text-[16px] text-primaryBlue placeholder:text-primaryBlue"
                        placeholder="Flyer ID"
                        value={flyerID}
                        onChange={e => setFlyerID(e.target.value)}
                    />
                </Input>
                <Input refItem={operatorID_Ref} className={"sm:col-span-2 col-span-full"}>
                    <input
                        type="text"
                        className="w-full bg-transparent outline-none sm:text-sm text-[16px] text-primaryBlue placeholder:text-primaryBlue"
                        placeholder="Operator ID"
                        value={operatorID}
                        onChange={e => setOperatorID(e.target.value)}
                    />
                </Input>
            </div>

            {/* Row 2 */}
            <p className="mt-9 sm:text-base text-sm">Qualification &amp; Insurance</p>
            <div className="mt-5 flex sm:flex-row flex-col items-center justify-between">
                <label
                    className={`w-full cursor-pointer`}>
                    <Input refItem={proofFile_Ref} className={`${proofFile !== null && 'bg-teal-100 text-teal-500'} cursor-pointer h-12 sm:text-sm text-[16px]`} htmlFor="file1">
                        {`Upload "A2 CofC" or GVC Proof`}
                        <input type="file" id="file1" className="hidden" onChange={e => setProofFile(e.target.files[0])} />
                    </Input>
                </label>
                <div className="mx-4 text-primaryBlue sm:my-0 my-3">OR</div>
                <div className="flex items-center">
                    <CheckboxTeal checked={confirm} setChecked={setConfirm} className="mr-3" />
                    <p className="text-xs text-green-400">
                        {`I can confirm my drone(s) are under 250g and will not operate a drone that is 250g or over.`}
                    </p>
                </div>
            </div>

            <div className="mt-5 w-full">
                <label
                    className={`w-full cursor-pointer`}>
                    <Input refItem={insurance_Ref} className={`${insurance !== null && 'bg-teal-100 text-teal-500'} cursor-pointer h-12 sm:text-sm text-[16px]`} htmlFor="file2">
                        Drone Insurance Uploaded
                        <input type="file" id="file2" className="hidden" onChange={e => setInsurance(e.target.files[0])} />
                    </Input>
                </label>
            </div>

            <Button
                onClick={handleNext}
                className='mt-9'
                isLoading={loading}
            >
                {state.form2_updateMode ? 'Save' : 'Next'}
            </Button>
        </div >
    )
}

export default CertificatesForm