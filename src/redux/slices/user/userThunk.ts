/* -------------------- */
/* Async Thunk */

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

/* -------------------- */
export const userThunk = createAsyncThunk(
  'users',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users');
      const data = await response.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
