import React, { useEffect } from 'react'
import { RegisterFormNav, AuthLayout, ContactForm, CertificatesForm, EquipmentsForm } from '../../../components';
import { getSession } from "../../../config/supabaseFunctions";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Register = () => {
    const router = useRouter()

    return (
        <div className='relative'>
            <AuthLayout>
                <div className="">
                    <RegisterFormNav />

                    <ActiveStep />
                </div>
            </AuthLayout>
        </div>
    )
}

export default Register

const ActiveStep = () => {
    const state = useSelector(state => state.register)

    switch (state.active_form) {
        case 1: return <ContactForm />
        case 2: return <CertificatesForm />
        case 3: return <EquipmentsForm />

        default: ''
    }
}