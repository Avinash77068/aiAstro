import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

interface SendMessagePayload {
  userId: string;
  message: string;
  astrologerId?: string;
}

export const sendMessageThunk = createAsyncThunk(
  'chat/sendMessage',
  async (payload: SendMessagePayload, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/chat', payload);

      if (response.data.success) {
        return {
          userMessage: response.data.data.message,
          botResponse: response.data.data.astroResponse,
          timestamp: response.data.data.timestamp,
          astrologerId: response.data.data.astrologerId,
        };
      }

      throw new Error(response.data.message);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
