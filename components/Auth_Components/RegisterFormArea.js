import React from 'react'
import { useSelector } from "react-redux";
import { ContactForm, CertificatesForm, EquipmentsForm } from "..";

const RegisterFormArea = () => {
    const activeForm = useSelector(state => state.register.active_form)

    return (
        <div className='w-full'>
            {activeForm === 1
                ? <ContactForm />
                : (activeForm === 2
                    ? <CertificatesForm />
                    : <EquipmentsForm />)
            }
        </div>
    )
}


export default RegisterFormArea