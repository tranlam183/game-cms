import { createSlice } from "@reduxjs/toolkit";
import { Auth, SignatureMsg, updateSnackbar } from "./actions";
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
  signatureMsg?: string;

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
    builder
      .addCase(updateSnackbar, (state, action) => {
        state.snackbar = action.payload;
      })
      .addCase(SignatureMsg.fulfilled, (state, action) => {
        state.signatureMsg = action.payload;
      })
      .addCase(Auth.fulfilled, (state, action) => {
        state.signatureMsg = action.payload;
      });
  },
});

export default appSlice.reducer;
