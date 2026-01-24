import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { loginThunk, sendOTPThunk, verifyOTPThunk } from './authThunk';


export interface UserData {
  name: string;
  place: string;
  dateOfBirth: string;
  gender: string;
  userId?: string;
  token?: string;
  phoneNumber?: string;
}

export interface AuthState {
  loading: boolean;
  user: UserData | null;
  isAuthenticated: boolean;
  error: string | null;
  onboardingCompleted: boolean;
  phoneVerified: boolean;
  phoneNumber: string | null;
  isNewUser: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null,
  onboardingCompleted: false,
  phoneVerified: false,
  phoneNumber: null,
  isNewUser: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.onboardingCompleted = false;
      state.phoneVerified = false;
      state.phoneNumber = null;
      state.isNewUser = true;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.onboardingCompleted = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendOTPThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTPThunk.fulfilled, (state, action: PayloadAction<{phoneNumber: string}>) => {
        state.loading = false;
        state.phoneNumber = action.payload.phoneNumber;
      })
      .addCase(sendOTPThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOTPThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTPThunk.fulfilled, (state, action: PayloadAction<{phoneNumber: string; token?: string; isNewUser?: boolean; user?: any}>) => {
        state.loading = false;
        state.phoneVerified = true;
        state.phoneNumber = action.payload.phoneNumber;
        state.isNewUser = action.payload.isNewUser !== false;
        
        if (!action.payload.isNewUser && action.payload.user) {
          state.user = {
            ...action.payload.user,
            phoneNumber: action.payload.phoneNumber,
            token: action.payload.token,
          } as UserData;
          state.isAuthenticated = true;
          state.onboardingCompleted = true;
        } else if (action.payload.token) {
          state.user = {...state.user, phoneNumber: action.payload.phoneNumber, token: action.payload.token} as UserData;
        }
      })
      .addCase(verifyOTPThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {logout, clearError} = authSlice.actions;
export default authSlice.reducer;
