import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../services/api';

export const astrologerThunk = createAsyncThunk(
  'astrologer/fetchAstrologers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/astrologer/');
      console.log('Astrologer data response:', response.data);
      const data = response.data;

      if (data.success && data.data) {
        return data.data;
      }

      throw new Error('Invalid response format');
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Failed to fetch astrologer data',
      );
    }
  },
);
