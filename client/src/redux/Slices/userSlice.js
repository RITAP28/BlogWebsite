import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    Google: false,
    Normal: false,
    hybrid: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SignUpSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = true;
        },
        SignInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        SignInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = true;
            state.Google = false;
            state.Normal = true;
            state.hybrid = false;
        },
        SignInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.Google = false;
            state.Normal = false;
            state.hybrid = false;
        },
        UserNotExist: (state) => {
            state.currentUser = null;
            state.error = null;
            state.isAuthenticated = false;
        },
        SignInSuccessWithGoogle: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = true;
            state.Google = true;
            state.Normal = false;
            state.hybrid = false;
        }
    }
});

export const { SignUpSuccess, SignInFailure, SignInStart, SignInSuccess, UserNotExist, SignInSuccessWithGoogle } = userSlice.actions;
export default userSlice.reducer;