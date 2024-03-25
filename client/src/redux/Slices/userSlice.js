import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    Google: false,
    Normal: false,
    hybrid: false,
    onboarded: false,
    onboardingData1: null,
    onboardingData2: null,
    onboardingData3: null,
    onboard1Comp: false,
    onboard2Comp: false,
    subscribed: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        SignUpSuccess: (state) => {
            state.loading = false;
            state.error = null;
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
            state.Google = false;
            state.Normal = false;
            state.hybrid = false;
            state.onboarded = false;
            state.onboard1Comp = false;
            state.onboard2Comp = false;
            state.onboardingData1 = null;
            state.onboardingData2 = null;
            state.onboardingData3 = null;
        },
        SignInSuccessWithGoogle: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            state.isAuthenticated = true;
            state.Google = true;
            state.Normal = false;
            state.hybrid = false;
        },
        UserOnboarded: (state, action) => {
            state.onboardingData3 = action.payload;
            state.isAuthenticated = true;
            // state.onboard3Comp = true;
            state.loading = false;
            state.error = null;
            state.onboarded = true;
        },
        Onboarding1Completed: (state, action) => {
            state.onboardingData1 = action.payload;
            state.onboard1Comp = true;
            state.error = null;
            state.loading = false;
        },
        Onboarding2Completed: (state, action) => {
            state.onboardingData2 = action.payload;
            state.onboard2Comp = true;
            state.error = null;
            state.loading = false;
        },
        Onboarding1Skipped: (state) => {
            state.loading = false;
            state.error = null;
            state.onboard1Comp = false;
        },
        Onboarding2Skipped: (state) => {
            state.loading = false;
            state.error = null;
            state.onboard2Comp = false;
        }
    }
});

export const { SignUpSuccess, SignInFailure, SignInStart, SignInSuccess, UserNotExist, SignInSuccessWithGoogle, UserOnboarded, Onboarding1Completed, Onboarding2Completed, Onboarding1Skipped, Onboarding2Skipped } = userSlice.actions;
export default userSlice.reducer;