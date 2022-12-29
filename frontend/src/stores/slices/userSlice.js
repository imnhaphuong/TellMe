import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser:  (state, action) => {
      console.log(action.payload,state);
          return{...state,accessToken:action.payload.accessToken,refreshToken:action.payload.refreshToken}
    },
    signin: (state,action) =>{
      console.log(action.payload);
      state.user = action.payload
    }
  }
});

export default userSlice.reducer;

export const { logout, setUser,signin } = userSlice.actions;

