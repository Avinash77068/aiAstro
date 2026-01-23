import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userThunk } from './userThunk';

/* -------------------- */
/* State Interface */
/* -------------------- */
export interface UserState {
  loading: boolean;
  data: any | null;
  error: string | null;
}

/* -------------------- */
/* Initial State */
/* -------------------- */
const initialState: UserState = {
  loading: false,
  data: null,
  error: null,
};
/* -------------------- */
/* Slice */
/* -------------------- */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: state => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(userThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* -------------------- */
/* Exports */
/* -------------------- */
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
