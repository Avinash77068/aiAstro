import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../services/api';

interface LoginPayload {
  name: string;
  place: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber?: string;
  email?: string;
}

interface SendOTPPayload {
  phoneNumber?: string;
  email?: string;
}

interface VerifyOTPPayload {
  phoneNumber?: string;
  email?: string;
  otp: string;
}

export const sendOTPThunk = createAsyncThunk(
  'auth/sendOTP',
  async (payload: SendOTPPayload, {rejectWithValue}) => {
    try {
      const response = await api.post('/user/send-otp', payload);
      console.log('Send OTP response:', response.data);
      
      if (response.data.success) {
        return {
          phoneNumber: payload.phoneNumber,
          email: payload.email,
        };
      }

      throw new Error(response.data.message || 'Failed to send OTP');
    } catch (error: any) {
      console.error('Send OTP error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to send OTP',
      );
    }
  },
);

export const verifyOTPThunk = createAsyncThunk(
  'auth/verifyOTP',
  async (payload: VerifyOTPPayload, {rejectWithValue}) => {
    try {
      const response = await api.post('/user/verify-otp', payload);
      
      if (response.data.success) {
        return {
          phoneNumber: payload.phoneNumber,
          email: payload.email,
          token: response.data.data?.token,
          isNewUser: response.data.data?.isNewUser !== false,
          userId: response.data.data?.userId,
          user: response.data.data?.user,
        };
      }

      throw new Error(response.data.message || 'Invalid OTP');
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to verify OTP',
      );
    }
  },
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (userData: LoginPayload, {rejectWithValue}) => {
    try {
      const response = await api.post('/user/login', userData);
      console.log('Login response:', response.data);
      
      if (response.data.success) {
        return {
          ...userData,
          userId: response.data.data?.userId,
          token: response.data.data?.token,
        };
      }

      throw new Error(response.data.message || 'Login failed');
    } catch (error: any) {
      console.error('Login error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to login',
      );
    }
  },
);
