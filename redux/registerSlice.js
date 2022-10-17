import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active_form: 1,
    form1_state: 'active',
    form2_state: '',
    form3_state: '',

    // Contact form
    profession: '',
    firstName: '',
    lastName: '',
    email: '',
    telNumber: '',
    company: '',

    // Certificate form
    flyerID: '',
    operatorID: '',
    proofDoc: '',
    droneInsurance: '',

    // Equipment form
    skills: [],
    equipments: []
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        completeForm: (state, action) => { state[`form${action.payload}_state`] = 'completed' },
        setActiveForm: (state, action) => {
            state[`form${action.payload}_state`] = 'active'
            state.active_form = action.payload
        },

        // Submit forms
        submitContactForm: (state, action) => {
            state.profession = action.payload.profession
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.email = action.payload.email
            state.telNumber = action.payload.telNumber
            state.company = action.payload.company
        },

        submitCertificateForm: (state, action) => {
            state.flyerID = action.payload.flyerID
            state.operatorID = action.payload.operatorID
            state.proofDoc = action.payload.proofDoc
            state.droneInsurance = action.payload.droneInsurance
        },

        submitEquipmentForm: (state, action) => {
            state.skills = action.payload.skills
            state.equipments = action.payload.equipments
        }

    }
})


export const {
    completeForm,
    setActiveForm,
    submitContactForm,
    submitCertificateForm,
    submitEquipmentForm
} = registerSlice.actions

export default registerSlice.reducer