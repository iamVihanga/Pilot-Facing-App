import { configureStore } from "@reduxjs/toolkit";
import registerSlice from './registerSlice'
import activeJobSlice from './activeJobSlice'
import currentUserSlice from './currentUser'

const store = configureStore({
    reducer: {
        register: registerSlice,
        activeJob: activeJobSlice,
        currentUser: currentUserSlice
    }
})

export default store