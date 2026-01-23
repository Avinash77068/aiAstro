/* -------------------- */
/* Async Thunk */

import { createAsyncThunk } from "@reduxjs/toolkit";

/* -------------------- */
export const userThunk = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users');
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
