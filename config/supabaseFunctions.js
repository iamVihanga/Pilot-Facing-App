import supabase from './supabaseClient'
import customerClient from "./customerClient";

export const insertToUsers = async (formData) => {
    let { data, error } = await supabase
        .from('Employees')
        .insert(formData)

    return { data, error }
}

export const updateUser = async (formData, email) => {
    let { error } = await supabase
        .from('Employees')
        .update(formData)
        .eq('email', email)

    return { error }
}

export const uploadProofFile = async (file) => {
    let { data, error } = await supabase
        .storage
        .from('user-data')
        .upload(`proofAndCertificates/${new Date().toISOString()}-${file.name}`, file, {
            cacheControl: '3600',
            upsert: false
        })

    return { data, error }
}

export const getUserByEmail = async (email) => {
    let { data, error } = await supabase
        .from('Employees')
        .select()
        .eq('email', email)

    return { data, error }
}

export const getDrones = async () => {
    let { data, error } = await supabase
        .from('DroneEquipment')
        .select(`
            id,
            model,
            brand (
                name
            )
        `)

    return { data, error }
}

export const signupUser = async (credentials) => {
    const { data, error } = await supabase
        .auth
        .signUp(credentials)

    return { data, error }
}

export const signinUser = async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials)

    return { data, error }
}

export const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()

    return { data, error }
}

export const updateAuthEmail = async (emailToUpdate) => {
    const { data, error } = await supabase.auth.updateUser({
        email: emailToUpdate
    })

    return { data, error }
}

export const getUserDetails = async (email) => {
    const { data, error } = await supabase
        .from('Employees')
        .select('*')
        .eq('email', email)

    return { data, error }
}

export const getJobListing = async () => {
    const res = await supabase
        .from('Jobs')
        .select()

    return res
}

export const getSingleJob = async (jobID) => {
    const res = await customerClient
        .from('Orders')
        .select(`
            pilotExpertize,
            id,
            address,
            date,
            customerID (
                firstName,
                lastName,
                email,
                phoneNumber,
                companyName
            ),
            mapData,
            area,
            customerNote,
            status
        `)
        .eq("id", jobID)

    return res
}