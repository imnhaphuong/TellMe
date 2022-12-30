import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    idConvers: 'eqweqw',
    lastMessage: 'qweqweqw',
}
export const conversationSlice = createSlice({
    name: 'conver',
    initialState,
    reducers: {
        setConverById: (state, action) => {
            console.log(action.payload)
            const id = action.payload
            // state.idConvers = id
            return{...state,idConvers:id}
        },
    }
})
export const { setConverById } = conversationSlice.actions

export default conversationSlice.reducer