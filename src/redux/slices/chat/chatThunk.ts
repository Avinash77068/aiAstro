import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

interface SendMessagePayload {
  userId: string;
  message: string;
}

export const sendMessageThunk = createAsyncThunk(
  'chat/sendMessage',
  async (payload: SendMessagePayload, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/chat', payload);
      if (response.data.success) {
        return {
          userMessage: payload.message,
          botResponse: response.data.data?.response || 'Thank you for your message.',
          timestamp: response.data.data?.timestamp || new Date().toISOString(),
        };
      }

      throw new Error(response.data.message || 'Failed to send message');
    } catch (error: any) {
      console.error('Send message error:', error);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to send message',
      );
    }
  },
);
