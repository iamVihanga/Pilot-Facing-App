import { configureStore } from "@reduxjs/toolkit";
import registerSlice from './registerSlice'
import activeJobSlice from './activeJobSlice'

const store = configureStore({
    reducer: {
        register: registerSlice,
        activeJob: activeJobSlice
    }
})

export default store