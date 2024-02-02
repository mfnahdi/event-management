import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state
export interface UserState {
  id: number;
  email: String;
  isDeleted: Boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  id: 0,
  email: '',
  isDeleted: false,
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.isDeleted = action.payload.isDeleted;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.email = '';
      state.isDeleted = false;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;