import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { client, Endpoint } from "api";
import { AuthData, Snackbar } from "./reducer";

export const updateSnackbar = createAction<Snackbar | null>(
  "application/updateSnackbar",
);

export const updateAuth = createAction<AuthData>("app/updateAuth");

export const SignatureMsg = createAsyncThunk(
  "application/SignatureMsg",
  async (address: string) => {
    const response = await client.post(Endpoint.AUTH, address);
    return response?.data;
  },
);

export const Auth = createAsyncThunk(
  "application/Auth",
  async (address: string) => {
    const response = await client.post(
      `${Endpoint.AUTH}/signature-message`,
      address,
    );
    try {
        if(response){

        }
      return response?.data;
    } catch (err) {}
  },
);
