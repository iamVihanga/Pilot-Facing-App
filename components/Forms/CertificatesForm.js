import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { CheckIcon } from "@heroicons/react/24/outline";
import { setActiveForm, completeForm, submitCertificateForm } from "../../redux/registerSlice";
import { useState } from "react";
import LightCheckbox from "./LightCheckbox";

const CertificatesForm = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.register)

    const [flyerID, setFlyerID] = useState(state.flyerID)
    const [operatorID, setOperatorID] = useState(state.operatorID)
    const [proofDoc, setProofDoc] = useState(state.proofDoc)
    const [droneInsurance, setDroneInsurance] = useState(state.droneInsurance)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            flyerID,
            operatorID
        }
    })

    const onSubmit = (data) => {
        dispatch(submitCertificateForm({
            ...data,
            proofDoc,
            droneInsurance
        }))
        dispatch(setActiveForm(3))
        dispatch(completeForm(2))
    }

    const handleProofUpload = (e) => {
        console.log('Proof Doc')
        setProofDoc('#')
    }

    const handleDroneInsuranceUpload = (e) => {
        console.log('Insurance Doc')
        setDroneInsurance('#')
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-6 flex flex-col">
                    {/* Row 1 */}
                    <div className="sm:mb-9 mb-24">
                        <p className="mb-5 sm:text-base text-sm">CAA Information <span className="italic text-skyBlue">(Obtain Flyer &amp; Operator ID)</span></p>
                        <div className="flex sm:flex-row flex-col w-full h-12 sm:gap-x-5 gap-x-0 sm:gap-y-0 gap-y-5">
                            <input
                                type="text"
                                placeholder="Flyer ID"
                                className="form-input sm:basis-1/3 sm:h-fit min-h-[3rem]"
                                {...register('flyerID', { required: true })}
                                value={flyerID}
                                onChange={e => setFlyerID(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Opertor ID"
                                className="form-input sm:basis-2/3 sm:h-fit min-h-[3rem]"
                                {...register('operatorID', { required: true })}
                                value={operatorID}
                                onChange={e => setOperatorID(e.target.value)}
                            />
                        </div>
                    </div>


                    {/* Row 2 */}
                    <div>
                        <p className="h-fit mb-5 sm:text-base text-sm">Qualifications &amp; Insurances</p>
                        <div className="flex max-w-fit sm:flex-row flex-col items-center w-full h-12 sm:gap-x-5 gap-x-0 sm:gap-y-0 gap-y-2">

                            <label
                                htmlFor="file1"
                                className={`form-input ${proofDoc !== '' && 'success'} w-full flex flex-auto flex-1 items-center justify-start sm:h-12 min-h-[3rem] cursor-pointer sm:text-sm text-xs`}>
                                {proofDoc !== '' ? '"A2 CofC" or GVC Proof Uploaded' : 'Upload "A2 CofC" or GVC Proof'}
                                <input type="file" id="file1" className="hidden" onChange={handleProofUpload} />
                            </label>

                            <p className="text-primaryBlue">OR</p>

                            <LightCheckbox
                                text={<p className="text-xs text-green-500 flex-wrap">I can confirm my drone(s) are under 250g and will not operate a drone that is 250g or over.</p>}
                            />
                        </div>
                    </div>

                    {/* Row 3  */}
                    <div className="sm:mt-6 mt-28">
                        <label
                            htmlFor="file2"
                            className={`form-input ${droneInsurance !== '' && 'success'} flex flex-1 flex-row flex-1 items-center justify-start h-12 cursor-pointer`}>
                            {droneInsurance !== '' ? 'Drone Insurance Uploaded' : 'Upload Drone Insurance'}
                            <input type="file" id="file2" className="hidden" onChange={handleDroneInsuranceUpload} />
                        </label>
                    </div>
                </div>


                <button className="sm:mt-9 mt-5 bg-primaryTeal px-10 py-2 uppercase text-color font-semibold text-white text-lg rounded-md">Next</button>
            </form>
        </div>
    )
}

export default CertificatesForm