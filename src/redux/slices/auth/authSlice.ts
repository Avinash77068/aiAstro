import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { loginThunk, sendOTPThunk, verifyOTPThunk, googleSignInThunk } from './authThunk';


export interface UserData {
  name: string;
  place: string;
  dateOfBirth: string;
  gender: string;
  userId?: string;
  token?: string;
  phoneNumber?: string;
  email?: string;
  photo?: string;
  isGoogleLogin?: boolean;
}

export interface AuthState {
  loading: boolean;
  user: UserData | null;
  isAuthenticated: boolean;
  error: string | null;
  onboardingCompleted: boolean;
  phoneVerified: boolean;
  phoneNumber: string | null;
  email: string | null;
  photo: string | null;
  token: string | null;
  isGoogleLogin: boolean;
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
  email: null,
  photo: null,
  token: null,
  isGoogleLogin: false,
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
      state.email = null;
      state.photo = null;
      state.token = null;
      state.isGoogleLogin = false;
      state.isNewUser = true;
    },
    clearError: state => {
      state.error = null;
    },
    googleSignIn: (state, action: PayloadAction<{ name: string; email: string; photo?: string; token?: string; isGoogleLogin?: boolean;}>) => {
      state.phoneVerified = true;
      state.isNewUser = true;
      state.email = action.payload.email;
      state.photo = action.payload.photo || null;
      state.user = {
        name: action.payload.name,
        place: '',
        dateOfBirth: '',
        gender: '',
        email: action.payload.email,
        photo: action.payload.photo,
        isGoogleLogin: true,
        token: action.payload.token,
      };
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
      .addCase(sendOTPThunk.fulfilled, (state, action: PayloadAction<{phoneNumber?: string; email?: string}>) => {
        state.loading = false;
        state.phoneNumber = action.payload.phoneNumber || action.payload.email || null;
      })
      .addCase(sendOTPThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOTPThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTPThunk.fulfilled, (state, action: PayloadAction<{phoneNumber?: string; email?: string; token?: string; isNewUser?: boolean; userId?: string; user?: any}>) => {
        state.loading = false;
        state.phoneVerified = true;
        state.phoneNumber = action.payload.phoneNumber || action.payload.email || null;
        state.isNewUser = action.payload.isNewUser !== false;
        
        if (!action.payload.isNewUser && action.payload.user) {
          state.user = {
            ...action.payload.user,
            userId: action.payload.userId,
            phoneNumber: action.payload.phoneNumber || action.payload.email,
            token: action.payload.token,
          } as UserData;
          state.isAuthenticated = true;
          state.onboardingCompleted = true;
        } else if (action.payload.token) {
          state.user = {...state.user, userId: action.payload.userId, phoneNumber: action.payload.phoneNumber || action.payload.email, token: action.payload.token} as UserData;
        }
      })
      .addCase(verifyOTPThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(googleSignInThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSignInThunk.fulfilled, (state, action: PayloadAction<{name: string; email: string; photo?: string; token?: string; userId?: string; isNewUser?: boolean; user?: any}>) => {
        state.loading = false;
        state.phoneVerified = true;
        state.email = action.payload.email;
        state.photo = action.payload.photo || null;
        state.isNewUser = action.payload.isNewUser !== false;
        
        if (!action.payload.isNewUser && action.payload.user) {
          state.user = {
            ...action.payload.user,
            userId: action.payload.userId,
            email: action.payload.email,
            photo: action.payload.photo,
            token: action.payload.token,
          } as UserData;
          state.isAuthenticated = true;
          state.onboardingCompleted = true;
        } else {
          state.user = {
            name: action.payload.name,
            place: '',
            dateOfBirth: '',
            gender: '',
            email: action.payload.email,
            photo: action.payload.photo,
          };
        }
      })
      .addCase(googleSignInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {logout, clearError, googleSignIn} = authSlice.actions;
export default authSlice.reducer;
