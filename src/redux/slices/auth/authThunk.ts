import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../services/api';

interface LoginPayload {
  name: string;
  place: string;
  dateOfBirth: string;
  gender: string;
}

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
