import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    isAuthenticated: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // RegisterSuccess: (state, action) => {
        //     state.loading = false;
        //     state.error = null;
        //     state.currentUser = action.payload;
        //     // state.isAuthenticated = true;
        // },
        SignInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        SignInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = true;
        },
        SignInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        UserNotExist: (state) => {
            state.currentUser = null;
            state.error = null;
            state.isAuthenticated = false;
        }
    }
});

export const { SignInFailure, SignInStart, SignInSuccess, UserNotExist } = userSlice.actions;
export default userSlice.reducer;