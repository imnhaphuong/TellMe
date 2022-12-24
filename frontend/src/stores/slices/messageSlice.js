import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: "",
    
}
export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        getMessage: (state, action) => {

        },
    }
})
export const { getMessage } = messageSlice.actions

export default messageSlice.reducer