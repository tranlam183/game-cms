import { createSlice } from "@reduxjs/toolkit";
import { Auth, SignatureMsg, updateSnackbar, updateAuth } from "./actions";
import { AlertColor } from "@mui/material";
import cookieCutter from "cookie-cutter";

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
  token: string | null;
  walletAddress: string | null;
  walletName: string | null;
  appReady: boolean;
}
export type AuthData = {
  token: string | null;
  walletAddress: string | null;
  walletName: string | null;
};

const initialState: AppState = {
  configs: {
    name: "App",
  },
  snackbar: null,
  token: null,
  walletAddress: null,
  walletName: null,
  appReady: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fieldChange(state, action) {
      state[action.payload.key] = action.payload.value;
    },
  },
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
      })
      .addCase(
        updateAuth,
        (
          state,
          {
            payload: { token, walletAddress, walletName },
          }: { payload: AuthData },
        ) => {
          if (!token && !walletAddress && !walletName) {
            cookieCutter.set(AUTH_WALLET_COOKIE, "", {
              expires: new Date(0),
              path: "/",
            });
          } else {
            cookieCutter.set(
              AUTH_WALLET_COOKIE,
              JSON.stringify({ token, walletAddress, walletName }),
              {
                path: "/",
              },
            );
          }

          if (walletAddress !== undefined) {
            state.walletAddress = walletAddress;
          }
          if (token !== undefined) {
            state.token = token;
          }
          if (walletName !== undefined) {
            state.walletName = walletName;
          }
          state.appReady = true;
        },
      );
  },
});

export const { fieldChange } = appSlice.actions;

export default appSlice.reducer;

export const AUTH_WALLET_COOKIE = "auth-wallet";
