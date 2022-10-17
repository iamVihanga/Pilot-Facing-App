import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setActiveForm, completeForm, submitContactForm } from "../../redux/registerSlice";

const ContactForm = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.register)

    const [profession, setProfession] = useState(state.profession)
    const [firstName, setFirstName] = useState(state.firstName)
    const [lastName, setLastName] = useState(state.lastName)
    const [email, setEmail] = useState(state.email)
    const [telNumber, setTelNumber] = useState(state.telNumber)
    const [company, setCompany] = useState(state.company)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName,
            lastName,
            email,
            telNumber,
            company
        }
    })

    const onSubmit = (data) => {
        dispatch(submitContactForm({ ...data, profession }))
        dispatch(completeForm(1))
        dispatch(setActiveForm(2))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-12 flex flex-col gap-y-6">
                {/* Row 1 */}
                <div className="flex sm:flex-row flex-col sm:gap-5 w-full h-12">
                    <div className="flex flex-row sm:gap-5 gap-1 w-full h-12 sm:justify-start justify-between">
                        <ProfessionButton
                            profession={profession}
                            setProfession={setProfession}
                            text="Mr"
                        />
                        <ProfessionButton
                            profession={profession}
                            setProfession={setProfession}
                            text="Ms"
                        />
                        <ProfessionButton
                            profession={profession}
                            setProfession={setProfession}
                            text="Mrs"
                        />

                        <input
                            className="form-input flex-1"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            {...register('firstName', { required: true })}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <input
                        className="form-input w-full min-h-[3rem] sm:mt-0 mt-5"
                        type="text"
                        placeholder="Last Name"
                        {...register('lastName', { required: true })}
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                {/* Row 2 */}
                <div className="flex w-full h-12 sm:mt-0 mt-16">
                    <input
                        className="form-input flex-1"
                        type="email"
                        placeholder="Email"
                        {...register('email', { required: true })}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                {/* Row 3 */}
                <div className="flex sm:flex-row flex-col w-full gap-5">
                    <input
                        className="form-input flex-1  min-h-[3rem]"
                        type="text"
                        placeholder="Telephone Number"
                        {...register('telNumber', { required: true })}
                        value={telNumber}
                        onChange={e => setTelNumber(e.target.value)}
                    />
                    <input
                        className="form-input flex-1  min-h-[3rem]"
                        type="text"
                        placeholder="Company Name (optional)"
                        {...register('company', { required: true })}
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                    />
                </div>
            </div>


            <button className="mt-12 bg-primaryTeal px-10 py-2 uppercase text-color font-semibold text-white text-lg rounded-md">Next</button>
        </form>
    )
}

const ProfessionButton = ({ profession, setProfession, text, register }) => {
    return (
        <button
            value={text}
            type="button"
            className={`profession-select-btn h-[3rem] ${profession === text ? 'active' : ''}`}
            onClick={e => setProfession(e.target.value)}
        >{text}</button>
    )
}

export default ContactForm