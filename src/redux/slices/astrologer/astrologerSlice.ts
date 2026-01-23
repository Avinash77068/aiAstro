import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { astrologerThunk } from './astrologerThunk';

export interface Astrologer {
  _id: string;
  name: string;
  type: string;
  rating: number;
  reviews: number;
  price: string;
  verified: boolean;
  image: string;
  experience: string;
  languages: string[];
  specialization: string[];
  description: string;
  sessionType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AstrologerState {
  loading: boolean;
  data: Astrologer[];
  error: string | null;
}

const initialState: AstrologerState = {
  loading: false,
  data: [],
  error: null,
};

const astrologerSlice = createSlice({
  name: 'astrologer',
  initialState,
  reducers: {
    clearAstrologers: state => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(astrologerThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        astrologerThunk.fulfilled,
        (state, action: PayloadAction<Astrologer[]>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(astrologerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearAstrologers} = astrologerSlice.actions;
export default astrologerSlice.reducer;
