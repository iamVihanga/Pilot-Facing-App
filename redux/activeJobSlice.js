import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeJob: null
}

const activeJobSlice = createSlice({
    name: 'activeJob',
    initialState,
    reducers: {
        setActiveJob: (state, action) => {
            state.activeJob = action.payload
        }
    }
})

export const { setActiveJob } = activeJobSlice.actions
export default activeJobSlice.reducer