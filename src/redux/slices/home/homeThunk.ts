import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../services/api';

export const homeThunk = createAsyncThunk(
  'home/fetchHomeData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/user/');
      console.log('Home data response:', response.data);
      const data = response.data;

      if (data.success && data.data && data.data.data) {
        return data.data.data;
      }

      throw new Error('Invalid response format');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch home data');
    }
  },
);
