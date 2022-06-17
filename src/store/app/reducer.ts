import { createSlice } from "@reduxjs/toolkit";
import { updateSnackbar } from "./actions";
import { AlertColor } from "@mui/material";

export type Snackbar = {
  message: string;
  severity?: AlertColor;
};

export interface AppConfigs {
  name: string;
}

export interface AppState {
  snackbar: Snackbar | null;
  configs: AppConfigs;
}

const initialState: AppState = {
  configs: {
    name: "App",
  },
  snackbar: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateSnackbar, (state, action) => {
      state.snackbar = action.payload;
    });
  },
});

export default appSlice.reducer;
