import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendMessageThunk } from './chatThunk';

/* ---------- TYPES ---------- */

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatState {
  messagesByAstrologer: Record<string, Message[]>;
  loading: boolean;
  error: string | null;
}

/* ---------- INITIAL STATE ---------- */

const initialState: ChatState = {
  messagesByAstrologer: {},
  loading: false,
  error: null,
};

/* ---------- SLICE ---------- */

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChat: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        delete state.messagesByAstrologer[action.payload];
      } else {
        state.messagesByAstrologer = {};
      }
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder

      /* ---- SEND MESSAGE ---- */
      .addCase(sendMessageThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.loading = false;

        const astrologerId = action.meta.arg.astrologerId || 'default';

        if (!state.messagesByAstrologer[astrologerId]) {
          state.messagesByAstrologer[astrologerId] = [];
        }

        const userMessage: Message = {
          id: Date.now().toString(),
          text: action.payload.userMessage,
          isUser: true,
          timestamp: new Date(),
        };

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: action.payload.botResponse,
          isUser: false,
          timestamp: new Date(action.payload.timestamp),
        };

        state.messagesByAstrologer[astrologerId].push(userMessage);
        state.messagesByAstrologer[astrologerId].push(botMessage);
      })

      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Something went wrong';
      });
  },
});

/* ---------- EXPORTS ---------- */

export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;
