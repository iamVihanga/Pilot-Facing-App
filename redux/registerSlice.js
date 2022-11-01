import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active_form: 1,
    form1_state: 'active',
    form2_state: '',
    form3_state: '',

    // Contact form
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    telNumber: '',
    company: '',

    // Certificate form
    flyerID: '',
    operatorID: '',
    proofDoc: null,
    confirmNoProof: false,
    droneInsurance: null,

    // Equipment form
    skills: [],
    equipments: [],

    // Mode
    updateMode: false
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
            state.title = action.payload.title
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
            state.confirmNoProof = action.payload.confirmNoProof
        },

        submitEquipmentForm: (state, action) => {
            state.skills = action.payload.skills
            state.equipments = action.payload.equipments
        },

        setUpdateMode: (state, action) => {
            state.updateMode = action.payload
        }

    }
})


export const {
    completeForm,
    setActiveForm,
    submitContactForm,
    submitCertificateForm,
    submitEquipmentForm,
    setUpdateMode
} = registerSlice.actions

export default registerSlice.reducer