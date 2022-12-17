import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: "",
    
}
export const messageSlice = createSlice({
    name: 'quest',
    initialState,
    reducers: {
        getMessage: (state, action) => {

        },
    }
})
export const {  } = messageSlice.actions

export default messageSlice.reducer