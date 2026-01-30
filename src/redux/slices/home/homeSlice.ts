import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { homeThunk } from './homeThunk';


export interface AIOption {
  image: string;
  title: string;
  bgColor: string;
  route: string;
}

export interface QuickAction {
  label: string;
  iconKey: string;
  image: string;
  route: string;
}

export interface HoroscopeItem {
  image: string;
  title: string;
  route?: string;
}

export interface Report {
  image: string;
  title: string;
  price: string;
  route?: string;
}

export interface PanchangItem {
  image: string;
  title: string;
  route?: string;
}

export interface Section2025Item {
  image: string;
  title: string;
  route?: string;
}

export interface ConsultFilter {
  label: string;
  iconKey: string | null;
  image: string | null;
  route?: string;
}

export interface AppConfig {
  appName: string | null;
  notificationCount: string | null;
  userProfile: {
    name: string | null;
    plan: string | null;
  };
}

export interface HomeData {
  aiOptions: AIOption[];
  quickActions: QuickAction[];
  homeTabs: string[];
  horoscopeItems: HoroscopeItem[];
  reports: Report[];
  panchangItems: PanchangItem[];
  section2025Items: Section2025Item[];
  consultFilters: ConsultFilter[];
  categories: string[];
  appConfig: AppConfig;
}

export interface HomeState {
  loading: boolean;
  data: HomeData | null;
  error: string | null;
}

const initialState: HomeState = {
  loading: false,
  data: null,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    clearHome: state => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(homeThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        homeThunk.fulfilled,
        (state, action: PayloadAction<HomeData>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(homeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearHome} = homeSlice.actions;
export default homeSlice.reducer;
