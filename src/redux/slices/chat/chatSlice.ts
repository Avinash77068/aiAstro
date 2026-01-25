import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendMessageThunk } from './chatThunk';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.loading = false;
        
        const userMessage: Message = {
          id: Date.now().toString(),
          text: action.payload.userMessage,
          isUser: true,
          timestamp: new Date(action.payload.timestamp),
        };
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: action.payload.botResponse,
          isUser: false,
          timestamp: new Date(action.payload.timestamp),
        };
        
        state.messages.push(userMessage);
        state.messages.push(botMessage);
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addMessage, clearMessages, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
