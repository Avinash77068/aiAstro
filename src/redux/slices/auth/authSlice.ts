import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { loginThunk } from './authThunk';


export interface UserData {
  name: string;
  place: string;
  dateOfBirth: string;
  gender: string;
  userId?: string;
  token?: string;
}

export interface AuthState {
  loading: boolean;
  user: UserData | null;
  isAuthenticated: boolean;
  error: string | null;
  onboardingCompleted: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  error: null,
  onboardingCompleted: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.onboardingCompleted = false;
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
      });
  },
});

export const {logout, clearError} = authSlice.actions;
export default authSlice.reducer;
