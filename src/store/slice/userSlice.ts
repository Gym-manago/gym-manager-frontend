import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '../types';

const initialState: Partial<UserData> = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      const data = action.payload;
      state.username = data.username;
      state.email = data.email;
      state.token = data.token;
    },
    logout: (state) => {
      state.email = undefined;
      state.username = undefined;
      state.token = undefined;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
