import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isLoggedIn:false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.isLoggedIn=true;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.isLoggedIn=false;
    },
    logoutSuccess:(state)=>{
      state.currentUser=null;
      state.isLoggedIn=false;
    },
    logoutFailure:(state)=>{
      state.error=true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure ,logoutSuccess,logoutFailure} = userSlice.actions;
export default userSlice.reducer;
